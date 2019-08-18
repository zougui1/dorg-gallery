import React from 'react';
import SelectMui from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const Select = props => {
  let { selectField, options, name, label } = props;
  const Select2 = selectField || SelectMui;
  const htmlAttributes = {...props};
  delete htmlAttributes.selectField;
  delete htmlAttributes.elementType;
  delete htmlAttributes.rangeField;

  return (
    <FormControl>
      <InputLabel htmlFor={name}>{ label }</InputLabel>
      <Select2 {...htmlAttributes} inputProps={{ name, id: name }}>
        {options.map(option => <MenuItem key={option.value} value={option.value}>{ option.text }</MenuItem>)}
      </Select2>
    </FormControl>
  );
}

export default Select;
