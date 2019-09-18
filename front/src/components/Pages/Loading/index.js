import React from 'react';
import _ from 'lodash';
import { LinearProgress, Typography, Grid } from '@material-ui/core';

import './Loading.scss';

const Loading = ({ name }) => (
  <Grid container className="Loading" justify="center">
    <LinearProgress classes={{ bar: 'bar' }} className="p-absolute top-0 page-loader w-100" />

    <Typography variant="h4" className="py-2 by-2 border-gradient color-blue">
      <span className="color-white">{_.upperFirst(name)} page is loading...</span>
    </Typography>
  </Grid>
);

export default Loading;
