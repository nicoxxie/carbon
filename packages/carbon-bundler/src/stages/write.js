'use strict';

const fs = require('fs-extra');

module.exports = {
  name: 'Writing files',
  async run(context) {
    const { assets } = context;
    const filesToWrite = Object.keys(assets.css).reduce((acc, key) => {
      const asset = assets.css[key];
      return acc.concat([
        fs.writeFile(asset.filename, asset.source, 'utf8'),
        fs.writeFile(`${asset.filename}.map`, asset.sourcemap, 'utf8'),
      ]);
    }, []);

    await Promise.all(filesToWrite);
  },
};
