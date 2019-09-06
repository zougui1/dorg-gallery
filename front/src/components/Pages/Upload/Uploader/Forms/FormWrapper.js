import React from 'react';
import _ from 'lodash';
import { FormGroup, Button } from '@material-ui/core';

class FormWrapper extends React.Component {

  state = {
    error: ''
  };

  /**
   * called when the `submit` event is triggered from the form
   */
  submit = e => {
    const { onSubmit, formData, validate } = this.props;
    e.preventDefault();

    try {
      if (validate(formData)) {
        onSubmit(e, formData);
      }
    } catch (error) {
      if (!_.isError(error)) {
        throw new Error(`validate must throw an Error. Got "${error}"`);
      }

      this.setState({ error: error.message });
    }
  }

  render() {
    const { error } = this.state;
    const { formData, changeFormData, Form } = this.props;

    return (
      <form onSubmit={this.submit} className="d-flex justify-content-center flex-column w-100">
        <Form formData={formData} changeFormData={changeFormData} />

        <FormGroup row className="d-flex justify-content-center mt-3">
          <Button color="primary" variant="contained" type="submit">
            submit
          </Button>
        </FormGroup>

        <FormGroup row className="d-flex justify-content-center mt-3">
          <p className="color-red-darken-1">{error}</p>
        </FormGroup>
      </form>
    );
  }
}

export default FormWrapper;
