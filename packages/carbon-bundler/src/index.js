/* eslint-disable no-console */

'use strict';

const cloneDeep = require('lodash.clonedeep');
const ora = require('ora');
const stages = require('./stages');
const freezeDeep = require('./tools/freezeDeep');
const printBundleSizes = require('./tools/printBundleSizes');

async function main(context) {
  const spinner = ora('Bundling...').start();

  let currentContext = freezeDeep(cloneDeep(context));
  let hasBuildError = false;

  for (const stage of stages) {
    spinner.text = stage.name + '...';
    spinner.start();

    try {
      const partialContext = await stage.run(currentContext);

      if (typeof partialContext === 'object') {
        currentContext = freezeDeep({
          ...cloneDeep(currentContext),
          ...cloneDeep(partialContext),
        });
      }

      spinner.succeed(stage.name);
    } catch (error) {
      hasBuildError = true;
      spinner.fail(stage.name);
      console.log('An unexpected error occured:');
      console.log(error);
      break;
    }
  }

  if (!hasBuildError) {
    spinner.succeed('All done!');
    printBundleSizes(currentContext.stats);
  }
}

module.exports = main;
