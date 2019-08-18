"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormValidator = _interopRequireDefault(require("form-validator"));

var _Field = _interopRequireDefault(require("./Field"));

var _reactRouter = require("react-router");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _fields = require("./fields");

var _validations2 = require("./validations");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Form, _React$Component);

  // retrieve the pre-defined validations
  function Form(_props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "getFields", function (props) {
      _this.fields = [];
      var _validations = [];
      props && props.fields && props.fields.forEach(function (field) {
        var currentField; // get a pre-defined field without modifying it

        if (typeof field === 'string') currentField = _fields.fields[field]; // get a pre-defined field and the modify the defined properties
        else if (field.constructor.name === 'Object') currentField = _objectSpread({}, _fields.fields[field.name], field);else currentField = {};
        if (!currentField) return console.error(new Error("\"".concat(field, "\" is not a pre-defined field")));
        currentField.label = currentField.label || currentField.name; // get the pre-defined validations

        if (currentField && Array.isArray(currentField.validations)) {
          currentField.validations = _objectSpread({}, Form.validations(currentField.label, currentField.validations));
        } else currentField.validations = {}; // get the defined validations, if there is


        if (field.validations && field.validations.constructor.name === 'Object') {
          currentField = _objectSpread({}, currentField, field, {
            validations: _objectSpread({}, currentField.validations, field.validations)
          });
        }

        _this.fields.push(currentField); // the validations shall be apart from the fields, and in an array


        for (var key in currentField.validations) {
          if (currentField.validations.hasOwnProperty(key)) {
            var validation = currentField.validations[key];
            validation.field = currentField.name;

            _validations.push(validation);
          }
        }
      });
      _this.validator = new _FormValidator["default"](_validations);
      _this.submitted = false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (fieldOnChange) {
      return function (e, value, name) {
        e.preventDefault(); // let the user to get the event

        var onChange = _this.props.onChange;
        if (fieldOnChange) fieldOnChange(e, value, name);else if (onChange) onChange(e, value, name);

        _this.setState(_defineProperty({}, name || e.target.name, value || e.target.value));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      e.preventDefault();

      var validation = _this.validator.validate(_this.state);

      _this.setState({
        validation: validation
      });

      _this.submitted = true; // user action for when the form is valid

      if (validation.isValid) _this.props.onSubmit(_this.state, e);
    });

    _this.getFields(_props);

    var fieldsName = {};

    _this.fields.forEach(function (field) {
      return fieldsName[field.name] = field.value || '';
    });

    _this.state = _objectSpread({}, fieldsName, {
      validation: _this.validator.valid()
    });
    return _this;
  } // get the pre-defined fields, and modify them if specified


  _createClass(Form, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          submitText = _this$props.submitText,
          redirection = _this$props.redirection,
          title = _this$props.title,
          _field = _this$props.field,
          errorMessage = _this$props.errorMessage,
          redirect = _this$props.redirect,
          children = _this$props.children,
          rangeField = _this$props.rangeField,
          selectField = _this$props.selectField,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur;
      var validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
      return _react["default"].createElement("form", {
        onSubmit: this.handleSubmit
      }, _react["default"].createElement("h1", null, title), this.fields.map(function (field) {
        return _react["default"].createElement(_Field["default"], {
          key: field.name,
          value: _this2.state[field.name],
          name: field.name,
          label: field.label,
          type: field.type || 'text',
          validation: validation,
          onFocus: field.onFocus || onFocus,
          onBlur: field.onBlur || onBlur,
          onChange: _this2.handleChange(field.onChange),
          field: field.field || _field,
          placeholder: field.placeholder,
          elementType: field.elementType,
          options: field.options,
          min: field.min,
          max: field.max,
          step: field.step,
          rangeField: field.field || rangeField,
          selectField: field.field || selectField,
          minlength: field.minlength,
          maxlength: field.maxlength
        });
      }), _react["default"].createElement(_Button["default"], {
        variant: "contained",
        color: "primary",
        type: "submit"
      }, submitText || 'Submit'), _react["default"].createElement("br", null), _react["default"].createElement("span", {
        className: "externalError"
      }, errorMessage), redirect && redirection && _react["default"].createElement(_reactRouter.Redirect, {
        to: redirection
      }), children);
    }
  }]);

  return Form;
}(_react["default"].Component);

_defineProperty(Form, "validations", function (label, validationsArr) {
  // temp object for validations
  var validationsObj = {};
  validationsArr.forEach(function (validationAndArg) {
    // after ":" it's considered as arguments
    var _validationAndArg$spl = validationAndArg.split(':'),
        _validationAndArg$spl2 = _slicedToArray(_validationAndArg$spl, 2),
        validation = _validationAndArg$spl2[0],
        args = _validationAndArg$spl2[1];

    var not = false;

    if (validation.charAt(0) === '!') {
      validation = validation.substring(1);
      not = true;
    } // get the validation object of the wanted one
    // we do NOT want a reference of the object
    // spread operator partially solve the problem by copying the object
    // but it still get a reference of the objects and arrays it contains and we don't want that


    validationsObj[validation] = (0, _utils.copyNestedObject)(_validations2.validations[validation]);
    if (not) validationsObj[validation].validWhen = !validationsObj[validation].validWhen;

    for (var key in validationsObj[validation]) {
      if (validationsObj[validation].hasOwnProperty(key) && key !== 'method') {
        // a range over 2 numbers
        var validationRange = args ? args.split('-') : []; // the value after "$" is the input's name
        // it's used to match the value of the input that has the "match" rule
        // and the value of the targeted input

        var match = args ? args.split('$')[1] : ''; // there's some texts that need to be replaced

        validationsObj[validation] = (0, _utils.deepReplace)(validationsObj[validation], /<.+>/, {
          label: label,
          min: validationRange[0],
          max: validationRange[1],
          match: match,
          not: (not ? 'should' : 'does') + 'n\'t'
        });
      }
    }
  });
  return validationsObj;
});

var _default = Form;
exports["default"] = _default;
