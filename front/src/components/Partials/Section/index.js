import React from 'react';
import classNames from 'classnames';
import { Grid, Typography } from '@material-ui/core';

import SubSection from './SubSection';

const Section = ({ children, title, className, ...rest }) => (
  <Grid
    {...rest}
    xs={12}
    sm={11}
    container
    item
    className={classNames('justify-center sm:justify-start bg-color-grey-darken-4 color-grey-lighten-2 p-4 border-gradient by-1 my-2', className)}
  >
    <Typography variant="h5" className="mb-4 text-center sm:text-left">{title}</Typography>
    {children}
  </Grid>
);

Section.Sub = SubSection;

export default Section;
