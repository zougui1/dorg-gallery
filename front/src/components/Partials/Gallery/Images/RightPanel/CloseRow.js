import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

const mapDispatchToProps = mapDynamicDispatch('gallery: searchOptionsPanel');

class CloseRow extends React.Component {

  handleClose = () => {
    const { searchOptionsPanel } = this.props;

    searchOptionsPanel.set(false);
  }

  render() {
    const { size } = this.props;

    if (size === 'large') {
      return null;
    }

    return (
      <div className="panel-row d-flex justify-content-end px-2">
        <i className="fas fa-times fa-2x pointer" onClick={this.handleClose}></i>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(CloseRow);
