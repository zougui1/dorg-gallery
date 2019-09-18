"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Middleware = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Middleware =
/*#__PURE__*/
function () {
  /**
   * @property {String} actionName
   * @public
   */

  /**
   * @property {String} actionKind
   * @public
   */

  /**
   *
   * @property {Object} store
   * @public
   */

  /**
   *
   * @property {Function} callback
   * @public
   */

  /**
   *
   * @param {String} action
   * @param {String} kind
   * @public
   */
  function Middleware(action, kind) {
    _classCallCheck(this, Middleware);

    _defineProperty(this, "actionName", void 0);

    _defineProperty(this, "actionKind", void 0);

    _defineProperty(this, "store", {});

    _defineProperty(this, "callbackAction", {});

    this.actionName = action;
    this.actionKind = kind;
  }
  /**
   *
   * @param {Function} callback must be a function that returns a function which itself return a function
   * @returns {Object}
   * @public
   */


  _createClass(Middleware, [{
    key: "callback",
    value: function callback(_callback) {
      this.callbackAction = _callback;
      return this;
    }
  }]);

  return Middleware;
}();

exports.Middleware = Middleware;