import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import AccountSettings from './AccountSettings';
import UpdatePassword from './UpdatePassword';
import Blacklist from './Blacklist';
import Auth from '../../../services/Auth';
import socket from './socket';
import Loader from '../../Partials/Loader';

class Profile extends React.Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    userId: '',

    loader: {
      error: false,
      loading: false,
      success: false,
      successMessage: 'Your data has been succesfully updated'
    }
  }

  componentDidMount() {
    socket.On.editUserDataSuccess(this.userDataUpdateSuccess);
    socket.On.editUserDataFail(this.userDataUpdateFail);

    // we need to get the user in the next tick, otherwise the user doesn't get
    // set in the case where the data are retrieved from the cache
    // and the user load the app on this page
    process.nextTick(() => {
      const { name, _id } = Auth.getUser();

      this.setState({ username: name, userId: _id });
    });
  }

  componentWillUnmount() {
    socket.Remove.editUserDataSuccess(this.userDataUpdateSuccess);
    socket.Remove.editUserDataFail(this.userDataUpdateFail);
  }

  submit = e => {
    const { userId, password, loader, ...userData } = this.state;
    e.preventDefault();

    if (this.validate()) {
      this.changeLoader({ loading: true, error: false, success: false });

      socket.Emit.editUserData({ id: userId, password, user: userData });
    }
  }

  validate = () => {
    const { username, password, confirmPassword } = this.state;

    const error = {
      error: true,
      errorMessage: ''
    };

    if (!username) {
      error.errorMessage = 'The username is required';
    }

    if (password) {
      if (password.length < 8) {
        error.errorMessage = 'The password must be at least 8 characters length';
      }

      if (password !== confirmPassword) {
        error.errorMessage = 'The password and the password confirmation doesn\'t match';
      }
    }

    if (error.errorMessage) {
      this.changeLoader(error);
      return false;
    }

    return true;
  }

  userDataUpdateSuccess = data => {
    Auth.login(data.user);
    this.changeLoader({ success: true, loading: false });
  }

  userDataUpdateFail = data => {
    this.changeLoader({ error: true, loading: false, errorMessage: data.error });
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  changeLoader = obj => {
    this.setState(prevState => ({
      loader: {
        ...prevState.loader,
        ...obj
      }
    }));
  }

  render() {
    const { loader } = this.state;

    return (
      <Grid container justify="center">
        <Typography variant="h2" className="mt-3 mb-5">Work In Progress</Typography>
        <form onSubmit={this.submit}>
          <Grid container justify="center">
            <AccountSettings onChange={this.handleChange} state={this.state} />
            <UpdatePassword onChange={this.handleChange} state={this.state} />
            <Blacklist onChange={this.handleChange} state={this.state} />

            <Grid container item direction="column" alignItems="center">
              <Button type="submit" variant="contained" className="mb-3 bg-color-grey-darken-1 color-white mt-3">Update account settings</Button>
              <Loader {...loader} />
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  }
}

export default Profile;
