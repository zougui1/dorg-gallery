import { CombineStates } from 'dynamic-redux';

import galleryState from './gallery';
import miscState from './misc';
import authState from './auth';
import uploaderState from './uploader';

const states = new CombineStates([
  galleryState,
  miscState,
  authState,
  uploaderState,
]);

export default states;
