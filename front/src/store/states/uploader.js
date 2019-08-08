import { DynamicState } from 'dynamic-redux';

const uploaderState = new DynamicState({
  formView: 'Uploader',
  imageData: {},
  currentCanvasData: {
    color: 'rgba(0,0,0,0.5)',
    eraseSize: 10,
    fontSize: 16,
    displayMainLayer: true,
    displayInputs: true,
    alpha: 0.5,
    contextAction: 'draw',
    drawing: false,
    context: null,
    hasTextCanvas: true,
    draggingOut: false,
  },
  imagesToUpload: {},
  inputs: [],
  labels: [],
});

uploaderState.createState({
  setFormView: 'SET_FORM_VIEW',
  setImageData: 'SET_IMAGE_DATA',
  setCurrentCanvasData: 'SET_CURRENT_CANVAS_DATA',
  setImageToUpload: 'SET_IMAGE_TO_UPLOAD',
  addCanvasField: { type: 'ADD_CANVAS_FIELD', prop: 'inputs' },
  editCanvasField: { type: 'EDIT_CANVAS_FIELD', prop: 'labels' },
  setCanvasField: { type: 'SET_CANVAS_FIELD', prop: 'inputs' },
  addCanvasLabel: { type: 'ADD_CANVAS_LABEL', prop: 'labels' },
  editCanvasLabel: { type: 'EDIT_CANVAS_LABEL', prop: 'labels' },
  resetReducer: 'RESET_REDUCER'
});

export default uploaderState;
