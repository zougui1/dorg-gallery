// all the status of the loader
const loaderProperties = ['success', 'loading', 'error', 'empty'];

/**
 * get a loader object with all its state properties set to `false` except the
 * property matching `type` that will be set to `true`
 * @param {String} type
 * @returns {Object}
 */
const getLoader = type => {
  const loader = {};

  // if the current prop is equal to the type it will be `true` the other will be `false`
  loaderProperties.forEach(prop => loader[prop] = type === prop);

  return loader;
}

/**
 * create a function to change the loader in the context of `thisArg`
 * with all its state properties set to `false` except the
 * property matching `type` that will be set to `true` with its message if any
 * @param {Object} thisArg caller's context
 * @param {Function} thisArg.setLoader
 * @param {String} type
 * @returns {Function}
 */
const createLoaderChanger = thisArg => type => {
  const loader = getLoader(type);

  return message => {

    if (message !== undefined) {
      loader[type + 'Message'] = message;
    }

    thisArg.setLoader(loader);
  }
}

/**
 * will init the `setLoader` function from `thisArg` to add specific utilities functions
 * @param {Object} thisArg caller's context
 * @param {Function} thisArg.setLoader the function that changes the `loader`'s state
 */
export const initSetLoader = thisArg => {
  const loaderChanger = createLoaderChanger(thisArg);

  thisArg.setLoader.success = loaderChanger('success');
  thisArg.setLoader.loading = loaderChanger('loading');
  thisArg.setLoader.error = loaderChanger('error');
  thisArg.setLoader.empty = loaderChanger('empty');
}

// loader setter
/**
 *
 * @param {Object} thisArg caller's context
 * @param {Function} callback function to call after the loader has been edited (must update the component)
 * @returns {Function}
 */
export const createSetLoader = (thisArg, callback) => data => {
  thisArg.loader = {
    ...thisArg.loader,
    ...data
  };

  callback();
}
