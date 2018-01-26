'use strict';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['extends browserslist-config-carbon'],
      },
    ],
    '@babel/preset-react',
    '@babel/preset-stage-1',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
});
