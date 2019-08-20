import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import authState from '../../../store/states/auth';

const mapStateToProps = mapDynamicState('auth: user');
const mapDispatchToProps = mapDynamicDispatch(authState.actions, 'setDeniedPage');

class ProtectedRoute extends React.Component {

  state = {
    redirect: false,
  }

  componentDidMount() {
    const { setDeniedPage, role } = this.props;

    setDeniedPage({
      path: window.location.href,
      require: role,
    });

    setTimeout(() => {
      this.setState({ redirect: true });
    }, 0);
  }


  render() {
    const { redirect } = this.state;
    const { user, role, ...rest } = this.props;

    // if the user have the required role, they can access the route
    // otherwise we redirect them to the login page
    if (user.roles && user.roles.includes(role)) {
      return <Route {...rest} />;
    } else {
      return redirect && <Redirect to="/login" />;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
