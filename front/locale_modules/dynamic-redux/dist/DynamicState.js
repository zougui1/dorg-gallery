"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicState = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Actions = require("./Actions");

var _middlewareChainer = require("./middlewareChainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stateRef = '__STATE__';

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
   * @property {Object} actionsOrigin
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
   * @property {Object} middlewares
   * @private
   */

  /**
   * @property {Object} store
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

    _defineProperty(this, "actionsOrigin", {});

    _defineProperty(this, "reducerConditions", []);

    _defineProperty(this, "reducer", function () {});

    _defineProperty(this, "resetType", '');

    _defineProperty(this, "middlewares", {});

    _defineProperty(this, "store", {});

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

        _this.dispatcher(newState, action, prop);
      });

      return newState;
    });

    _defineProperty(this, "dispatcher", function (state, action, prop) {
      switch (action.kind) {
        case 'set':
          state[prop] = action.payload;
          break;

        case 'push':
        case 'pop':
        case 'shift':
        case 'unshift':
          _Actions.Actions.array(state, action, prop);

          break;

        case 'concat':
          state[prop] = _Actions.Actions.arrayWithArray(state, action, prop);
          break;

        case 'filter':
        case 'map':
        case 'reduce':
          state[prop] = _Actions.Actions.arrayWithFunction(state, action, prop);
          break;

        case 'merge':
          state[prop] = _Actions.Actions.objectWithObject(state, action, prop);
          break;

        case 'inc':
        case 'dec':
          state[prop] = _Actions.Actions.numberWithNumber(state, action, prop);
          break;

        case 'reset':
          state[prop] = _this.initialState[prop];
          break;

        default:
          break;
      }
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
      var finalName;

      if (action.name === stateRef) {
        finalName = _this.name.toUpperCase() + '_STATE';
      } else {
        finalName = _lodash.default.snakeCase(action.name).toUpperCase();
      }

      var type = action.kind.toUpperCase() + '_' + finalName;

      var camelType = _lodash.default.camelCase(type);

      _this.reducerConditions.push({
        type: type,
        prop: action.prop
      });

      return function (value, dispatch) {
        // get all the middlewares for the current action
        var middlewares = _this.middlewares[camelType];
        var actionObject = {
          type: type,
          payload: value,
          kind: action.kind
        }; // create a function that will dispatch the data of the action

        var dispatcher = function dispatcher() {
          return dispatch(actionObject);
        };

        if (middlewares) {
          // create a chain of middlewares and call them
          (0, _middlewareChainer.chainer)(middlewares, _this.store, dispatcher, actionObject)();
        } else {
          dispatcher();
        }
      };
    });

    _defineProperty(this, "addMiddleware", function (middleware) {
      var action = _lodash.default.camelCase(middleware.actionKind + '_' + middleware.actionName);

      if (!_this.middlewares[action]) {
        _this.middlewares[action] = [middleware];
      } else {
        _this.middlewares[action].push(middleware);
      }
    });

    if (!_lodash.default.isString(name)) {
      throw new Error("The name must be a string. Got \"".concat(name, "\""));
    }

    if (!_lodash.default.isObject(initialState)) {
      throw new Error("The initial state must be an object. Got \"".concat(initialState, "\""));
    }

    this.name = name;
    this.resetType = 'RESET_' + name.toUpperCase() + '_STATE';
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
    key: "createActions",

    /**
     * @param {Object} _actions
     * @returns {this}
     * @public
     */
    value: function createActions(_actions) {
      var _this2 = this;

      this.actionsOrigin = _actions;

      _lodash.default.forIn(_actions, function (action, actionName) {
        var isStateRef = actionName === stateRef;
        var prop = isStateRef ? actionName : _lodash.default.camelCase(actionName);

        if (!isStateRef && !_lodash.default.hasIn(_this2.initialState, prop)) {
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

      return this;
    }
    /**
     *
     * @param {Object[]} middlewares
     * @param {String} middlewares[].actionName
     * @param {String} middlewares[].actionKind
     * @param {Function} middlewares[].callbackAction
     */

  }, {
    key: "createMiddlewares",
    value: function createMiddlewares(middlewares) {
      var _this3 = this;

      middlewares.forEach(function (middleware) {
        var actionName = middleware.actionName,
            actionKind = middleware.actionKind;
        var action = _this3.actionsOrigin[actionName];

        if (!action) {
          throw new Error("There is no action \"".concat(actionName, "\""));
        }

        if (_lodash.default.isString(action)) {
          action = [action];
        }

        if (!action.includes(actionKind)) {
          throw new Error("Action \"".concat(actionName, "\" doesn't use the kind \"").concat(actionKind, "\""));
        }

        _this3.addMiddleware(middleware);
      });
    }
    /**
     *
     * @param {Object} middleware
     * @param {String} middleware.actionName
     * @param {String} middleware.actionKind
     * @param {Function} middleware.callbackAction
     */

  }]);

  return DynamicState;
}();

exports.DynamicState = DynamicState;