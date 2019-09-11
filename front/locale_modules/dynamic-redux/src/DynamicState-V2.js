import _ from 'lodash';

class DynamicState {

  /**
   * @property {String}
   * @private
   */
  name = '';

  /**
   * @property {Object}
   * @private
   */
  initialState = {};

  /**
   * @property {Object}
   * @public
   */
  actions = {};

  /**
   * @property {Array}
   * @private
   */
  reducerConditions = [];

  /**
   * @function
   * @public
   */
  reducer = () => { };

  /**
   * @property {String}
   * @private
   */
  resetType = '';
  actionKinds = [
    { kind: 'set', onType: '*' },
    { kind: 'push', onType: 'array' },
    { kind: 'pull', onType: 'array' },
    { kind: 'shift', onType: 'array' },
    { kind: 'unshift', onType: 'array' },
    { kind: 'concat', onType: 'array' },
    { kind: 'merge', onType: 'object' },
  ];

  /**
   * @param {String} name
   * @param {Object} initialState
   */
  constructor(name, initialState) {
    if (!_.isString(name)) {
      throw new Error(`The name must be a string. Got "${name}"`);
    }

    if (!_.isObject(initialState)) {
      throw new Error(`The initial state must be an object. Got "${initialState}"`);
    }

    this.name = name;
    this.resetType = 'RESET_' + name.toUpperCase() + '_REDUCER';
    this.initialState = initialState;
    this.reducer = (state = initialState, action) => this.dynamicReducer(state, action);
  }

  /**
   * @param {Object} state
   * @param {Object} action
   * @returns {Object}
   * @private
   */
  dynamicReducer = (state, action) => {
    if (action.type === this.resetType) {
      return this.initialState;
    }

    const newState = _.cloneDeep(state);

    this.reducerConditions.forEach(({ type, prop }) => {
      if (type !== action.type) {
        return;
      }

      console.log(action);
      switch (action.kind) {
        case 'set':
          newState[prop] = action.payload;
        case 'push':
        case 'pull':
        case 'shift':
        case 'unshift':
        case 'concat':
          this.arrayAction(newState, action, prop)
          break;
        case 'merge':
          this.objectAction(newState, action, prop);
          break;

        default:
          break;
      }
    });

    return newState;
  }

  arrayAction = (newState, action, prop) => {
    if (!Array.isArray(newState[prop])) {
      throw new Error(`Array action used on a non-array. Type "${action.type}" property concerned "${prop}"`);
    }

    if (action.kind === 'concat' && !Array.isArray(action.payload)) {
      throw new Error(`Value passed to action "${action.type}" must be an array. Got "${action.payload}"`);
    }

    newState[prop][action.kind](action.payload);
  }

  objectAction = (newState, action, prop) => {
    if (!_.isObject(newState[prop])) {
      throw new Error(`Object action used on a non-object. Type "${action.type}" property concerned "${prop}"`);
    }

    if (action.kind === 'merge' && !_.isObject(action.payload)) {
      throw new Error(`Value passed to action "${action.type}" must be an object. Got "${action.payload}"`);
    }

    newState[prop] = _.merge(newState[prop], action.payload);
  }

  /**
   * @param {Object} action
   * @param {String} action.name
   * @param {String} action.kind
   * @private
   */
  createAction = action => {
    const actions = {};

    action.kinds.forEach(kind => {
      if (!_.isString(kind)) {
        throw new Error(`The kind of action must be a string. Got "${kind}"`);
      }
      actions[kind] = this.actionCreator({ name: action.name, kind: kind });
    });

    this.actions[action.name] = actions;
  }

  /**
   * @param {Object} action
   * @param {String} action.name
   * @param {String} action.kind
   * @returns {Function}
   * @private
   */
  actionCreator = action => {
    const type = action.kind.toUpperCase() + '_' + _.snakeCase(action.name).toUpperCase();

    return value => ({ type, payload: value, kind: action.kind });
  }

  /**
   * @param {Object} _actions
   * @public
   */
  createReducer = _actions => {

    _.forIn(_actions, (action, actionName) => {
      const prop = _.camelCase(actionName);
      const type = _.snakeCase(actionName).toUpperCase();

      if (!_.hasIn(this.initialState, prop)) {
        throw new Error(`"${prop}" doesn't exists in the state of "${this.name}"`);
      }

      if (_.isString(action)) {
        action = [action];
      } else if (!Array.isArray(action)) {
        throw new Error(`The kind of action must be a string or an array. Got "${action}"`);
      }

      this.createAction({ name: actionName, kinds: action });

      this.reducerConditions.push({ type, prop });
    });
  }

}

module.exports = DynamicState;
