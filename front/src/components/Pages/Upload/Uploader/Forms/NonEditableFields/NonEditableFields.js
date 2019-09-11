import React from 'react';
import { FormGroup, Button } from '@material-ui/core';

import Checkbox from '../../../../../Partials/Checkbox';

class NonEditableFields extends React.Component {

  /**
   * is called when the client select one file or more
   */
  handleFiles = e => {
    const { files } = e.target;

    this.changeFormData('image', files[0]);
  }

  /**
   * is called when the client check/uncheck a checkbox
   */
  handleCheckboxChange = e => {
    const { name, checked } = e.target;

    this.changeFormData(name, checked);
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

        <FormGroup row className="justify-content-center">
          <Checkbox
            onChange={this.handleCheckboxChange}
            checked={formData.withOverlay}
            name="withOverlay"
            label="Draw an overlay over the image?"
          />
        </FormGroup>

        <FormGroup row className="justify-content-center">
          <input
            type="file"
            id="image"
            className="d-none"
            accept="image/*"
            onChange={this.handleFiles}
          />
          <label htmlFor="image">
            <Button variant="contained" component="span" className="bg-color-grey-darken-1 color-white">Browse</Button>
          </label>
        </FormGroup>

      </React.Fragment>
    );
  }
}

export default NonEditableFields;
