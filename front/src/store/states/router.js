import { DynamicState } from 'dynamic-redux';

const routerState = new DynamicState('router', {
  cachedComponents: {}
});

routerState.createActions({
  cachedComponents: ['set', 'merge']
});

export default routerState;
