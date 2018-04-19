#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const path = require('path');
const program = require('commander');
const main = require('../src');
const packageJson = require('../package.json');
const getLocalPackageName = require('../src/tools/getLocalPackageName');
const getNodeModulesPath = require('../src/tools/getNodeModulesPath');

const cwd = process.cwd();
const context = {
  cwd,
  build: {
    css: path.join(cwd, 'css'),
    scss: path.join(cwd, 'scss'),
  },
  sizes: path.join(cwd, 'bundle-sizes.json'),
  ownNodeModules: getNodeModulesPath(cwd),
  watch: false,
};

program
  .version(packageJson.version)
  .command('build <entry>')
  .description('build files')
  .action(entry => {
    context.entry = path.resolve(cwd, entry);
    context.name = getLocalPackageName(cwd);
  });

program
  .command('watch <entry>')
  .description('watch files')
  .action(() => {
    context.watch = true;
    context.name = getLocalPackageName(cwd);
  });

program.parse(process.argv);

main(context).catch(error => console.log(error));
