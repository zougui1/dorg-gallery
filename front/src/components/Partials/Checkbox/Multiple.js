import React from 'react';

import Checkbox from './';

class Multiple extends React.Component {

  /**
   * is called when a checkbox trigger the `onChange` event
   */
  handleChange = e => {
    const { value: propsValue, onChange, name } = this.props;
    const value = this.getCheckboxValue(e.target);

    let newValue = [...propsValue];

    // if the value of the component has the value of the triggered checkbox
    // then we take it off
    // otherwise we add it
    if (newValue.includes(value)) {
      newValue = newValue.filter(v => v !== value);
    } else {
      newValue = [...newValue, value];
    }

    // then trigger the onChange handler of the user
    onChange(newValue, name);
  }

  /**
   * get the checkbox value
   * @param {Object} checkbox
   * @param {String} checkbox.name
   * @param {any} checkbox.value
   */
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
