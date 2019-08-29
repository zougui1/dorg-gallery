import React from 'react'
import { connect } from 'react-redux'
import { mapDynamicState } from 'dynamic-redux';

import InputChips from '../InputChips';

//TODO REMOVE THIS WHOLE FILE

const mapStateToProps = mapDynamicState('misc: tags');
const TagsInput = ({ tags, onChange, tagList, onFocus, onBlur }) => {
  return (
    <InputChips
      // material-ui uses an object with a label and a value for the suggestions
      // but our tags only have a name
      suggestions={tags.map(t => ({ label: t.name, value: t.name }))}
      value={tagList}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default connect(mapStateToProps)(TagsInput);
