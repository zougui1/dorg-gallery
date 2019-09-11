import _ from 'lodash';

class DynamicState {

  actions = {};
  reducerConditions = [];

  constructor(initialState) {
    this.initialState = initialState;
    this.reducer = (state = initialState, action) => this.dynamicReducer(state, action, this.reducerConditions);
  }

  dynamicReducer = (state, action, typesAndProps) => {
    if(action.type === 'RESET_REDUCER') return this.initialState;

    const tempState = {};
    for(const key in state) if(state.hasOwnProperty(key)) tempState[key] = state[key];
    typesAndProps.forEach(({ type, prop }) => {
      if(type === action.type) {
        prop = prop || _.camelCase(type);
        if(!_.hasIn(state, prop) && !action.multi)
          console.error(new Error(`Received "${prop}" as prop but it doesn't exists in the state`));

        if(!action.multi) tempState[prop] = action.payload;
        else if(action.multi && typeof action.payload === 'object') {
          for (const key in action.payload) {
            if (action.payload.hasOwnProperty(key)) {
              const value = action.payload[key];
              tempState[key] = value;
            }
          }
        }
      }
    });
    return tempState;
  }

  createAction = action => value => {
    let type, multi;
    if(typeof action === 'string') type = action;
    else {
      type = action.type;
      multi = action.multi;
    }
    return { type, payload: value, multi };
  };

  dynamicActions = actions => {
    for (const actionName in actions) {
      if (actions.hasOwnProperty(actionName)) {
        const action = actions[actionName];
        this.actions[actionName] = this.createAction(action);
      }
    }
  }

  createReducer = options => {
    options.resetReducer = 'RESET_REDUCER';
    const actions = {};
    let reducerConditions = [];
    for (const actionName in options) {
      if (options.hasOwnProperty(actionName)) {
        let type, prop, multi;
        const action = options[actionName];
        if(typeof options[actionName] === 'string') type = action;
        else {
          type = action.type;
          prop = action.prop;
          multi = action.multi;
        }
        actions[actionName] = { type, multi };
        reducerConditions.push({ type, prop });
      }
    }
    this.reducerConditions = reducerConditions;
    this.dynamicActions(actions);
  }

}

module.exports = DynamicState;

// the props are the actions's name, their values are either a string that is the action's type
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
