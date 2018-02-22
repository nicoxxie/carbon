'use strict';

const path = require('path');
const { rollup } = require('rollup');
const stats = require('./stats');

const baseInputOptions = {
  input: path.resolve(__dirname, '../vanilla/index.js'),
  plugins: [
    require('rollup-plugin-node-resolve')({
      jsnext: true,
      main: true,
    }),
    require('rollup-plugin-commonjs')({
      include: 'node_modules/**',
      sourceMap: true,
    }),
    require('rollup-plugin-babel')({
      babelrc: false,
      presets: [['es2015', { modules: false }]],
      exclude: ['node_modules/**'],
    }),
  ],
};

const packages = [
  {
    name: 'vanilla',
    entry: path.resolve(__dirname, '../../vanilla/index.js'),
    output: {
      umd: {
        name: 'CarbonVanillaPolyfill',
      },
    },
  },
  {
    name: 'react',
    entry: path.resolve(__dirname, '../../react/index.js'),
    output: {
      umd: {
        name: 'CarbonReactPolyfill',
      },
    },
  },
];
const bundleFormats = ['umd'];

async function build() {
  const bundles = packages.map(async pkg => {
    const inputOptions = {
      ...baseInputOptions,
      input: pkg.entry,
      plugins: [
        ...baseInputOptions.plugins,
        require('./plugins/sizes-plugin')({
          getSize(size, gzip, bundle) {
            const bundleName = `${pkg.name}.${bundle.format}`;
            stats.currentBuildResults.bundleSizes[bundleName] = {
              size,
              gzip,
            };
          },
        }),
      ],
    };
    const bundle = await rollup(inputOptions);
    return Promise.all(
      bundleFormats.map(format => {
        const outputOptions = {
          format,
          file: path.resolve(pkg.entry, `../${format}.js`),
        };

        if (format === 'umd') {
          outputOptions.name = pkg.output.umd.name;
        }

        return bundle.write(outputOptions);
      })
    );
  });

  await Promise.all(bundles);
}

build()
  .then(() => {
    stats.saveResults();
    console.log(stats.printResults());
  })
  .catch(error => console.log(error));
