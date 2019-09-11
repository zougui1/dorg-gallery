import React from 'react';
import { connect } from 'react-redux';
import { FaEraser as _FaEraser } from 'react-icons/fa';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './ColorPanel.scss';

import swatches from '../ColorPanel/swatches';
import PanelSlider from '../PanelSlider';
import show from '../../../../../../containers/show';

const FaEraser = show(_FaEraser);

const mapStateToProps = mapDynamicState('uploader: canvasData');
const mapDispatchToProps = mapDynamicDispatch('uploader: canvasData');

class ColorPanel extends React.Component {

  state = {
    alpha: this.props.canvasData.get.alpha
  };

  /**
   * update the variable `canvasData` in the store
   * @param {Object} newData
   */
  updateCanvasData = newData => {
    const { canvasData } = this.props;

    canvasData.set({
      ...canvasData.get,
      ...newData
    });
  }

  /**
   * is called each time the color is changed
   * @param {String} color
   */
  onColorUpdate = (e, color) => {
    const { canvasData } = this.props;
    const { alpha } = this.state;

    if (e) {
      // erase isn't a color but the context action
      if (color !== 'erase') {
        canvasData.get.color = color;
        canvasData.get.contextAction = 'draw';
      } else {
        canvasData.get.contextAction = 'erase';
      }
    }

    // change the alpha
    let newColor = canvasData.get.color.replace(/[0-1]+([.][0-9]*)?\)$/, alpha + ')');
    canvasData.get.color = newColor;

    this.updateCanvasData(canvasData);
  }

  /**
   * is called each time the alpha is changed, then update the color
   * @param {String} value
   */
  onAlphaChange = (e, value) => {
    const { canvasData } = this.props;

    this.setState({ alpha: value });
    canvasData.get.alpha = value;

    this.onColorUpdate();
  }

  /**
   * return an rgba color with the opacity to 1
   * @param {String} color
   * @returns {String}
   */
  getUnifiedColor = color => {
    const { canvasData } = this.props;

    if (canvasData.get.contextAction === 'draw') {
      if (color.indexOf('rgba') >= 0) {
        color = color.replace(/ /g, '').substring(0, color.lastIndexOf(','));
        color += ',1)';
      }
    } else {
      color = canvasData.get.contextAction;
    }

    return color;
  }

  render() {
    const { canvasData } = this.props;
    const { alpha } = this.state;

    const color = this.getUnifiedColor(canvasData.get.color, true);

    return (
      <React.Fragment>
        <div className="panel-row">
          {swatches.map(swatch => (
            <div
              key={swatch.color}
              className={`c${swatch.id} swatch color ${color === swatch.color ? 'active' : ''}`}
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
