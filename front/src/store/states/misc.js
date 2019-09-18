import { DynamicState } from 'dynamic-redux';

const miscState = new DynamicState('misc', {
  tags: []
});

miscState.createActions({
  tags: 'set',
});

export default miscState;
