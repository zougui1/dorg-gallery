"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDynamicState = mapDynamicState;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * puts the props of the `state` into `newState` based on the `_props` passed
 * @param {String} _props
 * @param {Object} state
 * @param {Object} newState
 */
var mapString = function mapString(_props, state, newState) {
  var stateParts = (0, _utils.removeSpaces)(_props.split(':'));

  if (stateParts.length < 2) {
    throw new Error('The props aren\'t specified within a state');
  }

  var _stateParts = _slicedToArray(stateParts, 2),
      reducerName = _stateParts[0],
      propsStr = _stateParts[1];

  var props = (0, _utils.removeSpaces)(propsStr.split(/\s/g));
  var reducer = reducerName + 'Reducer';
  props.forEach(function (prop) {
    return newState[prop] = state[reducer][prop];
  });
};
/**
 * puts the props of the `state` into `newState` based on the `reducers` passed
 * @param {Object} reducers
 * @param {Object} state
 * @param {Object} newState
 */


var mapObject = function mapObject(reducers, state, newState) {
  _lodash.default.forIn(reducers, function (props, reducerName) {
    var propList = reducerName + ': ';

    if (Array.isArray(props)) {
      propList += props.join(' ');
    } else if (_lodash.default.isString(props)) {
      propList += props;
    } else {
      throw new Error("The props must be either an array or a string. Got \"".concat(props, "\""));
    }

    mapString(propList, state, newState);
  });
};
/**
 * returns the properties from an object based on the props passed in parameter
 * @param {String | Object} props
 * @returns {Function}
 */


function mapDynamicState(props) {
  return function (state) {
    if (!props) {
      throw new Error('The props must be specified');
    }

    var newState = {};
    var mapper;

    if (_lodash.default.isString(props)) {
      mapper = mapString;
    } else if (_lodash.default.isObject(props)) {
      mapper = mapObject;
    } else {
      throw new Error("The props must be either a string or an object. Got \"".concat(props, "\""));
    }

    mapper(props, state, newState);
    return newState;
  };
}