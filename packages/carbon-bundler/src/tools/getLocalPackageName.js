'use strict';

const fs = require('fs-extra');
const path = require('path');

function getLocalPackageName(cwd, defaultName) {
  const initialPathGuess = path.join(cwd, 'package.json');
  const exists = fs.pathExistsSync(initialPathGuess);
  const fallback = defaultName || path.basename(cwd);

  if (!exists) {
    return fallback;
  }

  try {
    const source = fs.readFileSync(initialPathGuess).toString();
    const packageJson = JSON.parse(source);

    if (typeof packageJson.eyeglass === 'object') {
      return packageJson.eyeglass.name || fallback;
    }

    return packageJson.name || fallback;
  } catch (error) {}

  return fallback;
}

module.exports = getLocalPackageName;
