'use strict';

const cssnano = require('cssnano');
const gzip = require('gzip-size');
const path = require('path');
const postcss = require('postcss');
const sass = require('../tools/sass');

module.exports = {
  name: 'Building css',
  async run(context) {
    const results = await Promise.all([
      sass({
        file: context.entry,
        includePaths: [context.ownNodeModules],
        sourceMapEmbed: true,
        sourceMapContents: true,
      }),
      sass({
        file: context.entry,
        includePaths: [context.ownNodeModules],
        outFile: path.join(context.build.css, `${context.name}.css`),
        sourceMap: path.join(context.build.css, `${context.name}.css.map`),
        sourceMapContents: true,
      }),
    ]);
    const css = results[0].css.toString();
    const { css: min, map } = await postcss([cssnano()]).process(css, {
      from: undefined,
      map: {
        inline: false,
      },
    });

    return {
      assets: {
        css: {
          unminified: {
            filename: path.join(context.build.css, `${context.name}.css`),
            source: css,
            sourcemap: results[1].map.toString(),
            stats: {
              size: Buffer.byteLength(css),
              gzip: gzip.sync(css),
            },
          },
          minified: {
            filename: path.join(context.build.css, `${context.name}.min.css`),
            source: min,
            sourcemap: map.toString(),
            stats: {
              size: Buffer.byteLength(min),
              gzip: gzip.sync(min),
            },
          },
        },
      },
    };
  },
};
