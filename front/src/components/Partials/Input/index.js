import React from 'react';
import { FormControl, InputLabel, Input as MuiInput, FormHelperText } from '@material-ui/core';
import classNames from 'classnames';

import InputOverride from './InputOverride';
import './Input.scss';

class Input extends React.Component {

  static Override = InputOverride;

  render() {
    const {
      className,
      elevation,
      name,
      label,
      error,
      type,
      value,
      helperText,
      errorMessage,
      fullWidth,
      onChange,
      ...rest
    } = this.props;

    const helperName = `${name}-helper`;

    return (
      <FormControl className="custom-field" error={error} fullWidth={fullWidth}>
        <InputLabel variant="standard" htmlFor={name}>{label}</InputLabel>

        <MuiInput
          {...rest}
          value={value}
          onChange={onChange}
          type={type}
          fullWidth={fullWidth}
          name={name}
          id={name}
          aria-describedby={helperName}
          className={classNames(`custom-input z-elevation-${elevation}`, className)}
        />

        <FormHelperText className="helper" id={helperName}>
          {error ? errorMessage : helperText}
        </FormHelperText>
      </FormControl>
    );
  }
}

Input.defaultProps = {
  elevation: 2,
};

export default Input;
