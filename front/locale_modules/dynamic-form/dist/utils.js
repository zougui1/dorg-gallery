"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInRange = exports.copyNestedObject = exports.deepReplace = exports.replace = exports.equals = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var equals = function equals(state) {
  return function (confirmation, options) {
    return state[options.field] === confirmation;
  };
};

exports.equals = equals;

var replace = function replace(string, replaces) {
  for (var key in replaces) {
    if (replaces.hasOwnProperty(key)) {
      var _replace = replaces[key];
      if (_replace) string = string.replace(new RegExp("<".concat(key, ">"), 'g'), _replace);
    }
  }

  return string;
};

exports.replace = replace;

var deepReplace = function deepReplace(element, regex, replaces) {
  if (typeof element === 'string' && regex.test(element)) element = replace(element, replaces);else if (Array.isArray(element)) element = element.map(function (element) {
    return deepReplace(element, regex, replaces);
  });else if (_typeof(element) === 'object') {
    for (var key in element) {
      if (element.hasOwnProperty(key)) element[key] = deepReplace(element[key], regex, replaces);
    }
  }
  return element;
}; // copy nested objects and arrays if we don't want their reference


exports.deepReplace = deepReplace;

var copyNestedObject = function copyNestedObject(element) {
  var outputObject = {};
  if (Array.isArray(element)) outputObject = element.map(function (element) {
    return copyNestedObject(element);
  });else if (_typeof(element) === 'object') {
    for (var key in element) {
      if (element.hasOwnProperty(key)) outputObject[key] = copyNestedObject(element[key]);
    }
  } else outputObject = element;
  return outputObject;
};

exports.copyNestedObject = copyNestedObject;

var isInRange = function isInRange() {
  return function (value, options) {
    value = Number(value);
    var min = options.min,
        max = options.max;
    min = Number(options.min);
    max = Number(options.max);
    var condition = true;
    console.log(options.message());
    if (options.min === '_') condition = condition && true;else if (isNaN(min)) condition = condition && false;else if (value < min) condition = condition && false;else condition = condition && true;
    if (options.max === '_') condition = condition && true;else if (isNaN(max)) condition = condition && false;else if (value > max) condition = condition && false;else condition = condition && true;
    if (isNaN(value)) condition = false;
    return condition;
  };
};

exports.isInRange = isInRange;