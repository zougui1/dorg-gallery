import React from 'react';
import { FormGroup, Select, MenuItem, InputLabel, Input, FormControl } from '@material-ui/core';

import Field from '../../../../../Partials/Field';
import { fields } from './fields';

class EditableFields extends React.Component {

  /**
   * is called when `onChange` is triggered on the inputs
   */
  handleChange = e => {
    const { name, value } = e.target;

    this.changeFormData(name, value);
  }

  /**
   * change the value of one property in the `formData`
   */
  changeFormData = (name, value) => {
    const { changeFormData } = this.props;

    changeFormData({ [name]: value });
  }

  render() {
    const { formData } = this.props;

    return (
      <React.Fragment>

        {fields.map(field => (
          <FormGroup row key={field.name} className="justify-content-center">
            <Field
              {...field}
              fullWidth
              onChange={this.handleInputChange}
            />
          </FormGroup>
        ))}

        <FormGroup row className="justify-content-center">
          <FormControl fullWidth>
            <InputLabel htmlFor="rate">Rate</InputLabel>
            <Select
              value={formData.rate}
              onChange={this.handleChange}
              inputProps={{
                name: 'rate',
                id: 'rate'
              }}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="suggestive">Suggestive</MenuItem>
              <MenuItem value="nsfw">NSFW</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </React.Fragment>
    );
  }
}

export default EditableFields;
