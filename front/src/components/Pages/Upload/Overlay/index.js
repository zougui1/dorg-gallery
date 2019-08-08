import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import uploaderState from '../../../../store/states/uploader';

const mapStateToProps = mapDynamicState('uploader: imageData canvasSize currentCanvasData imagesToUpload inputs');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setImageToUpload setImageData setCurrentCanvasData');

class Overlay extends React.Component {

  imgRef = React.createRef();
  canvas = null;

  state = {
    modalOpen: false,
  };

  componentDidMount() {
    this.props.setCurrentCanvasData({
      ...this.props.currentCanvasData,
      context: this.canvas.getContext('2d'),
    });

    this.setSize();
    const positions = getPosition(this.imgRef.current);
    this.setState({ canvasPositions: positions });

    this.canvas.style.top = positions.top + 'px';
    this.canvas.style.left = positions.left + 'px';

    const htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.addEventListener('click', this.handleModalClose);
  }

  setSize = () => {
    const img = this.imgRef.current;

    img.addEventListener('load', () => {
      const height = img.offsetHeight;
      const width = img.offsetWidth;
      this.props.setImageData({
        ...this.props.imageData,
        width,
        height
      });
    });
  }

  onCreateInput = e => {
    let { inputKey, labels } = this.state;
    let { currentCanvasData } = this.props;

    labels.push(React.createRef());
    this.setState({ labels });
    let label;

    const element = (
      <label key={inputKey} data-key={inputKey} htmlFor={'input-' + inputKey} ref={labels[inputKey]} style={{top: e.clientY, left: e.clientX, color: currentCanvasData.color}} className="canvas-label" onClick={this.onInputClick}>
        Input
        <input id={'input-' + inputKey} data-key={inputKey} className="canvas-input" />
      </label>
    );

    const input = {
      element,
      inputKey,
      label: this.state.labels[inputKey]
    };

    inputKey++;
    const inputs = this.state.inputs.concat(input);
    this.setState({ inputs, inputKey });
  }

  setRef = ref => this.canvas = ref;

  eraseChangeHandler = checked => {
    if (checked) {
      this.props.setCurrentCanvasData({
        ...this.props.currentCanvasData,
        contextAction: 'erase',
      });
    } else {
      this.props.setCurrentCanvasData({
        ...this.props.currentCanvasData,
        contextAction: 'draw',
      });
    }
  }

  handleModalClose = () => this.setState({ modalOpen: false });
  handleModalOpen = () => this.setState({ modalOpen: true });

  render() {
    const { imageData } = this.props;
    const { canvasPositions, lastFocused } = this.state;

    const canvasDatas = {
      canvasPositions,
      canvas: this.canvas,
      imgRef: this.imgRef
    };

    const overlayContainer = document.getElementsByClassName('overlay-container')[0];

    return (
      <div className="overlay-container">
        <Canvas canvasDatas={canvasDatas} setRef={this.setRef} />
        <img className="draw-on" ref={this.imgRef} src={imageData.imageTemp64} alt=""/>

        <Swatches
          canvasDatas={canvasDatas}
          overlayContainer={overlayContainer}
          eraseChangeHandler={this.eraseChangeHandler}
          lastFocused={lastFocused}
          handleModalOpen={this.handleModalOpen}
        />
        <CanvasHelper open={this.state.modalOpen} onClose={this.handleModalClose} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
