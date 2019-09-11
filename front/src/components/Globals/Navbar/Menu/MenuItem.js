import React from 'react';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class MenuItem extends React.Component {

  /**
   * @returns {Object}
   */
  getProps = () => {
    const { onClick, to, ...rest } = this.props;

    const props = { ...rest };

    if (typeof onClick === 'function') {
      props.onClick = onClick;
    }

    if (typeof to === 'function') {
      props.to = to();
    } else if(to) {
      props.to = to;
    }

    return props;
  }

  /**
   * @returns {String | ReactElement}
   */
  getComponent = () => {
    const { to } = this.props;

    if (to) {
      return Link;
    }

    return 'div';
  }

  render() {
    const { onClose, children, className } = this.props;
    const Component = this.getComponent();

    return (
      <MuiMenuItem onClick={onClose} className="p-0">
        <Component
          {...this.getProps()}
          className={classNames('color-black d-block h-100 w-100 nav-link', className)}
        >
          {children}
        </Component>
      </MuiMenuItem>
    );
  }
}

export default MenuItem;
