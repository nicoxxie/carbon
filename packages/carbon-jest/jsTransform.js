'use strict';

const { createTransformer } = require('babel-jest');

const babelOptions = {
  presets: ['babel-preset-carbon/test'],
};

module.exports = createTransformer(babelOptions);
