'use strict';

const fs = require('fs-extra');
const clean = require('../tools/clean');

module.exports = {
  name: 'Removing build folders',
  async run(context) {
    const directoriesToRemove = Object.keys(context.build).map(key => {
      return context.build[key];
    });
    await clean(directoriesToRemove);
    await Promise.all(directoriesToRemove.map(dir => fs.ensureDir(dir)));
  },
};
