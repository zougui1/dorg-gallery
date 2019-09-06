import React from 'react';

import EditableFields from './EditableFields';
import FormWrapper from '../FormWrapper';

class EditableForm extends React.Component {

  /**
   * validate the form
   * @throws {Error} if the `formData` is not valid
   * @returns {Boolean}
   */
  validate = formData => {
    // the image is required
    if (!formData.rate) {
      throw new Error('You must rate your image!');
    }

    return true;
  }

  render() {
    const { formData, changeFormData, onSubmit } = this.props;

    return (
      <FormWrapper
        formData={formData}
        changeFormData={changeFormData}
        Form={EditableFields}
        onSubmit={onSubmit}
        validate={this.validate}
      />
    );
  }
}

export default EditableForm;
