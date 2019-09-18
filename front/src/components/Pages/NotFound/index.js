import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import './NotFound.scss';

const NotFound = () => (
  <Grid container className="NotFound" justify="center">
    <Typography variant="h4" className="py-2 by-2 border-gradient color-blue">
      <span className="color-white">The page you're trying to acces doesn't exists</span>
    </Typography>
  </Grid>
);

export default NotFound;
