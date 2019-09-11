import React from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';

import './Home.scss';

class Home extends React.Component {

  render() {
    return (
      <Grid container className="Home" justify="center">
        <h1 className="color-white">
          There is nothing here yet ¯\_(ツ)_/¯
        </h1>
      </Grid>
    )
  }
}

export default Home;
