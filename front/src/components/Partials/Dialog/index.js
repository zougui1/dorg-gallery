import React from 'react';
import _ from 'lodash';
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText as MuiDialogContentText,
} from '@material-ui/core';

import DialogContentText from './DialogContentText';
import DialogTitle from './DialogTitle';
import OverrideReactElement from '../OverrideReactElement';

class Dialog extends React.Component {

  // Material-ui's `DialogContent` component
  static Content = DialogContent;
  // Material-ui's `DialogContentText` component
  static Text = MuiDialogContentText;
  // custom component wrapping Material-ui's `DialogContentText` within `DialogContent`
  static ContentText = DialogContentText;
  // custom component for the Title component
  static Title = DialogTitle;

  /**
   * override the children if the first children is DialogTitle
   * and has the props `closer` set to `true`
   * @returns {ReactElement}
   */
  getChildren = () => {
    const { children, onClose } = this.props;

    if (!_.isArray(children) || !_.isObject(children[0])) {
      return children;
    }

    if (children[0].type.name === 'DialogTitle' && children[0].props.closer === true) {
      return (
        <OverrideReactElement onClose={onClose} index={0}>{children}</OverrideReactElement>
      );
    }

    return children;
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <MuiDialog {...props}>{this.getChildren()}</MuiDialog>
    );
  }
}

export default Dialog;
