"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDynamicDispatch = mapDynamicDispatch;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

var _2 = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 * @param {Object} states
 * @param {Object} action
 * @param {String} action.reducer
 * @param {String} action.reducerName
 * @param {String} action.name
 * @param {Function} dispatch
 * @param {Object} store
 * @param {Function} store.getState
 * @returns {Object}
 */
var createDispatch = function createDispatch(states, action, dispatch, store) {
  var actions = states[action.reducer].actions[action.name];
  var newActions = {};

  _lodash.default.forIn(actions, function (actionCreator, name) {
    newActions[name] = function (arg) {
      return dispatch(actionCreator(arg));
    };
  });

  newActions.get = function () {
    return (0, _2.mapDynamicState)("".concat(action.reducerName, ": ").concat(action.name))(store.getState())[action.name];
  };

  return newActions;
};
/**
 *
 * @param {String} _actions
 * @param {Function} dispatch
 * @param {Object} tempActions
 * @param {Object} states
 */


var mapString = function mapString(_actions, dispatch, tempActions, states, store) {
  var stateParts = (0, _utils.removeSpaces)(_actions.split(':'));

  if (stateParts.length < 2) {
    throw new Error('The actions aren\'t specified within a state');
  }

  var _stateParts = _slicedToArray(stateParts, 2),
      reducerName = _stateParts[0],
      actionsStr = _stateParts[1];

  var actions = (0, _utils.removeSpaces)(actionsStr.split(/\s/g));
  var reducer = reducerName + 'Reducer';
  actions.forEach(function (action) {
    if (!states[reducer]) {
      throw new Error("The reducer \"".concat(reducerName, "\" doesn't exists"));
    }

    if (action === 'resetReducer') {
      console.log(states[reducer].actions[action]);

      tempActions[action] = function () {
        return dispatch(states[reducer].actions[action].reset());
      };

      return;
    }

    if (!states[reducer].actions[action]) {
      throw new Error("The action \"".concat(action, "\" doesn't exists on the reducer \"").concat(reducerName, "\""));
    }

    var _action = {
      reducer: reducer,
      reducerName: reducerName,
      name: action
    };
    tempActions[action] = createDispatch(states, _action, dispatch, store);
  });
};
/**
 *
 * @param {Object} reducers
 * @param {Function} dispatch
 * @param {Object} tempActions
 * @param {Object} states
 */


var mapObject = function mapObject(reducers, dispatch, tempActions, states, store) {
  _lodash.default.forIn(reducers, function (actions, reducerName) {
    var actionList = reducerName + ': ';

    if (Array.isArray(actions)) {
      actionList += actions.join(' ');
    } else if (_lodash.default.isString(actions)) {
      actionList += actions;
    } else {
      throw new Error("The actions must be either an array or a string. Got \"".concat(actions, "\""));
    }

    mapString(actionList, dispatch, tempActions, states, store);
  });
};

function mapDynamicDispatch(actions) {
  return function (dispatch) {
    if (!actions) {
      console.warn('The wanted actions are not specified');
      return {};
    }

    var tempActions = {};
    var mapper;

    if (_lodash.default.isString(actions)) {
      mapper = mapString;
    } else if (_lodash.default.isObject(actions)) {
      mapper = mapObject;
    } else {
      throw new Error("The actions must be either a string or an object. Got \"".concat(actions, "\""));
    }

    mapper(actions, dispatch, tempActions, mapDynamicDispatch.states, mapDynamicDispatch.store);
    return tempActions;
  };
}