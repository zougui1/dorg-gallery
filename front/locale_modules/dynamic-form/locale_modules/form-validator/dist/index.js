"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormValidator =
/*#__PURE__*/
function () {
  function FormValidator(validations) {
    _classCallCheck(this, FormValidator);

    this.validations = validations;
  }

  _createClass(FormValidator, [{
    key: "validate",
    value: function validate(state) {
      var validation = this.valid();
      this.validations.forEach(function (rule) {
        if (!validation[rule.field].isInvalid) {
          var fieldValue = state[rule.field];
          var args = rule.args || [];
          var validationMethod;
          if (typeof rule.method === 'string') validationMethod = _validator["default"][rule.method];else {
            validationMethod = rule.method(state);
          }

          if (validationMethod.apply(void 0, [fieldValue].concat(_toConsumableArray(args))) !== rule.validWhen) {
            validation[rule.field] = {
              isInvalid: true,
              message: rule.message
            };
            validation.isValid = false;
          }
        }
      });
      return validation;
    }
  }, {
    key: "valid",
    value: function valid() {
      var validation = {};
      this.validations.map(function (rule) {
        return validation[rule.field] = {
          isInvalid: false,
          message: ''
        };
      });
      return _objectSpread({
        isValid: true
      }, validation);
    }
  }]);

  return FormValidator;
}();

var _default = FormValidator;
exports["default"] = _default;