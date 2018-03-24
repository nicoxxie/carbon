'use strict';

const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options = {}) => {
  api.assertVersion(7);
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          targets: ['extends browserslist-config-carbon'],
          ...options,
        },
      ],
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-stage-1'),
    ],
    plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
  };
});
