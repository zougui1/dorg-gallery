import { DynamicState } from 'dynamic-redux';

const miscState = new DynamicState('misc', {
  tags: []
});

miscState.createState({
  setTags: 'SET_TAGS',
});

export default miscState;
