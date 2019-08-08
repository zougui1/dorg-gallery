import { createStore } from 'dynamic-redux';

import reducers from './states';

export default createStore(reducers);
