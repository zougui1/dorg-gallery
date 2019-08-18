"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Slider = _interopRequireDefault(require("@material-ui/lab/Slider"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Range = function Range(props) {
  var rangeField = props.rangeField,
      label = props.label,
      name = props.name,
      _onChange = props.onChange,
      min = props.min,
      max = props.max,
      value = props.value;
  var Range = rangeField || _Slider["default"];

  var htmlAttributes = _objectSpread({}, props);

  delete htmlAttributes.rangeField;
  delete htmlAttributes.elementType;
  delete htmlAttributes.selectField;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Typography["default"], {
    id: "label-".concat(name)
  }, label), _react["default"].createElement(Range, _extends({}, htmlAttributes, {
    min: min || 0,
    max: max || 100,
    value: value || 0,
    onChange: function onChange(e, value) {
      return _onChange(e, value, name);
    },
    style: !rangeField ? {
      padding: '10px 0'
    } : {},
    "aria-labelledby": "label-".concat(name)
  })));
};

var _default = Range;
exports["default"] = _default;