import React from 'react';
import { Grid } from '@material-ui/core';

import './Home.scss';

class Home extends React.Component {

  render() {
    return (
      <Grid container className="Home" justify="center">
        <h1>There is nothing here yet <span className="gradient">¯\_(ツ)_/¯</span></h1>
      </Grid>
    )
  }
}

export default Home;
