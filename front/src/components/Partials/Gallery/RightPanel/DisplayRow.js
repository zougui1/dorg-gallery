import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Checkbox from '../../Checkbox';

const mapStateToProps = mapDynamicState('gallery: showOverlay');
const mapDispatchToProps = mapDynamicDispatch('gallery: setShowOverlay');

class DisplayRow extends React.Component {

  /**
   * handler when the checkboxes trigger the event `onChange`
   * @param {String[]} value
   */
  handleChange = value => {
    const { setShowOverlay } = this.props;
    setShowOverlay(value);
  }

  render() {
    const { showOverlay } = this.props;

    return (
      <div className="panel-row">
        <Typography variant="h6" className="color-blue-darken-3">Display overlays</Typography>

        <Checkbox.Multiple
            name="display"
            value={showOverlay}
            data={[
              { label: 'Drawing', name: 'draw' },
              { label: 'Text', name: 'text' }
            ]}
            onChange={this.handleChange}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRow);
