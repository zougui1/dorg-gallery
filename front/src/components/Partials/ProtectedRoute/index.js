import React from 'react';
import _ from 'lodash';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Auth from '../../../services/Auth';

const mapStateToProps = mapDynamicState('auth: user');
const mapDispatchToProps = mapDynamicDispatch('auth: setDeniedPage');

class ProtectedRoute extends React.Component {

  state = {
    redirect: false,
  }

  componentDidMount() {
    this.setDeniedPageIfAccessDenied();
  }

  /**
   * set denied page data if the client doesn't have access to the page
   */
  setDeniedPageIfAccessDenied = () => {
    const { setDeniedPage, role } = this.props;

    if (Auth.hasRole(role)) {
      return;
    }

    setDeniedPage({
      path: window.location.href,
      require: role,
    });

    this.setState({ redirect: true });
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (!_.isEqual(prevProps.user, user)) {
      this.setDeniedPageIfAccessDenied();
    }
  }


  render() {
    const { redirect } = this.state;
    const { role, ...rest } = this.props;

    // if the client have the required role, they can access the route
    // otherwise we redirect them to the login page
    if (Auth.hasRole(role)) {
      return <Route {...rest} />;
    } else {
      return redirect && <Redirect to="/login" />;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
