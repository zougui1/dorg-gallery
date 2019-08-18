import React from 'react';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

class MenuItem extends React.Component {

  getProps = () => {
    const { onClick, to, ...rest } = this.props;

    const props = { ...rest };

    if (typeof onClick === 'function') {
      props.onClick = onClick;
    }

    if (to) {
      props.to = to;
    }

    return props;
  }

  getComponent = () => {
    const { to } = this.props;

    if (to) {
      return Link;
    }

    return 'div';
  }

  render() {
    const { onClose, children } = this.props;
    const Component = this.getComponent();

    return (
      <MuiMenuItem onClick={onClose}>
        <Component {...this.getProps()}>
          {children}
        </Component>
      </MuiMenuItem>
    );
  }
}

export default MenuItem;
