import React from 'react';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

const mapStateToProps = mapDynamicState('gallery: currentImage');

const Header = ({ currentImage: image }) => (
  <Grid container item justify="space-between">
    <Grid item>
      <Typography variant="h6">{image.user.name}</Typography>
    </Grid>
    <Grid item>
      <span className={`rating ${image.rate}`}>{_.capitalize(image.rate)}</span>
    </Grid>
  </Grid>
);

export default connect(mapStateToProps)(Header);
