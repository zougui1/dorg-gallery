import React from 'react';
import Slider from '@material-ui/core/Slider';

const PanelSlider = ({ name, label, value, step, min, max, onChange }) => (
  <React.Fragment>
    <label className="color-white" htmlFor={name}>
      {label}
    </label>

    <Slider
      style={{ padding: '10px 0' }}
      id={name}
      name={name}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
    />
  </React.Fragment>
);

export default PanelSlider;
