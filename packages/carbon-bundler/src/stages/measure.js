'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  name: 'Measuring file differences',
  async run(context) {
    const defaultSizes = {
      bundleSizes: [],
    };
    const oldSizesExist = await fs.pathExists(context.sizes);
    const sizes = oldSizesExist
      ? await fs.readJson(context.sizes)
      : defaultSizes;

    const { css } = context.assets;
    const bundles = Object.keys(css).map(key => {
      const { filename, stats } = css[key];
      return {
        filename: path.basename(filename),
        assetType: 'css',
        bundleType: key,
        ...stats,
      };
    });

    const stats = bundles.map(bundle => {
      const prevBundle = sizes.bundleSizes.find(
        b => b.filename === bundle.filename
      );
      return {
        key: bundle.filename,
        prevSize: prevBundle && prevBundle.size,
        size: bundle.size,
        prevGzip: prevBundle && prevBundle.gzip,
        gzip: bundle.gzip,
      };
    });

    await fs.writeJson(
      context.sizes,
      {
        bundleSizes: bundles,
      },
      {
        spaces: 2,
      }
    );

    return {
      stats,
    };
  },
};
