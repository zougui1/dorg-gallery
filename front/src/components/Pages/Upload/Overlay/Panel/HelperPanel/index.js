import React from 'react';

import CanvasHelper from './CanvasHelper';

class HelperPanel extends React.Component {

  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <div className="panel-row">
        <CanvasHelper onClose={this.handleClose} open={open} />

        <span className="pointer" onClick={this.handleOpen}>Need help to draw an overlay?</span>
      </div>
    );
  }

}

export default HelperPanel;
