import React from 'react';
import { Grid } from '@material-ui/core';

const SubSection = ({ children }) => (
  <Grid container item alignItems="center">
    <Grid md={4} item>
      {children[0]}
    </Grid>
    <Grid item>
      {children[1]}
    </Grid>
  </Grid>
);

export default SubSection;
