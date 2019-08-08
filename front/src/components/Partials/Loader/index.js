import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

import './Loader.scss';

class Loader extends React.Component {

  state = {
    canRedirect: false
  }

  componentDidUpdate(prevProps, prevState) {
    const { redirection, completed, timeout } = this.props;

    if (redirection && completed && completed !== prevProps.completed) {
      setTimeout(() => this.setState({ canRedirect: true }), timeout == null ? 1500 : timeout);
    }
  }

  render() {
    const {
      color,
      size,
      thickness,
      successMessage,
      success,
      loading,
      redirection,
      error,
      errorMessage,
      empty,
      emptyMessage
    } = this.props;
    const { canRedirect } = this.state;

    if (loading && !success && !error) {
      return (
        <div>
          <CircularProgress color={color || 'primary'} size={size || 40} thickness={thickness || 5} />
        </div>
      );
    } else if (success && !empty) {
      return (
        <p className="success">
          {successMessage}
          {canRedirect && <Redirect to={redirection} />}
        </p>
      );
    } else if (error) {
      return (
        <p className="error">
          { errorMessage }
        </p>
      );
    } else if (empty && success) {
      return (
        <p>
          { emptyMessage }
        </p>
      );
    } else {
      return null;
    }
  }

}

export default Loader;
