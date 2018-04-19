'use strict';

const rimraf = require('rimraf');
const util = require('util');

const rimrafAsync = util.promisify(rimraf);

module.exports = function clean(directories) {
  const directoriesToRemove = directories.map(dir => {
    return rimrafAsync(dir);
  });

  return Promise.all(directoriesToRemove);
};
