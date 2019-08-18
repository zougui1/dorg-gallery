import { DynamicState } from 'dynamic-redux';

const authState = new DynamicState({
  user: {}
});

authState.createState({
  login: { type: 'LOGIN', prop: 'user' },
});

export default authState;
