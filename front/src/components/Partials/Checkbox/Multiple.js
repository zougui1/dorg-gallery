import React from 'react';

import Checkbox from './';

class Multiple extends React.Component {

  handleChange = e => {
    const { value: propsValue, onChange, name } = this.props;
    const value = this.getCheckboxValue(e.target);

    let newValue = [...propsValue];

    if (newValue.includes(value)) {
      newValue = newValue.filter(v => v !== value);
    } else {
      newValue = [...newValue, value];
    }

    onChange(newValue, name);
  }

  getCheckboxValue = checkbox => {
    return checkbox.value || checkbox.name;
  }

  render() {
    const { data, name, value, className } = this.props;

    return (
      <React.Fragment>
        {data.map(checkbox => (
          <Checkbox
            key={this.getCheckboxValue(checkbox)}
            label={checkbox.label}
            value={this.getCheckboxValue(checkbox)}
            name={name + '-' + checkbox.name}
            onChange={this.handleChange}
            checked={value.includes(this.getCheckboxValue(checkbox))}
            className={className}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Multiple;
