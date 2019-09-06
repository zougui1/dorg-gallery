import update from 'immutability-helper';
import _ from 'lodash';

export const functionUpdate = object => prevState => update(prevState, object);
export const execIfFunc = (func, ...params) => _.isFunction(func) && func(...params);
