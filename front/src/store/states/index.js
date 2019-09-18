import { CombineStates } from 'dynamic-redux';

import galleryState from './gallery';
import miscState from './misc';
import authState from './auth';
import uploaderState from './uploader';
import routerState from './router';

const states = new CombineStates([
  galleryState,
  miscState,
  authState,
  uploaderState,
  routerState,
]);

export default states;
