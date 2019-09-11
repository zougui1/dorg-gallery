import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import AccountSettings from './AccountSettings';
import UpdatePassword from './UpdatePassword';
import Auth from '../../../services/Auth';

class Profile extends React.Component {

  state = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  componentDidMount() {
    process.nextTick(() => this.setState({ username: Auth.getUser().name }));
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <Grid container justify="center">
        <Typography variant="h2" className="mt-3 mb-5 pb-5">Work In Progress</Typography>
        <AccountSettings onChange={this.handleChange} state={this.state} />
        <UpdatePassword onChange={this.handleChange} state={this.state} />
      </Grid>
    );
  }
}

export default Profile;
