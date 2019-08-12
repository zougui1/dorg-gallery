import React from 'react'
import { connect } from 'react-redux'
import { mapDynamicState } from 'dynamic-redux';

import InputChips from '../InputChips';

const mapStateToProps = mapDynamicState('misc: tags');
const TagsInput = ({ tags, onChange, tagList, onFocus, onBlur }) => {
  console.warn('The default value for the suggestions for the "TagsInput" must be deleted when in production')
  tags = [{ name: 'test' }, { name: 'tag' }, { name: 'something' }];
  return (
    <InputChips
      suggestions={tags.map(t => ({ label: t.name, value: t.name }))}
      value={tagList}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default connect(mapStateToProps)(TagsInput);
