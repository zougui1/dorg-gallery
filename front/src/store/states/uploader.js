import { DynamicState } from 'dynamic-redux';

const uploaderState = new DynamicState('uploader', {
  formView: 'Uploader',
  imageData: {},
  canvasData: {
    color: 'rgba(0,0,0,0.5)',
    eraseSize: 10,
    fontSize: 16,
    displayMainLayer: true,
    displayInputs: true,
    alpha: 0.5,
    lineWidth: 3,
    contextAction: 'draw',
    drawing: false,
    context: null,
    hasTextCanvas: true,
    hasDrawingCanvas: true,
    draggingOut: false,
    imageBounds: {},
    canvas: null,
    img: null,
  },
  imagesToUpload: {},
  inputs: [],
  labels: [],
});

uploaderState.createState({
  setFormView: 'SET_FORM_VIEW',
  setImageData: 'SET_IMAGE_DATA',
  setCanvasData: 'SET_CANVAS_DATA',
  setImagesToUpload: 'SET_IMAGES_TO_UPLOAD',
  setCanvasField: { type: 'SET_CANVAS_FIELD', prop: 'inputs' },
  setCanvasLabel: { type: 'SET_CANVAS_LABEL', prop: 'labels' },
  resetReducer: 'RESET_REDUCER'
});

export default uploaderState;
