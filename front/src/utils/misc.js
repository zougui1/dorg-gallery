import update from 'immutability-helper';

export const functionUpdate = object => prevState => update(prevState, object);
