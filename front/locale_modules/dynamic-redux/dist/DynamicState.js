"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _Actions = _interopRequireDefault(require("./Actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DynamicState =
/*#__PURE__*/
function () {
  /**
   * @property {String} name
   * @private
   */

  /**
   * @property {Object} initialState
   * @private
   */

  /**
   * @property {Object} actions
   * @public
   */

  /**
   * @property {Array} reducerConditions
   * @private
   */

  /**
   * @property {Function} reducer
   * @function
   * @public
   */

  /**
   * @property {String} resetType
   * @private
   */

  /**
   * @param {String} name
   * @param {Object} initialState
   */
  function DynamicState(name, initialState) {
    var _this = this;

    _classCallCheck(this, DynamicState);

    _defineProperty(this, "name", '');

    _defineProperty(this, "initialState", {});

    _defineProperty(this, "actions", {});

    _defineProperty(this, "reducerConditions", []);

    _defineProperty(this, "reducer", function () {});

    _defineProperty(this, "resetType", '');

    _defineProperty(this, "dynamicReducer", function (state, action) {
      if (action.type === _this.resetType) {
        return _this.initialState;
      }

      var newState = _lodash.default.cloneDeep(state);

      _this.reducerConditions.forEach(function (_ref) {
        var type = _ref.type,
            prop = _ref.prop;

        if (type !== action.type) {
          return;
        }

        switch (action.kind) {
          case 'set':
            newState[prop] = action.payload;
            break;

          case 'push':
          case 'pop':
          case 'shift':
          case 'unshift':
            _Actions.default.array(newState, action, prop);

            break;

          case 'concat':
            newState[prop] = _Actions.default.arrayWithArray(newState, action, prop);
            break;

          case 'filter':
          case 'map':
          case 'reduce':
            newState[prop] = _Actions.default.arrayWithFunction(newState, action, prop);
            break;

          case 'merge':
            newState[prop] = _Actions.default.objectWithObject(newState, action, prop);
            break;

          case 'inc':
          case 'dec':
            newState[prop] = _Actions.default.numberWithNumber(newState, action, prop);
            break;

          default:
            break;
        }
      });

      return newState;
    });

    _defineProperty(this, "createAction", function (action) {
      var actions = {};
      action.kinds.forEach(function (kind) {
        if (!_lodash.default.isString(kind)) {
          throw new Error("The kind of action must be a string. Got \"".concat(kind, "\""));
        }

        actions[kind] = _this.actionCreator({
          name: action.name,
          kind: kind,
          prop: action.prop
        });
      });
      _this.actions[action.name] = actions;
    });

    _defineProperty(this, "actionCreator", function (action) {
      var type = action.kind === 'reset' ? _this.resetType : action.kind.toUpperCase() + '_' + _lodash.default.snakeCase(action.name).toUpperCase();

      _this.reducerConditions.push({
        type: type,
        prop: action.prop
      });

      return function (value) {
        return {
          type: type,
          payload: value,
          kind: action.kind
        };
      };
    });

    if (!_lodash.default.isString(name)) {
      throw new Error("The name must be a string. Got \"".concat(name, "\""));
    }

    if (!_lodash.default.isObject(initialState)) {
      throw new Error("The initial state must be an object. Got \"".concat(initialState, "\""));
    }

    this.name = name;
    this.resetType = 'RESET_' + name.toUpperCase() + '_REDUCER';
    this.initialState = initialState;

    this.reducer = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
      return _this.dynamicReducer(state, action);
    };
  }
  /**
   * @param {Object} state
   * @param {Object} action
   * @returns {Object}
   * @private
   */


  _createClass(DynamicState, [{
    key: "createReducer",

    /**
     * @param {Object} _actions
     * @public
     */
    value: function createReducer(_actions) {
      var _this2 = this;

      _lodash.default.forIn(_actions, function (action, actionName) {
        var prop = _lodash.default.camelCase(actionName);

        if (prop !== 'resetReducer' && !_lodash.default.hasIn(_this2.initialState, prop)) {
          throw new Error("\"".concat(prop, "\" doesn't exists in the state of \"").concat(_this2.name, "\""));
        }

        if (_lodash.default.isString(action)) {
          action = [action];
        } else if (!Array.isArray(action)) {
          throw new Error("The kind of action must be a string or an array. Got \"".concat(action, "\""));
        }

        _this2.createAction({
          name: actionName,
          kinds: action,
          prop: prop
        });
      });
    }
  }]);

  return DynamicState;
}();

module.exports = DynamicState;