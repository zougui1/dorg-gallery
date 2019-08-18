import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

const Range = props => {
  let { rangeField, label, name, onChange, min, max, value } = props;
  const Range = rangeField || Slider;
  const htmlAttributes =  {...props};
  delete htmlAttributes.rangeField;
  delete htmlAttributes.elementType;
  delete htmlAttributes.selectField;

  return (
    <React.Fragment>
      <Typography id={`label-${name}`}>{ label }</Typography>
      <Range
        {...htmlAttributes}
        min={min || 0}
        max={max || 100}
        value={value || 0}
        onChange={(e, value) => onChange(e, value, name)}
        style={!rangeField ? {padding: '10px 0'} : {}}
        aria-labelledby={`label-${name}`}
      />
    </React.Fragment>
  );
}


export default Range;
