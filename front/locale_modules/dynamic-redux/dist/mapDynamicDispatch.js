"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDynamicDispatch = mapDynamicDispatch;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var reActions = /(push|pop|shift|unshift|concat|set|merge|filter|map|reduce|inc|dec)/;
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
 */

var createDispatch = function createDispatch(states, action, dispatch, tempActions) {
  var actions = states[action.reducer].actions[action.propName];

  _lodash.default.forIn(actions, function (actionCreator, name) {
    if (name === action.kind) {
      tempActions[action.name] = function (arg) {
        return actionCreator(arg, dispatch);
      };
    }
  });
};
/**
 *
 * @param {String} _actions
 * @param {Function} dispatch
 * @param {Object} tempActions
 * @param {Object} states
 */


var mapString = function mapString(_actions, dispatch, tempActions, states) {
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

    if (action === 'resetState') {
      tempActions['reset' + _lodash.default.upperFirst(reducerName) + 'State'] = function () {
        return states[reducer].actions['__STATE__'].reset(null, dispatch);
      };

      return;
    }

    var _action$replace$split = action.replace(reActions, '$1_').split('_'),
        _action$replace$split2 = _slicedToArray(_action$replace$split, 2),
        actionKind = _action$replace$split2[0],
        propName = _action$replace$split2[1];

    if (!propName) {
      throw new Error("The action must be prefixed by its kind. Got \"".concat(action, "\""));
    }

    propName = _lodash.default.lowerFirst(propName);

    if (!states[reducer].actions[propName]) {
      throw new Error("The action \"".concat(propName, "\" doesn't exists on state \"").concat(reducerName, "\""));
    }

    var _action = {
      reducer: reducer,
      reducerName: reducerName,
      name: action,
      kind: actionKind,
      propName: propName
    };
    createDispatch(states, _action, dispatch, tempActions);
  });
};
/**
 *
 * @param {Object} reducers
 * @param {Function} dispatch
 * @param {Object} tempActions
 * @param {Object} states
 */


var mapObject = function mapObject(reducers, dispatch, tempActions, states) {
  _lodash.default.forIn(reducers, function (actions, reducerName) {
    var actionList = reducerName + ': ';

    if (Array.isArray(actions)) {
      actionList += actions.join(' ');
    } else if (_lodash.default.isString(actions)) {
      actionList += actions;
    } else {
      throw new Error("The actions must be either an array or a string. Got \"".concat(actions, "\""));
    }

    mapString(actionList, dispatch, tempActions, states);
  });
};

function mapDynamicDispatch(actions) {
  return function (dispatch) {
    if (!actions) {
      throw new Error('The actions must be specified');
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

    mapper(actions, dispatch, tempActions, mapDynamicDispatch.states);
    return tempActions;
  };
}