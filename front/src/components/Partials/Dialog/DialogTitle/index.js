import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import DialogTitleCloser from './DialogTitleCloser';

class DialogTitle extends React.Component {

  childrenWrapper = () => {
    const { closer } = this.props;

    if (closer) {
      return DialogTitleCloser;
    }

    return ({ children }) => children;
  }

  render() {
    const { children, onClose, closer, ...props } = this.props;

    const ChildrenWrapper = this.childrenWrapper();

    return (
      <MuiDialogTitle {...props}>
        <ChildrenWrapper onClose={onClose}>
          {children}
        </ChildrenWrapper>
      </MuiDialogTitle>
    );
  }
}

export default DialogTitle;
