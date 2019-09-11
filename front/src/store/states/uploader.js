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

uploaderState.createReducer({
  formView: 'set',
  imageData: ['set', 'merge'],
  canvasData: ['set', 'merge'],
  imagesToUpload: 'set',
  inputs: ['set', 'filter', 'map'],
  labels: ['set', 'filter', 'map'],
  resetReducer: 'reset'
});

export default uploaderState;
