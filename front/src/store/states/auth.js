import { DynamicState } from 'dynamic-redux';

const authState = new DynamicState('auth', {
  user: {},
  deniedPage: {},
});

authState.createActions({
  user: 'set',
  deniedPage: 'set',
});

export default authState;
