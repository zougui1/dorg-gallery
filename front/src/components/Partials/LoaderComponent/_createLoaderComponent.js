import React from 'react';

import Loader from '../Loader';
import { createSetLoader, initSetLoader, defaultLoader } from './_setLoader';

export const createLoaderComponent = (Superclass, updater) => class LoaderComponent extends Superclass {

  // we don't want to get a reference to the `defaultLoader`
  loader = {...defaultLoader};

  constructor(props) {
    super(props);

    // used to update the component
    // since it is a pure component, only `forceUpdate` will update the component
    this.setLoader = createSetLoader(this, () => updater(this));

    // add custom function to `this.setLoader` to simplify the change of the loader's state
    initSetLoader(this);
  }

  Loader = () => <Loader {...this.loader} />;
}
