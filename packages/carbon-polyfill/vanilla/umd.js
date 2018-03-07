(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory()
    : typeof define === 'function' && define.amd ? define(factory) : factory();
})(this, function() {
  'use strict';

  require('core-js/modules/es6.array.from');
  require('core-js/modules/es6.math.sign');
  require('core-js/modules/es6.object.assign');
  require('./polyfills/custom-event');
  require('./polyfills/element-closest');
  require('./polyfills/element-matches');
  require('./polyfills/toggle-class');
});
