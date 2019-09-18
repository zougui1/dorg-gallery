import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import './Alert.scss';
import Dialog from '../../Partials/Dialog';

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
        <Dialog.Title closer id="alert-dialog-title">
          Access denied!
        </Dialog.Title>

        <Dialog.ContentText textProps={{ id: 'alert-dialog-description' }}>
          You do not have access to <span className="bb-1">{deniedPage.path}</span>
          <br />
          {this.supplementText()}
        </Dialog.ContentText>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps)(Alert);
