'use strict';

const fs = require('fs-extra');
const path = require('path');
const sass = require('../tools/sass');

module.exports = {
  name: 'Copying scss files over',
  async run(context) {
    const result = await sass({
      file: context.entry,
      includePaths: [context.ownNodeModules],
    });
    const dir = path.basename(path.resolve(context.entry, '..'));
    const filesToCopy = result.stats.includedFiles
      .filter(filename => !filename.includes('node_modules'))
      .map(filename => {
        const from = filename;
        const to = path.resolve(
          context.build.scss,
          path.relative(dir, filename)
        );
        return fs.copy(from, to, { errorOnExist: true, overwrite: false });
      });

    await Promise.all(filesToCopy);
  },
};
