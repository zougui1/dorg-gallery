"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;

var _redux = require("redux");

var _ = require(".");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 *
 * @param {Object} reducer
 * @param {Array?} middlewares
 */
var createStore = function createStore(reducer, middlewares) {
  if (_typeof(middlewares) === 'object' && !Array.isArray(middlewares)) {
    var middlewaresArr = [];
    var i = 0;

    for (var key in middlewares) {
      middlewaresArr[i++] = middlewares[key];
    }

    middlewares = middlewaresArr;
  }

  _.mapDynamicDispatch.states = reducer.states;
  var enhancers;
  var devTools = [];

  if (window.devToolsExtension && process.env.NODE_ENV !== 'production') {
    devTools.push(window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true
    }));
  }

  if (middlewares) enhancers = _redux.compose.apply(void 0, [_redux.applyMiddleware.apply(void 0, _toConsumableArray(middlewares))].concat(devTools));else enhancers = devTools[0];
  var store = (0, _redux.createStore)(reducer.combinedReducers, enhancers);
  _.mapDynamicDispatch.store = store;
  return store;
};

exports.createStore = createStore;