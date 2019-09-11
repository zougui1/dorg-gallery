"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * validate a type
 * @param {Function} validateType
 * @param {*} prop
 * @param {String} error
 * @throws if the type is not valid
 */
var baseValidateType = function baseValidateType(validateType, prop, error) {
  if (!validateType(prop)) {
    throw new Error(error);
  }
};
/**
 * create a template of type validation for the prop in the state
 * @param {Function} validateType
 * @param {String} type
 * @returns {Function}
 */


var createValidatePropType = function createValidatePropType(validateType, type) {
  return function (state, action, prop) {
    baseValidateType(validateType, state[prop], "".concat(type, " action used on a non-").concat(type, ". Type \"").concat(action.type, "\" property concerned \"").concat(prop, "\""));
  };
};
/**
 * create a template of type validation for the value in the action
 * @param {Function} validateType
 * @param {String} type
 * @returns {Function}
 */


var createValidateType = function createValidateType(validateType, type) {
  return function (action) {
    baseValidateType(validateType, action.payload, "Value passed to action \"".concat(action.type, "\" must be ").concat(type, ". Got \"").concat(action.payload, "\""));
  };
};

var validatePropArray = createValidatePropType(Array.isArray, 'array');
var validatePropObject = createValidatePropType(_lodash.default.isObject, 'object');
var validatePropNumber = createValidatePropType(Number.isFinite, 'number');
var validateArray = createValidateType(Array.isArray, 'an array');
var validateFunction = createValidateType(_lodash.default.isFunction, 'a function');
var validateObject = createValidateType(_lodash.default.isObject, 'an object');
var validateNumber = createValidateType(Number.isFinite, 'a number');
/**
 * create an action template
 * @param {Function} validatePropType
 * @returns {Function}
 */

var baseAction = function baseAction(validatePropType) {
  return function (validateType, callback) {
    return function (state, action, prop) {
      if (validatePropType) {
        validatePropType(state, action, prop);
      }

      if (validateType) {
        validateType(action);
      }

      return callback(state, action, prop);
    };
  };
}; // action template for arrays


var arrayAction = baseAction(validatePropArray); // function using native functions with data of the action

var nativeFunction = function nativeFunction(state, action, prop) {
  return state[prop][action.kind](action.payload);
}; // action template for objects


var objectAction = baseAction(validatePropObject); // action template for numbers

var numberAction = baseAction(validatePropNumber);

var Actions = function Actions() {
  _classCallCheck(this, Actions);
};

_defineProperty(Actions, "array", arrayAction(null, nativeFunction));

_defineProperty(Actions, "arrayWithArray", arrayAction(validateArray, nativeFunction));

_defineProperty(Actions, "arrayWithFunction", arrayAction(validateFunction, nativeFunction));

_defineProperty(Actions, "objectWithObject", objectAction(validateObject, function (state, action, prop) {
  return state[prop] = _lodash.default.merge(state[prop], action.payload);
}));

_defineProperty(Actions, "numberWithNumber", numberAction(validateNumber, function (state, action, prop) {
  switch (action.kind) {
    case 'inc':
      return state[prop] += action.payload;

    case 'dec':
      return state[prop] -= action.payload;
  }
}));

module.exports = Actions;