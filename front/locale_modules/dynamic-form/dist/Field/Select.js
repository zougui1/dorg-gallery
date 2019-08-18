"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = function Select(props) {
  var selectField = props.selectField,
      options = props.options,
      name = props.name,
      label = props.label;
  var Select2 = selectField || _Select["default"];

  var htmlAttributes = _objectSpread({}, props);

  delete htmlAttributes.selectField;
  delete htmlAttributes.elementType;
  delete htmlAttributes.rangeField;
  return _react["default"].createElement(_FormControl["default"], null, _react["default"].createElement(_InputLabel["default"], {
    htmlFor: name
  }, label), _react["default"].createElement(Select2, _extends({}, htmlAttributes, {
    inputProps: {
      name: name,
      id: name
    }
  }), options.map(function (option) {
    return _react["default"].createElement(_MenuItem["default"], {
      key: option.value,
      value: option.value
    }, option.text);
  })));
};

var _default = Select;
exports["default"] = _default;