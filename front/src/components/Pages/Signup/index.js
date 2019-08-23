import React from 'react';
import Grid from '@material-ui/core/Grid';
import Form from 'dynamic-form';

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

  componentWillUnmount() {
    socket.Remove.signupSuccess(data => this.signupSuccess(data.user));
    socket.Remove.signupFailed(this.signupFailed);
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
    socket.On.signupSuccess(data => this.signupSuccess(data.user));
    socket.On.signupFailed(this.signupFailed);
  }

  signupSuccess = userData => {
    this.changeLoader({ success: true });
    Auth.signup(userData);
  }

  signupFailed = data => {
    this.changeLoader({ error: true, errorMessage: data.error });
  }

  render() {
    const { loader } = this.state;

    return (
      <Grid container className="text-center Signup" justify="center">
        <Form
          onSubmit={this.submit}
          field={Field}
          title="Signup"
          fields={['username', 'password', 'confirmPassword']}
          submitText="Signup"
          errorMessage=""
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
