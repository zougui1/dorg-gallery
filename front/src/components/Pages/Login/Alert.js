import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Grid, Tooltip, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import './Alert.scss';

const mapStateToProps = mapDynamicState('auth: deniedPage');

class Alert extends React.Component {

  state = {
    // keep the deniedPage the user tried to access, in the state
    // if we don't, the time for the dialog to be fully closed, the text change
    // due to the data changed in the store
    deniedPage: this.props.deniedPage
  }

  supplementText = () => {
    const { deniedPage } = this.state;

    // if the required role to access the page is 'ROLE_USER', we tell the client
    // that they need to be logged to access the page
    if (deniedPage.require === 'ROLE_USER') {
      return 'You must be logged to access this page.';
    }
  }

  render() {
    const { deniedPage } = this.state;
    const { open, onClose } = this.props;

    return (
      <Dialog
        className="Alert"
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="py-2" id="alert-dialog-title">
          <Grid container justify="space-between" alignItems="center">
            <span>Access denied!</span>
            <Tooltip title="Close" aria-label="close">
              <IconButton onClick={onClose} className="pointer bg-color-transparent-and-hover">
                <i className="fas fa-times square-icon"></i>
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You do not have access to <span className="bb-1">{deniedPage.path}</span>
            <br />
            {this.supplementText()}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps)(Alert);
