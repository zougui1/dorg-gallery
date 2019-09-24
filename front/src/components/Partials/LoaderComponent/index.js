import { Component } from 'react';

import PureLoaderComponent from './PureLoaderComponent';
import { createLoaderComponent } from './_createLoaderComponent';

const LoaderComponent = createLoaderComponent(Component, thisArg => thisArg.setState({}));
LoaderComponent.Pure = PureLoaderComponent;

export default LoaderComponent
