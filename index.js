'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alloyfinger = require('alloyfinger');

var _alloyfinger2 = _interopRequireDefault(_alloyfinger);

var _transform = require('./transform.js');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vFingerMK42 = {
  install: function install(Vue, options) {
    // hack for Property or method "toJSON" is not defined on the instance but referenced during render
    Vue.prototype.toJSON = function () {};

    Vue.directive('finger-test', {
      inserted: function inserted(el) {
        console.log('vFingerMK42 added');
      }
    });
    Vue.directive('transform', {
      inserted: function inserted(el) {
        (0, _transform2.default)(el);
      }
    });

    var elementCache = new Map();

    Vue.directive('finger', {
      inserted: function inserted(el, binding) {
        var currentEl = elementCache.get(el);
        if (currentEl === undefined) {
          // 当前元素之前没有初始化过AlloyFinger
          elementCache.set(el, new _alloyfinger2.default(el, _defineProperty({}, binding.arg, function (e, ele) {
            return binding.value(e, ele);
          })));
        } else {
          currentEl.on(binding.arg, function (e, ele) {
            return binding.value(e, ele);
          });
        }
      }
    });
  }
};
exports.default = vFingerMK42;