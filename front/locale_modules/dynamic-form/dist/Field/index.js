"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _Select = _interopRequireDefault(require("./Select"));

var _Range = _interopRequireDefault(require("./Range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Field = function Field(props) {
  var elementType = props.elementType,
      name = props.name;
  elementType = elementType || 'text';

  var textField = function textField() {
    var name = props.name,
        label = props.label,
        field = props.field,
        placeholder = props.placeholder;
    placeholder = placeholder || label;

    var htmlAttributes = _objectSpread({}, props);

    delete htmlAttributes.elementType;
    delete htmlAttributes.rangeField;
    delete htmlAttributes.selectField;
    return _react["default"].createElement(_TextField["default"], _extends({}, htmlAttributes, {
      placeholder: field ? placeholder : '',
      id: name,
      className: name
    }));
  };

  var displayMessage = function displayMessage() {
    var validation = props.validation,
        name = props.name;
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("br", null), validation && validation[name] && _react["default"].createElement("span", {
      className: "help-block"
    }, validation[name].message), _react["default"].createElement("br", null));
  };

  return _react["default"].createElement("span", null, elementType === 'text' && textField(), elementType === 'select' && _react["default"].createElement(_Select["default"], _extends({}, props, {
    id: name,
    className: name
  })), elementType === 'range' && _react["default"].createElement(_Range["default"], props), displayMessage());
};

var _default = Field;
exports["default"] = _default;