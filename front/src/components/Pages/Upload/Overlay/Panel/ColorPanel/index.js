import React from 'react';
import { connect } from 'react-redux';
import { FaEraser as _FaEraser } from 'react-icons/fa';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './ColorPanel.scss';

import swatches from '../ColorPanel/swatches';
import PanelSlider from '../PanelSlider';
import uploaderState from '../../../../../../store/states/uploader';
import show from '../../../../../../containers/show';

const FaEraser = show(_FaEraser);

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels imagesToUpload');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData resetReducer');

class ColorPanel extends React.Component {

  state = {
    alpha: this.props.canvasData.alpha
  };

  updateCanvasData = newData => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData({
      ...canvasData,
      ...newData
    });
  }

  onColorUpdate = (e, color) => {
    const { canvasData } = this.props;
    const { alpha } = this.state;

    if (e) {
      if (color !== 'erase') {
        canvasData.color = color;
        canvasData.contextAction = 'draw';
      } else {
        canvasData.contextAction = 'erase';
      }
    }

    let newColor = canvasData.color.replace(/[0-1]+([.][0-9]*)?\)$/, alpha + ')');
    canvasData.color = newColor;
    this.updateCanvasData(canvasData);
  }

  onAlphaChange = (e, value) => {
    const { canvasData } = this.props;

    this.setState({ alpha: value });
    canvasData.alpha = value;

    this.onColorUpdate();
  }

  render() {
    const { alpha } = this.state;

    return (
      <React.Fragment>
        <div className="panel-row">
          {swatches.map(swatch => (
            <div
              key={swatch.color}
              className={`c${swatch.id} swatch color`}
              onClick={e => this.onColorUpdate(e, swatch.color)}
            >
              <FaEraser
                show={swatch.color === 'erase'}
                className="color-black p-0 m-0 eraser-icon"
              />
            </div>
          ))}
        </div>

        <div className="panel-row">
          <PanelSlider
            name="alpha"
            label="Alpha"
            value={alpha}
            onChange={this.onAlphaChange}
            step={0.05}
            min={0.05}
            max={1}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPanel);