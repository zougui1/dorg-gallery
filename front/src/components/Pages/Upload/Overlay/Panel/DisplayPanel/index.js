import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Checkbox from './Checkbox';

const mapStateToProps = mapDynamicState('uploader: canvasData');
const mapDispatchToProps = mapDynamicDispatch('uploader: canvasData');

class DisplayPanel extends React.Component {

  /**
   * update the variable `canvasData` in the store
   * @param {Object} newData
   */
  updateCanvasData = newData => {
    const { canvasData } = this.props;

    canvasData.set(newData);
  }

  /**
   * display or no the layer where the user writes
   */
  displayInputs = () => {
    const { canvasData } = this.props;

    const overlayContainer = document.getElementById('overlay-container');

    if (canvasData.get().displayInputs) { // hide the text
      overlayContainer.classList.add('hideInputs');
    } else { // show the text
      overlayContainer.classList.remove('hideInputs');
    }

    // update the value
    this.updateCanvasData({ displayInputs: !canvasData.get().displayInputs });
  }

  /**
   * display or no the layer where the user draws
   */
  displayMainLayer = () => {
    const { canvasData } = this.props;

    if (canvasData.get().displayMainLayer) { // hide the drawing
      canvasData.get().context.canvas.classList.add('d-none');
    } else { // show the drawing
      canvasData.get().context.canvas.classList.remove('d-none');
    }

    // update the value
    this.updateCanvasData({ displayMainLayer: !canvasData.get().displayMainLayer });
  }

  // clear the whole canvas
  clearCanvas = () => {
    const { canvasData } = this.props;
    const { context, imageBounds } = canvasData.get();

    context.clearRect(0, 0, imageBounds.width, imageBounds.height);
  }

  render() {
    const { canvasData } = this.props;

    return (
      <React.Fragment>
        <div className="panel-row">
          <Checkbox
            label="Display text"
            name="displayInputs"
            checked={canvasData.get().displayInputs}
            onChange={this.displayInputs}
          />

          <Checkbox
            label="Display drawing"
            name="displayMainLayer"
            checked={canvasData.get().displayMainLayer}
            onChange={this.displayMainLayer}
          />
        </div>

        <div className="panel-row">
          <Button
            className="color-white"
            id="clear"
            onClick={this.clearCanvas}
          >
            Clear overlay
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPanel);
