import React from 'react';

import Input from '.';

const InputOverride = ({ name, label, value, onChange, type, fullWidth, elevation }) => (
  <Input
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    type={type}
    fullWidth={fullWidth}
    elevation={elevation}
  />
);

export default InputOverride;
