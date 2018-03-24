/**
 * @jest-environment node
 */

const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const diff = require('jest-diff');

const fixturesPath = path.resolve(__dirname, '../__testfixtures__');

const run = (input, output, options) => done => {
  const result = babel.transformSync(input, options);
  if (output.trim() !== result.code.trim()) {
    throw new Error(diff(output.trim(), result.code.trim()));
  }
};

const runner = (fixtures, fixturesPath) => {
  const tests = fixtures.map(fixture => {
    const fixturePath = path.join(fixturesPath, fixture);
    const scenarioNames = fs.readdirSync(fixturePath);
    const scenarios = scenarioNames.map(name => {
      const scenarioPath = path.join(fixturePath, name);

      const inputPath = path.join(scenarioPath, 'input.js');
      const outputPath = path.join(scenarioPath, 'output.js');
      const optionsPath = path.join(scenarioPath, 'options.json');

      const input = fs.readFileSync(inputPath, 'utf8');
      const output = fs.readFileSync(outputPath, 'utf8');
      const rawOptions = JSON.parse(fs.readFileSync(optionsPath, 'utf8'));
      let options = {};

      if (Array.isArray(rawOptions.presets[0])) {
        options = {
          ...rawOptions,
          presets: [
            [
              path.resolve(scenarioPath, rawOptions.presets[0][0]),
              rawOptions.presets[0][1],
            ],
          ],
        };
      } else {
        options = {
          ...rawOptions,
          presets: [path.resolve(scenarioPath, rawOptions.presets[0])],
        };
      }

      return {
        name,
        run: run(input, output, options),
      };
    });

    return {
      name: fixture,
      scenarios,
    };
  });

  tests.forEach(test => {
    describe(test.name, () => {
      test.scenarios.forEach(scenario => {
        it(scenario.name, () => {
          scenario.run();
        });
      });
    });
  });
};

describe('babel-preset-carbon', () => {
  const fixtures = fs.readdirSync(fixturesPath);
  runner(fixtures, fixturesPath);
});
