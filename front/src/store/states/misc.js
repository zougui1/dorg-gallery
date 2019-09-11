import { DynamicState } from 'dynamic-redux';

const miscState = new DynamicState('misc', {
  tags: []
});

miscState.createReducer({
  tags: 'set',
});

export default miscState;
