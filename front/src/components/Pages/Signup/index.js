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

  /**
   * used to change the data in the loader object of the state
   * @param {Object} data
   */
  changeLoader = data => {
    this.setState({
      loader: {
        ...this.state.loader,
        ...data
      }
    });
  }

  /**
   * is called when a submit event get triggered with all the fields in the form valid
   * @param {Object} formData the data of all the fields in the form
   */
  submit = formData => {
    this.changeLoader({ loading: true });

    socket.Emit.signup(formData);
    socket.On.signupSuccess(data => this.signupSuccess(data.user));
    socket.On.signupFailed(this.signupFailed);
  }

  /**
   * called if the server could sign up the user
   * @param {Object} userData all the data of the user from the DB
   */
  signupSuccess = userData => {
    this.changeLoader({ success: true });
    Auth.signup(userData);
  }

  /**
   * called if the server couldn't sign up the user
   * @param {Object} data from the server
   * @param {String} data.error error message
   */
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
