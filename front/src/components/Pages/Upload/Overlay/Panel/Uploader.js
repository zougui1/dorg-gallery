import React from 'react';
import _Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import uploaderState from '../../../../../store/states/uploader';
import show from '../../../../../containers/show';

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

  updateCanvasData = () => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData(canvasData);
  }

  pixelToNumber = str => {
    return +str.replace('px', '');
  }

  uploadHanler = () => {
    this.setState({ loader: { loading: true }, uploading: true });

    this.setImagesToUpload();

    this.upload();
  }

  setImagesToUpload = () => {
    let { imagesToUpload, setImagesToUpload, canvasData } = this.props;

    const textCanvas = this.createTextCanvas();
    const drawingOverlay = canvasData.canvas.toDataURL();

    imagesToUpload.draw = drawingOverlay;

    if (textCanvas) {
      imagesToUpload.text = textCanvas.toDataURL();
    } else {
      canvasData.hasTextCanvas = false;
      this.updateCanvasData();
    }

    setImagesToUpload({ imagesToUpload });
  }

  createTextCanvas = () => {
    const { canvasData, inputs } = this.props;
    const { width, height } = canvasData.imageBounds;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width - 300;
    canvas.height = height;

    if (inputs.length === 0) {
      return;
    }

    inputs.forEach(field => {
      const label = field.label;
      const style = label.style;
      const input = label.getElementsByClassName('canvas-input')[0];

      let fontSize = this.pixelToNumber(input.style.fontSize);
      fontSize = (fontSize + 3) + 'px';

      const left = this.pixelToNumber(style.left);
      const top = this.pixelToNumber(style.top) + 12;

      context.fillStyle = style.color;
      context.font = fontSize + ' sans-serif';
      context.fillText(input.value, left, top);
    });

    return canvas;
  }

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

        //emit.uploadImage(imageDataWithCanvas);
        //on.uploaded(() => this.setState({ loader: { success: true } }));
        //on.uploadError(() => this.setState({ loader: { error: true } }));
      }
    }, 0);
  }

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
