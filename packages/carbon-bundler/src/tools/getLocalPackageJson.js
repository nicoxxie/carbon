'use strict';

const fs = require('fs-extra');
const path = require('path');

async function getLocalPackageJson(dir) {
  const initialPathGuess = path.join(dir, 'package.json');
  const exists = await fs.pathExists(initialPathGuess);

  if (!exists) {
    return false;
  }

  try {
    return fs.readJson(initialPathGuess);
  } catch (error) {}

  return false;
}

module.exports = getLocalPackageJson;
