'use strict';

const fs = require('fs-extra');

function write(assets) {
  const assetsToWrite = assets.map(asset => {
    return fs.outputFile(asset.filename, asset.source);
  });

  return Promise.all(assetsToWrite);
}

module.exports = write;
