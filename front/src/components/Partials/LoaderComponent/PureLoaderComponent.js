import { PureComponent } from 'react';

import { createLoaderComponent } from './_createLoaderComponent';

const PureLoaderComponent = createLoaderComponent(PureComponent, thisArg => thisArg.forceUpdate());

export default PureLoaderComponent
