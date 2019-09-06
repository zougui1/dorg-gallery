import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

const mapStateToProps = mapDynamicState('gallery: currentImage');

const Content = ({ currentImage: image }) => (
  <Grid container direction="column">
    <Grid item>
      <Typography variant="h5">{image.title}</Typography>
    </Grid>
    <Grid item>
      <p>
        {image.description}
      </p>
    </Grid>
  </Grid>
);

export default connect(mapStateToProps)(Content);
