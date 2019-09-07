import React from 'react';

import FormDialog from './FormDialog';
import { Button } from '@material-ui/core';

class DataEditionDialog extends React.Component {

  state = {
    open: false,
  }

  /**
   * is called when the form is submited
   */
  submit = () => {
    this.handleClose();
  }

  handleClick = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <span className="panel-row">
        <FormDialog open={open} onClose={this.handleClose} onSubmit={this.submit} />

        <Button className="color-white" onClick={this.handleClick}>Edit the form data</Button>
      </span>
    );
  }
}

export default DataEditionDialog;
