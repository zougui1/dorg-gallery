import { DynamicState } from 'dynamic-redux';

const authState = new DynamicState('auth', {
  user: {},
  deniedPage: {
    path: 'http://localhost:3000/upload',
    require: 'ROLE_USER'
  },
});

authState.createState({
  login: { type: 'LOGIN', prop: 'user' },
  setDeniedPage: 'SET_DENIED_PAGE',
});

export default authState;
