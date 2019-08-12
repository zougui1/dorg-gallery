import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Checkbox from './Checkbox';
import uploaderState from '../../../../../../store/states/uploader';

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels imagesToUpload');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData resetReducer');

class DisplayPanel extends React.Component {

  updateCanvasData = newData => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData({
      ...canvasData,
      ...newData
    });
  }

  /**
   * display or no the layer where the user writes
   */
  displayInputs = () => {
    const { canvasData } = this.props;

    const overlayContainer = document.getElementById('overlay-container');

    if (canvasData.displayInputs) { // hide the text
      overlayContainer.classList.add('hideInputs');
    } else { // show the text
      overlayContainer.classList.remove('hideInputs');
    }

    // update the value
    this.updateCanvasData({ displayInputs: !canvasData.displayInputs });
  }

  /**
   * display or no the layer where the user draws
   */
  displayMainLayer = () => {
    const { canvasData } = this.props;

    if (canvasData.displayMainLayer) { // hide the drawing
      canvasData.context.canvas.classList.add('d-none');
    } else { // show the drawing
      canvasData.context.canvas.classList.remove('d-none');
    }

    // update the value
    this.updateCanvasData({ displayMainLayer: !canvasData.displayMainLayer });
  }

  // clear the whole canvas
  clearCanvas = () => {
    const { canvasData } = this.props;
    const { context, imageBounds } = canvasData;

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
            checked={canvasData.displayInputs}
            onChange={this.displayInputs}
          />

          <Checkbox
            label="Display drawing"
            name="displayMainLayer"
            checked={canvasData.displayMainLayer}
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
