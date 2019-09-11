"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombineStates = void 0;

var _redux = require("redux");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CombineStates =
/**
 * @property {Object} states
 * @public
 */

/**
 * @property {Object} reducers
 * @public
 */

/**
 * @property {Function} combineReducers
 * @function
 * @public
 */

/**
 * @param {Object} states
 * @public
 */
function CombineStates(_states) {
  var _this = this;

  _classCallCheck(this, CombineStates);

  _defineProperty(this, "states", {});

  _defineProperty(this, "reducers", {});

  _defineProperty(this, "combinedReducers", null);

  _defineProperty(this, "setStates", function (states) {
    states.forEach(function (state) {
      _this.reducers[state.name + 'Reducer'] = state.reducer;
      _this.states[state.name + 'Reducer'] = state;
    });
  });

  this.setStates(_states);
  this.combinedReducers = (0, _redux.combineReducers)(this.reducers);
}
/**
 * @param {Array} states
 * @private
 */
;

exports.CombineStates = CombineStates;