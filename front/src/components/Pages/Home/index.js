import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import './Home.scss';

class Home extends React.Component {

  render() {
    return (
      <Grid container className="Home" justify="center">
        <Typography variant="h4" className="text-white">
          There is nothing here yet ¯\_(ツ)_/¯
        </Typography>
      </Grid>
    )
  }
}

export default Home;
