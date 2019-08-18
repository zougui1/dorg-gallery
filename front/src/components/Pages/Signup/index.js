import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Form from 'dynamic-form';
import { Link } from 'react-router-dom';

import './Signup.scss';

import Field from '../../Partials/Field';
import Loader from '../../Partials/Loader';
import Auth from '../../../services/Auth';
import * as socket from './socket';

class Signup extends React.Component {

  state = {
    loader: {
      loading: false,
      success: false,
      error: false,
      errorMessage: '',
      redirection: '/',
    }
  }

  changeLoader = data => {
    this.setState({
      loader: {
        ...this.state.loader,
        ...data
      }
    });
  }

  submit = formData => {
    this.changeLoader({ loading: true });

    socket.Emit.signup(formData);
    socket.On.signupSuccess(this.signupSuccess(formData));
    socket.On.uploadFail(this.uploadFail);
  }

  signupSuccess = formData => () => {
    this.changeLoader({ success: true });
    Auth.signup(formData);
  }

  uploadFail = err => {
    this.changeLoader({ error: true, errorMessage: err });
  }

  render() {
    const { errorMessage, loader } = this.state;

    return (
      <Grid container className="text-center Signup" justify="center">
        <Form
          onSubmit={this.submit}
          field={Field}
          title="Signup"
          fields={['username', 'password', 'confirmPassword']}
          submitText="Signup"
          errorMessage={errorMessage}
        >
          <Grid container className="mt-2" justify="center">
            <Loader {...loader} successMessage="Your account has been created" />
          </Grid>
        </Form>
      </Grid>
    );
  }
}

export default Signup;