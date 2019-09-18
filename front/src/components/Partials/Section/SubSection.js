import React from 'react';
import { Grid } from '@material-ui/core';

const SubSection = ({ children }) => (
  <Grid container item alignItems="center">
    <Grid item container xs={12} sm={4} className="justify-center sm:justify-start text-center sm-text-left">
      {children[0]}
    </Grid>
    <Grid item container xs={12} sm={8} className="justify-center md:justify-start">
      {children[1]}
    </Grid>
  </Grid>
);

export default SubSection;
