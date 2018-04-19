'use strict';

const sass = require('node-sass');

const sassAsync = options =>
  new Promise((resolve, reject) => {
    sass.render(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });

module.exports = sassAsync;
