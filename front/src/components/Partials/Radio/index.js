import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiRadio from '@material-ui/core/Radio';

const Radio = ({ label, value, name }) => (
  <FormControlLabel
    value={value}
    label={label}
    control={<MuiRadio
      id={name}
      name={name}
    />}
  />
);

export default Radio;
