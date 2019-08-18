import React from 'react';
import TextField from '@material-ui/core/TextField';

const Field = props => {
  let { content, field, placeholder } = props
  const Field = field || TextField;
  placeholder = placeholder || content;

  return (
    <Field {...props} inputProps={{...props}} placeholder={placeholder} />
  );
}

export default Field;
