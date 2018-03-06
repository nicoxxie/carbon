/**
 * @jest-environment node
 */

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

describe('add-license-banner', () => {
  defineTest(__dirname, 'add-license-banner');
});
