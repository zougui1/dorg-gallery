import React from 'react';
import AsyncComponent from '../components/Pages/AsyncComponent';

export const asynchronify = (name, moduleProvider) =>
  props =>
    <AsyncComponent
      {...props}
      name={name}
      moduleProvider={moduleProvider}
    />;
