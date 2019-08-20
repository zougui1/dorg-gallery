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

    if (deniedPage.require) {
      this.setState({ deniedAlert: true });
    }
  }

  componentWillUnmount() {
    this.handleClose();
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

    socket.Emit.login(formData);
    socket.On.loginSuccess(this.loginSuccess(formData));
    socket.On.loginFail(this.loginFail);
  }

  loginSuccess = formData => () => {
    this.changeLoader({ success: true });
    Auth.login(formData);
  }

  loginFail = err => {
    this.changeLoader({ error: true, errorMessage: err });
  }

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
