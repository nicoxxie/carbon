(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

require('core-js/modules/es6.array.fill');
require('core-js/modules/es6.string.includes');
require('core-js/modules/es6.string.trim');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es7.object.values');

})));
