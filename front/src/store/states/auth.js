import { DynamicState } from 'dynamic-redux';

const authState = new DynamicState('auth', {
  user: {},
  deniedPage: {},
});

authState.createState({
  login: { type: 'LOGIN', prop: 'user' },
  setDeniedPage: 'SET_DENIED_PAGE',
});

export default authState;
