import React from 'react';
import {
  Grid,
  Tooltip
} from '@material-ui/core';

class DialogTitleCloser extends React.Component {

  render() {
    const { children, onClose } = this.props;

    return (
      <Grid container justify="space-between">
        <Grid item>
          <span>{children}</span>
        </Grid>

        <Grid item>
          <Tooltip title="Close">
            <i className="fas fa-times pointer" onClick={onClose}></i>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

export default DialogTitleCloser;
