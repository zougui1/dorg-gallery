import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import PanelSlider from '../PanelSlider';

const mapStateToProps = mapDynamicState('uploader: canvasData');
const mapDispatchToProps = mapDynamicDispatch('uploader: canvasData');

class SizesPanel extends React.Component {

  state = {
    fontSize: this.props.canvasData.get().fontSize,
    eraseSize: this.props.canvasData.get().eraseSize,
  }

  /**
   * update the variable 'canvasData' in the store
   */
  updateCanvasData = () => {
    const { canvasData } = this.props;

    canvasData.set(canvasData.get());
  }

  /**
   * is called each time a slider is changed
   *
   * @param {String} slider name
   * @returns {Function}
   *
   * @param {Number} value
   */
  onSlideChange = slider => (e, value) => {
    const { canvasData } = this.props;

    this.setState({ [slider]: value });

    // we want to update the canvasData
    canvasData.get()[slider] = value;
    this.updateCanvasData();
  }

  render() {
    const { canvasData } = this.props;
    const { fontSize, eraseSize } = this.state;

    return (
      <div className="panel-row">
        <PanelSlider
          label="Font size"
          name="fontSize"
          value={fontSize}
          onChange={this.onSlideChange('fontSize')}
          step={1}
          min={16}
          max={100}
        />

        {
          canvasData.get().contextAction === 'erase' && (
            <PanelSlider
              show={canvasData.get().contextAction === 'erase'}
              label="Erase size"
              name="eraseSize"
              value={eraseSize}
              onChange={this.onSlideChange('eraseSize')}
              step={1}
              min={10}
              max={100}
            />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizesPanel);
