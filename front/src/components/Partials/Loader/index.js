import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

import './Loader.scss';

class Loader extends React.Component {

  state = {
    canRedirect: false
  }

  componentDidUpdate(prevProps, prevState) {
    const { redirection, success, timeout } = this.props;

    /**
     * if there is a redirection and the loading is completed
     * we make the redirection after a timeout
     */
    if (redirection && success && success !== prevProps.success) {
      setTimeout(() => this.setState({ canRedirect: true }), timeout == null ? 1500 : timeout);
    }
  }

  render() {
    const {
      color,
      size,
      thickness,
      success,
      successMessage,
      loading,
      loadingMessage,
      redirection,
      error,
      errorMessage,
      empty,
      emptyMessage
    } = this.props;
    const { canRedirect } = this.state;

    if (loading && !success && !error && !empty) {
      return (
        <div>
          <CircularProgress color={color || 'secondary'} size={size || 40} thickness={thickness || 5} />
          <span className="ml-2 loading">
            {loadingMessage}
          </span>
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
    } else if (empty) {
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
