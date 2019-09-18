"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _2 = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 *
 * @param {Object} reducer
 * @param {Array?} middlewares
 */
var createStore = function createStore(reducer, middlewares) {
  if (middlewares && !Array.isArray(middlewares)) {
    throw new Error("Middlewares (if any) must be in an array. Got \"".concat(middlewares, "\""));
  }

  _2.mapDynamicDispatch.states = reducer.states;
  var enhancers;
  var devTools = [];
  var window = {};

  if (window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production') {
    devTools.push(window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true
    }));
  }

  if (middlewares) {
    enhancers = _redux.compose.apply(void 0, [_redux.applyMiddleware.apply(void 0, _toConsumableArray(middlewares))].concat(devTools));
  } else {
    enhancers = devTools[0];
  }

  var store = (0, _redux.createStore)(reducer.combinedReducers, enhancers);

  _lodash.default.forIn(reducer.states, function (state) {
    state.store = store;
  });

  return store;
};

exports.createStore = createStore;