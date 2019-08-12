import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import PanelSlider from '../PanelSlider';
import uploaderState from '../../../../../../store/states/uploader';

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels imagesToUpload');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData resetReducer');

class SizesPanel extends React.Component {

  state = {
    fontSize: this.props.canvasData.fontSize,
    eraseSize: this.props.canvasData.eraseSize,
  }

  updateCanvasData = () => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData(canvasData);
  }

  onSlideChange = (slider, asPx) => (e, value) => {
    const { canvasData } = this.props;

    this.setState({ [slider]: value });

    if (asPx) {
      value = value + 'px';
    }

    canvasData[slider] = value;
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
          onChange={this.onSlideChange('fontSize', true)}
          step={1}
          min={16}
          max={100}
        />

        {
          canvasData.contextAction === 'erase' && (
            <PanelSlider
              show={canvasData.contextAction === 'erase'}
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
