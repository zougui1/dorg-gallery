import React from 'react';

import NonEditableFields from './NonEditableFields';
import FormWrapper from '../FormWrapper';

class NonEditableForm extends React.Component {

  /**
   * validate the form
   * @throws {Error} if the `formData` is not valid
   * @returns {Boolean}
   */
  validate = formData => {
    // the image is required
    if (!formData.image) {
      throw new Error('You must choose an image');
    }

    return true;
  }

  render() {
    const { formData, changeFormData, onSubmit } = this.props;

    return (
      <FormWrapper
        formData={formData}
        changeFormData={changeFormData}
        Form={NonEditableFields}
        onSubmit={onSubmit}
        validate={this.validate}
      />
    );
  }
}

export default NonEditableForm;
