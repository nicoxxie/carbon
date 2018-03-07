'use strict';

const path = require('path');

const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.js',
    '!<rootDir>/src/components/**/*-story.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  setupFiles: [resolve('./setup')],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/?(*-)(spec|test).js?(x)',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': resolve('./jsTransform.js'),
    '^.+\\.s?css$': resolve('./cssTransform.js'),
    '^(?!.*\\.(js|jsx|css|json)$)': resolve('./fileTransform.js'),
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/config/',
    '/lib/',
    '/es/',
    '/cjs/',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
