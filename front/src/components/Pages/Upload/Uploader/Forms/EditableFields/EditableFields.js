import React from 'react';
import { FormGroup, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

import Input from '../../../../../Partials/Input';
import { fields } from './fields';
import './EditableFields.scss';

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
            <Input
              {...field}
              fullWidth
              value={formData[field.name]}
              onChange={this.handleChange}
            />
          </FormGroup>
        ))}

        <FormGroup row className="justify-content-center">
            <Select
              className="svg-color-white"
              fullWidth
              value={formData.rate}
              onChange={this.handleChange}
              input={<Input name="rate" label="Rate" />}
              MenuProps={{
                MenuListProps: {
                  className: 'bg-color-grey color-grey-darken-4'
                }
              }}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="suggestive">Suggestive</MenuItem>
              <MenuItem value="nsfw">NSFW</MenuItem>
            </Select>
        </FormGroup>
      </React.Fragment>
    );
  }
}

export default EditableFields;
