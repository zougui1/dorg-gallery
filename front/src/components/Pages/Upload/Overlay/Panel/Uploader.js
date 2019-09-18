import React from 'react';
import _Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import show from '../../../../../containers/show';
import socket from '../../Uploader/socket';
import Loader from '../../../../Partials/Loader';

const Button = show(_Button);

const mapStateToProps = mapDynamicState({
  uploader: 'canvasData imageData inputs labels imagesToUpload',
  auth: 'user'
});
const mapDispatchToProps = mapDynamicDispatch('uploader: setCanvasData setImagesToUpload');

class Uploader extends React.Component {

  state = {
    loader: {
      loading: false,
      redirection: '/',
      success: false,
      error: false,
      errorMessage: '',
    },

    uploading: false
  };

  componentWillUnmount() {
    socket.Remove.imageUploaded(this.imageUploaded);
    socket.Remove.imageUploadFailed(this.imageUploadFailed);
  }

  /**
   * update the variable 'canvasData' in the store
   */
  updateCanvasData = () => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData(canvasData);
  }

  /**
   * cast a pixel string into a number
   * @param {String} str
   * @returns {Number}
   */
  pixelToNumber = str => {
    return +str.replace('px', '');
  }

  /**
   * is called when the user click on the upload button
   */
  uploadHanler = () => {
    this.setState({
      loader: {
        ...this.state.loader,
        loading: true
      }, uploading: true
    });

    this.setImagesToUpload();

    this.upload();
  }

  /**
   * is used to set the existing layers into na object as image to upload
   */
  setImagesToUpload = () => {
    let { setImagesToUpload, canvasData, imagesToUpload } = this.props;

    const textCanvas = this.createTextCanvas();
    const drawingCanvas = this.getDrawingCanvas();

    // drawingCanvas may not exist
    if (drawingCanvas) {
      imagesToUpload.draw = drawingCanvas.toDataURL();
    } else {
      // we set in the canvasData that there is no drawing
      canvasData.hasDrawingCanvas = false;
    }

    // textCanvas may not exist
    if (textCanvas) {
      imagesToUpload.text = textCanvas.toDataURL();
    } else {
      // we set in the canvasData that there is no text
      canvasData.hasTextCanvas = false;
    }

    this.updateCanvasData();
    setImagesToUpload(imagesToUpload);
  }

  /**
   * get the drawing canvas if the user has drawn on it
   */
  getDrawingCanvas = () => {
    const { canvasData } = this.props;
    const { width, height } = canvasData.imageBounds;

    const pixelBuffer = new Uint32Array(
      canvasData.context.getImageData(0, 0, width, height).data.buffer
    );


    if (pixelBuffer.some(color => color !== 0)) {
      return canvasData.canvas;
    }
  }

  /**
   * create a canvas and write the text of all the textboxes the user has created with their positions, color and font size
   */
  createTextCanvas = () => {
    const { canvasData, inputs } = this.props;

    // if there's no input we don't want to create a canvas
    if (!inputs.length) {
      console.log('no input');
      return;
    }

    const { width, height } = canvasData.imageBounds;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // set the new canvas size to the same as the image
    canvas.width = width - 300;
    canvas.height = height;

    inputs.forEach(field => {
      const label = field.label;
      const style = label.style;
      // get the input within the current label
      const input = label.getElementsByClassName('canvas-input')[0];

      // get the font size and increase it
      let fontSize = this.pixelToNumber(input.style.fontSize);
      fontSize = (fontSize + 3) + 'px';

      // get the label's position
      const left = this.pixelToNumber(style.left);
      // since the label top position is higher than the position
      // of the text inside the input, we increase it to make it lower
      const top = this.pixelToNumber(style.top) + 12;

      context.fillStyle = style.color;
      context.font = fontSize + ' sans-serif';
      // write the text in the canvas
      context.fillText(input.value, left, top);
    });

    return canvas;
  }

  /**
   * upload the images to the server
   */
  upload = () => {
    setTimeout(() => {
      const { imagesToUpload , canvasData, user } = this.props;
      const { hasTextCanvas, hasDrawingCanvas } = canvasData;
      const { draw, text } = imagesToUpload;

      // 1 image have to be uploaded
      const upload1Image = !draw && !text && !hasTextCanvas && !hasDrawingCanvas;

      // there's drawing but no text
      const uploadWithDrawing = draw && hasDrawingCanvas && !text && !hasTextCanvas;
      // there's text but no drawing
      const uploadWithText = text && hasTextCanvas && !draw && !hasDrawingCanvas;

      // 2 images have to be uploaded
      const upload2Images = uploadWithDrawing || uploadWithText;

      // 3 images have to be uploaded
      const upload3Images = draw && text && hasTextCanvas;

      console.log(canvasData);
      console.log(imagesToUpload);
      if (upload1Image || upload2Images || upload3Images) {
        console.log('uploading');
        const { imageData } = this.props;
        const images = { ...imageData, ...imagesToUpload, user };

        socket.Emit.uploadImage(images);
        socket.On.imageUploaded(this.imageUploaded);
        socket.On.imageUploadFailed(this.imageUploadFailed);
      } else {
        console.log('not uploading');
      }
    }, 1000);
  }

  imageUploaded = () => this.setState({
    loader: {
      ...this.state.loader,
      success: true
    }
  });
  imageUploadFailed = () => this.setState({
    loader: {
      ...this.state.loader,
      error: true
    }
  });

  render() {
    const { uploading, loader } = this.state;

    return (
      <div className="panel-row">
        <Button className="color-white" show={!uploading} onClick={this.uploadHanler}>
          Upload
        </Button>
        <Loader {...loader} successMessage="The image has been uploaded" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
