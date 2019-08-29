import React from 'react';
import Grid from '@material-ui/core/Grid';
import Form from 'dynamic-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import authState from '../../../store/states/auth';
import Field from '../../Partials/Field';
import Loader from '../../Partials/Loader';
import Auth from '../../../services/Auth';
import * as socket from './socket';
import Alert from './Alert';

const mapStateToProps = mapDynamicState('auth: deniedPage');
const mapDispatchToProps = mapDynamicDispatch(authState.actions, 'setDeniedPage');

class Login extends React.Component {

  state = {
    deniedAlert: false,

    loader: {
      loading: false,
      success: false,
      error: false,
      errorMessage: '',
      redirection: '/',
    }
  }

  componentDidMount() {
    const { deniedPage } = this.props;

    // if true this means the user got redirected from a page they don't have access to
    // so we want deniedAlert to be true
    if (deniedPage.require) {
      this.setState({ deniedAlert: true });
    }
  }

  componentWillUnmount() {
    this.handleClose();
    socket.Remove.loginSuccess(data => this.loginSuccess(data.user));
    socket.Remove.loginFailed(this.loginFailed);
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

    socket.Emit.login(formData);
    socket.On.loginSuccess(data => this.loginSuccess(data.user));
    socket.On.loginFailed(this.loginFailed);
  }

  /**
   * called if the user can log in
   * @param {Object} userData all the data of the user from the DB
   */
  loginSuccess = userData => {
    this.changeLoader({ success: true });
    Auth.login(userData);
  }

  /**
   * called if the user can't log in
   * @param {Object} data from the server
   * @param {String} data.error error message
   */
  loginFailed = data => {
    this.changeLoader({ error: true, errorMessage: data.error });
  }

  /**
   * called when the user close the dialog
   */
  handleClose = () => {
    const { setDeniedPage } = this.props;

    this.setState({ deniedAlert: false });
    setDeniedPage({});
  }

  render() {
    const { loader, deniedAlert } = this.state;

    return (
      <Grid container className="text-center Login" justify="center">
        <Alert open={deniedAlert} onClose={this.handleClose} />
        <Form
          onSubmit={this.submit}
          field={Field}
          title="Login"
          fields={['username', 'password']}
          submitText="Login"
          errorMessage=""
        >
          <Grid container direction="column" className="mt-2" justify="center">
            <Link className="color-blue-lighten-1 mb-2" to="/signup">You do not have an account yet?</Link>
            <Loader {...loader} timeout={0} />
          </Grid>
        </Form>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
