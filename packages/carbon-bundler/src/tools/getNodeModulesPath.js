'use strict';

const fs = require('fs-extra');
const path = require('path');

const getWorkspaceFor = pkg => {
  const workspaceRoot = path.resolve(pkg, '../../package.json');

  if (!fs.pathExistsSync(workspaceRoot)) {
    return false;
  }

  try {
    const packageJson = fs.readJsonSync(workspaceRoot);
    return packageJson.workspaces;
  } catch (error) {}

  return false;
};

function getNodeModulesPath(cwd) {
  const workspaces = getWorkspaceFor(cwd);
  const defaultOwnNodeModules = path.join(cwd, 'node_modules');

  if (!workspaces) {
    return defaultOwnNodeModules;
  }

  if (workspaces.nohoist) {
    return defaultOwnNodeModules;
  }

  return path.resolve(cwd, '../../node_modules');
}

module.exports = getNodeModulesPath;
