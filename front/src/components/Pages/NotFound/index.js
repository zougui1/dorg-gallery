import React from 'react';
import { Grid } from '@material-ui/core';

import './NotFound.scss';

const NotFound = () => (
  <Grid container className="NotFound" justify="center">
    <h1 className="py-2 by-2 border-gradient color-blue">
      <span className="color-black">The page you're trying to acces doesn't exists</span>
    </h1>
  </Grid>
);

export default NotFound;
