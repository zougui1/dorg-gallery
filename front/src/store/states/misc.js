import { DynamicState } from 'dynamic-redux';

const miscState = new DynamicState({
  tags: []
});

miscState.createState({
  setTags: 'SET_TAGS',
});

export default miscState;
