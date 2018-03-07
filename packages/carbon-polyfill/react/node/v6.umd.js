(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory()
    : typeof define === 'function' && define.amd ? define(factory) : factory();
})(this, function() {
  'use strict';

  require('core-js/modules/es7.object.values');
});
