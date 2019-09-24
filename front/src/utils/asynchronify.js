import React from 'react';
import AsyncComponent from '../components/Partials/AsyncComponent';

export const asynchronify = (name, moduleProvider) =>
  props =>
    <AsyncComponent
      {...props}
      name={name}
      moduleProvider={moduleProvider}
    />;
