import React from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';
import Content from './Content';
import './Description.scss';

const Description = () => (
  <Grid container item className="bg-color-grey-darken-1 color-white pt-2 px-3 Description">
    <Header />
    <hr className="gradient color-grey my-2" />
    <Content />
  </Grid>
);

export default Description;
