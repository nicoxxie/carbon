'use strict';

function freezeDeep(object) {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      object[key] = freezeDeep(object[key]);
    }
  });

  return Object.freeze(object);
}

module.exports = freezeDeep;
