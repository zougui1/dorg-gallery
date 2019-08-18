import React from 'react';
import _Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import uploaderState from '../../../../../store/states/uploader';
import show from '../../../../../containers/show';
import socket from '../../Uploader/socket';

const Button = show(_Button);

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels imagesToUpload');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData setImagesToUpload resetReducer');

class Uploader extends React.Component {

  state = {
    loader: {
      loading: false,
      success: false,
      error: false,
      errorMessage: '',
    },

    uploading: false
  };

  componentWillUnmount() {
    socket.Remove.uploadSuccess(this.uploadSuccess);
    socket.Remove.uploadFail(this.uploadFail);
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
   */
  pixelToNumber = str => {
    return +str.replace('px', '');
  }

  /**
   * is called when the user click on the upload button
   */
  uploadHanler = () => {
    this.setState({ loader: { loading: true }, uploading: true });

    this.setImagesToUpload();

    this.upload();
  }

  /**
   * is used to set the existing layers into na object as image to upload
   */
  setImagesToUpload = () => {
    let { imagesToUpload, setImagesToUpload, canvasData } = this.props;

    const textCanvas = this.createTextCanvas();
    const drawingOverlay = canvasData.canvas.toDataURL();

    // since the user choosed to draw an overlay we consider they have drawn on it
    imagesToUpload.draw = drawingOverlay;

    // textCanvas may not exist
    if (textCanvas) {
      imagesToUpload.text = textCanvas.toDataURL();
    } else {
      // we set in the canvasData that there is no text
      canvasData.hasTextCanvas = false;
      this.updateCanvasData();
    }

    setImagesToUpload({ imagesToUpload });
  }

  /**
   * create a canvas and write the text of all the textboxes the user has created with their positions, color and font size
   */
  createTextCanvas = () => {
    const { canvasData, inputs } = this.props;

    // if there's no input we don't want to create a canvas
    if (inputs.length === 0) {
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
      const { imagesToUpload , canvasData } = this.props;
      const { hasTextCanvas } = canvasData;

      // 2 images have to be uploaded
      const upload2Images = imagesToUpload.draw && !imagesToUpload.text && !hasTextCanvas;

      // 3 images have to be uploaded
      const upload3Images = imagesToUpload.draw && imagesToUpload.text && hasTextCanvas;

      if (upload2Images || upload3Images) {
        const { imageData } = this.props;
        const images = { ...imageData, ...imagesToUpload };

        socket.Emit.uploadImage(images);
        socket.On.uploadSuccess(this.uploadSuccess);
        socket.On.uploadFail(this.uploadFail);
      }
    }, 0);
  }

  uploadSuccess = () => this.setState({ loader: { success: true } });
  uploadFail = () => this.setState({ loader: { error: true } });

  render() {
    const { uploading, loader } = this.state;

    return (
      <div className="panel-row">
        <Button className="color-white" show={!uploading} onClick={this.uploadHanler}>
          Upload
        </Button>
        {/*<Loader {...loader} successMessage="The image has been uploaded" />*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
