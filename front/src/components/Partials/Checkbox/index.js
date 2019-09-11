import React from 'react';
import classNames from 'classnames';
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Multiple from './Multiple';
import YesNo from './YesNo';
import './Checkbox.scss';

class Checkbox extends React.Component {

  static Multiple = Multiple;
  static YesNo = YesNo;

  render() {
    const { value, label, checked, name, onChange, className } = this.props;

    return (
      <FormControlLabel
        className={classNames('checkbox-control-label', className)}
        value={value}
        control={
          <MuiCheckbox
            onChange={onChange}
            checked={checked}
            name={name}
            id={name}
          />
        }
        label={label}
      />
    );
  }
}

export default Checkbox;
