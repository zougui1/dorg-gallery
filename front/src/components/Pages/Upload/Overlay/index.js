import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Canvas from './Canvas';
import Panel from './Panel';

const mapStateToProps = mapDynamicState('uploader: imageData canvasData');
const mapDispatchToProps = mapDynamicDispatch('uploader: imageData canvasData');

class Overlay extends React.Component {

  canvas = null;
  img = React.createRef();

  state = {
    imageBounds: {},
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas');

    this.setImageSize();

    document.body.addEventListener('click', this.handleModalClose);
  }

  setImageSize = () => {
    const { imageData, canvasData } = this.props;

    this.img.addEventListener('load', () => {
      const imageBounds = this.img.getBoundingClientRect();
      this.setState({ imageBounds });

      imageData.merge({
        width: imageBounds.width,
        height: imageBounds.height,
      });

      canvasData.merge({
        context: this.canvas.getContext('2d'),
        imageBounds: imageBounds,
        canvas: this.canvas,
        img: this.img,
      });

      this.setCanvasPosition(imageBounds);
    });
  }

  /**
   * set the position of the canvas
   * @param {Object} position
   * @param {Number} position.top
   * @param {Number} position.left
   */
  setCanvasPosition = position => {
    this.canvas.style.top = position.top + 'px';
    this.canvas.style.left = position.left + 'px';
  }

  render() {
    const { imageData } = this.props;

    return (
      <div id="overlay-container">
        <img className="draw-on" src={imageData.get().imageBase64} ref={e => this.img = e} alt="" />
        <Canvas />

        <Panel modalOpen={this.modalOpen} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
