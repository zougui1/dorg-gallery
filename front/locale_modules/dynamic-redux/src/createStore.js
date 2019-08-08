const { createStore, applyMiddleware, compose } = require('redux');

const _createStore = (reducer, middlewares) => {
  if(typeof middlewares === 'object' && !Array.isArray(middlewares)) {
    let middlewaresArr = [];
    let i = 0;

    for(const key in middlewares) middlewaresArr[i++] = middlewares[key];
    middlewares = middlewaresArr;
  }

  let enhancers;
  let devTools = [];

  if(window.devToolsExtension && process.env.NODE_ENV !== 'production') {
    devTools.push(window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }));
  }

  if(middlewares) enhancers = compose(applyMiddleware(...middlewares), ...devTools);
  else enhancers = devTools[0];

  return createStore(reducer, enhancers);
}


module.exports = _createStore;
