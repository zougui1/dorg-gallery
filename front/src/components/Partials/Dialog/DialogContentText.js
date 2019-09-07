import React from 'react';
import {
  DialogContent,
  DialogContentText as MuiDialogContentText,
} from '@material-ui/core';

class DialogContentText extends React.Component {

  render() {
    const { children, contentProps, textProps } = this.props;

    return (
      <DialogContent {...contentProps}>
        <MuiDialogContentText {...textProps}>{children}</MuiDialogContentText>
      </DialogContent>
    );
  }
}

export default DialogContentText;
