'use strict';

const config = require('@carbon/test/jest');

module.exports = Object.assign({}, config, {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/lib/',
    '/es/',
    '/cjs/',
  ],
});
