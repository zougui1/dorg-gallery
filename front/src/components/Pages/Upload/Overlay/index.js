import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';
import uploaderState from '../../../../store/states/uploader';

import Canvas from './Canvas';
import Panel from './Panel';

const mapStateToProps = mapDynamicState('uploader: imageData canvasSize canvasData imagesToUpload inputs');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setImageData setCanvasData');

class Overlay extends React.Component {

  canvas = null;
  img = React.createRef();

  state = {
    modalOpen: false,
    imageBounds: {},
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');

    this.setImageSize();

    document.body.addEventListener('click', this.handleModalClose);
  }

  setImageSize = () => {
    const { imageData, setImageData, canvasData, setCanvasData } = this.props;

    this.img.addEventListener('load', () => {
      const imageBounds = this.img.getBoundingClientRect();
      this.setState({ imageBounds });

      setImageData({
        ...imageData,
        width: imageBounds.width,
        height: imageBounds.height,
      });

      setCanvasData({
        ...canvasData,
        context: this.canvas.getContext('2d'),
        imageBounds: imageBounds,
        canvas: this.canvas,
        img: this.img,
      });

      this.setCanvasPosition(imageBounds);
    });
  }

  setCanvasPosition = position => {
    this.canvas.style.top = position.top + 'px';
    this.canvas.style.left = position.left + 'px';
  }

  modalClose = () => this.setState({ modalOpen: false });
  modalOpen = () => this.setState({ modalOpen: true });

  render() {
    const { imageData } = this.props;

    return (
      <div id="overlay-container">
        <img className="draw-on" src={imageData.imageBase64} ref={e => this.img = e} />
        <Canvas />

        <Panel />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
