import React from 'react';

import NonEditableForm from './Forms/NonEditableFields/index';
import EditableForm from './Forms/EditableFields/index';

class FormDisplayer extends React.Component {

  state = {
    title: '',
    artistName: '',
    artistLink: '',
    tags: [],
    withOverlay: false,
    rate: 'general',
    image: null,
    step: 1,
  }

  /**
   * get the form depending on the step
   * @returns {ReactComponent}
   * @throws {Error} if the step is invalid
   */
  getForm = () => {
    const { step } = this.state;

    switch (step) {
      case 1:
        return NonEditableForm;
      case 2:
        return EditableForm;
      default:
        throw new Error(`Invalid step. got "${step}"`);
    }
  }

  /**
   * is called when the form has been submited and validated
   */
  submit = e => {
    const { step } = this.state;
    const { onSubmit } = this.props;

    if (step === 2) {
      onSubmit(this.state, e);
    } else {
      this.setState({ step: step + 1 });
    }
  }

  /**
   * give the form the possibility to edit the state
   */
  _setState = obj => this.setState(obj);

  render() {
    const Form = this.getForm();

    return (
      <Form formData={this.state} changeFormData={this._setState} onSubmit={this.submit} />
    );
  }
}

export default FormDisplayer;
