"use strict";

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DynamicState = function DynamicState(stateName, initialState) {
  var _this = this;

  _classCallCheck(this, DynamicState);

  _defineProperty(this, "actions", {});

  _defineProperty(this, "reducerConditions", []);

  _defineProperty(this, "stateName", '');

  _defineProperty(this, "capitalize", function (str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  });

  _defineProperty(this, "camelCasify", function (str) {
    str = str.toLowerCase().split('set_');
    str = str[1] || str[0];
    return str.split(/[_-]/g).map(function (str, i) {
      return i > 0 ? _this.capitalize(str) : str;
    }).join('');
  });

  _defineProperty(this, "dynamicReducer", function (state, action, typesAndProps) {
    if (action.type === 'RESET_' + _this.stateName.toUpperCase() + '_REDUCER') return _this.initialState;
    var tempState = {};

    for (var key in state) {
      if (state.hasOwnProperty(key)) tempState[key] = state[key];
    }

    typesAndProps.forEach(function (_ref) {
      var type = _ref.type,
          prop = _ref.prop;

      if (type === action.type) {
        prop = prop || _this.camelCasify(type);
        if (!(0, _utils.inArray)(prop, Object.keys(state)) && !action.multi) console.error(new Error("Received \"".concat(prop, "\" as prop but it doesn't exists in the state")));
        if (!action.multi) tempState[prop] = action.payload;else if (action.multi && _typeof(action.payload) === 'object') {
          for (var _key in action.payload) {
            if (action.payload.hasOwnProperty(_key)) {
              var value = action.payload[_key];
              tempState[_key] = value;
            }
          }
        }
      }
    });
    return tempState;
  });

  _defineProperty(this, "createAction", function (action) {
    return function (value) {
      var type, multi;
      if (typeof action === 'string') type = action;else {
        type = action.type;
        multi = action.multi;
      }
      return {
        type: type,
        payload: value,
        multi: multi
      };
    };
  });

  _defineProperty(this, "dynamicActions", function (actions) {
    for (var actionName in actions) {
      if (actions.hasOwnProperty(actionName)) {
        var action = actions[actionName];
        _this.actions[actionName] = _this.createAction(action);
      }
    }
  });

  _defineProperty(this, "createState", function (options) {
    options.resetReducer = 'RESET_' + _this.stateName.toUpperCase() + '_REDUCER';
    var actions = {};
    var reducerConditions = [];

    for (var actionName in options) {
      if (options.hasOwnProperty(actionName)) {
        var type = void 0,
            prop = void 0,
            multi = void 0;
        var action = options[actionName];
        if (typeof options[actionName] === 'string') type = action;else {
          type = action.type;
          prop = action.prop;
          multi = action.multi;
        }
        actions[actionName] = {
          type: type,
          multi: multi
        };
        reducerConditions.push({
          type: type,
          prop: prop
        });
      }
    }

    _this.reducerConditions = reducerConditions;

    _this.dynamicActions(actions);
  });

  if (typeof stateName === 'string') {
    this.stateName = stateName;
  } else {
    initialState = stateName;
  }

  this.initialState = initialState;

  this.reducer = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    return _this.dynamicReducer(state, action, _this.reducerConditions);
  };
};

module.exports = DynamicState; // the props are the actions's name, their values are either a string that is the action's type
// either an object that can have 3 values

/*
 * type {string} = action's type
 * prop {string} = the prop that will be repleiced in the state; default = camelcasified type without 'set'
 * multi {boolean} = set if there's several props that should be modified; default = false
*/

/* example:
 * (init)
 * setImages: {
 *  type: 'SET_IMAGES',
 *  prop: 'images'
 * }
 * will results by:
 * (in reducer)
 * case 'SET_IMAGES':
 *  return {
 *    ...state,
 *    images: action.payload, // payload is the prob that contains the value
 *  }
 * (action's usage)
 * setImage('value');
 *
 * (init)
 * setImages: {
 *   type: 'SET_IMAGES',
 *   multi: true
 * }
 * will results by:
 * (in reducer)
 * case 'SET_IMAGES':
 *  return {
 *    ...state,
 *    something: action.payload.something,
 *    somethingElse: action.payload.somethingElse,
 *    anotherProp: action.payload.anotherProp,
 *  }
 * (action's usage)
 * setImages({ something: 'val', somethingElse: 'val', anotherProp: 'val' });
*/