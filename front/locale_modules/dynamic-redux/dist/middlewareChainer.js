"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainer = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Function[]} middlewares
 * @param {*} first
 * @param {Function} final
 * @param {*} last
 * @returns {Function}
 */
var chainer = function chainer(middlewares, first, final, last) {
  return function () {
    // if `middlewares` have no entries then there is no more middleware, so we can call
    // the final function
    if (!middlewares.length) {
      return final();
    }

    var middleware = middlewares[0].callbackAction; // repeat the same operation with the next middleware

    var chain = chainer(_lodash.default.tail(middlewares), first, final, last);
    middleware(first)(chain)(last);
  };
};

exports.chainer = chainer;