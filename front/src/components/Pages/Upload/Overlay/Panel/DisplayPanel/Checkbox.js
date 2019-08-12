import React from 'react';
import _Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Checkbox = ({ label, checked, name, onChange }) => (
  <FormGroup row className="d-flex justify-content-center">
    <FormControlLabel
      control={
        <_Checkbox
          onChange={onChange}
          checked={checked}
          name={name}
          id={name}
        />
      }
      label={label}
    />
  </FormGroup>
);

export default Checkbox;
