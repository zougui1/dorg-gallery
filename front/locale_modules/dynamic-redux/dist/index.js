"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapDynamicState = require("./mapDynamicState");

Object.keys(_mapDynamicState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapDynamicState[key];
    }
  });
});

var _mapDynamicDispatch = require("./mapDynamicDispatch");

Object.keys(_mapDynamicDispatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapDynamicDispatch[key];
    }
  });
});

var _createStore = require("./createStore");

Object.keys(_createStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createStore[key];
    }
  });
});

var _DynamicState = require("./DynamicState");

Object.keys(_DynamicState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DynamicState[key];
    }
  });
});

var _CombineStates = require("./CombineStates");

Object.keys(_CombineStates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CombineStates[key];
    }
  });
});

var _Middleware = require("./Middleware");

Object.keys(_Middleware).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Middleware[key];
    }
  });
});

var _connect = require("./connect");

Object.keys(_connect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _connect[key];
    }
  });
});
var state = new _DynamicState.DynamicState('state', {
  test: 'default value'
});
state.createActions({
  test: ['set', 'reset'],
  __STATE__: 'reset'
});
state.createMiddlewares([new _Middleware.Middleware('test', 'set').callback(function (store) {
  return function (next) {
    return function (action) {
      console.log('middleware');
      next();
    };
  };
})]);
var combinedStates = new _CombineStates.CombineStates([state]);
var store = (0, _createStore.createStore)(combinedStates);
var actions = (0, _mapDynamicDispatch.mapDynamicDispatch)('state: resetState resetTest setTest')(store.dispatch);

var getter = function getter() {
  return (0, _mapDynamicState.mapDynamicState)('state: test')(store.getState());
};

console.log(getter());
actions.setTest('new value');
console.log(getter());
actions.resetTest();
console.log(getter());