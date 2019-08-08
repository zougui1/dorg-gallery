import { combineReducers } from 'redux';

import galleryState from './gallery';
import miscState from './misc';
import authState from './auth';
import uploaderState from './uploader';

const reducers = combineReducers({
  miscReducer: miscState.reducer,
  uploaderReducer: uploaderState.reducer,
  galleryReducer: galleryState.reducer,
  authReducer: authState.reducer,
});

export default reducers;
