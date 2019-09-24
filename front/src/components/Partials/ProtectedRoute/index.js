import React from 'react';
import _ from 'lodash';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Auth from '../../../services/Auth';

const mapStateToProps = mapDynamicState('auth: user');
const mapDispatchToProps = mapDynamicDispatch('auth: setDeniedPage');

class ProtectedRoute extends React.Component {

  componentDidMount() {
    this.accessDenied();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (!_.isEqual(prevProps.user, user)) {
      this.accessDenied();
    }
  }

  /**
   * set denied page data if the client doesn't have access to the page
   */
  setDeniedPage = () => {
    const { setDeniedPage, role } = this.props;

    setDeniedPage({
      path: window.location.href,
      require: role,
    });
  }

  /**
   * set denied page data if the access is denied to the user
   */
  accessDenied = () => {
    const { role } = this.props;

    if (!Auth.hasRole(role)) {
      this.setDeniedPage();
    }
  }

  render() {
    const { role, ...rest } = this.props;

    // if the client have the required role, they can access the route
    // otherwise we redirect them to the login page
    if (Auth.hasRole(role)) {
      return <Route {...rest} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
