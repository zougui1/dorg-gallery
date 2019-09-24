import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import './Home.scss';
import LoaderComponent from '../../Partials/LoaderComponent';

class Home extends LoaderComponent {

  componentDidMount() {
    this.setLoader.loading();

    let time = 0;

    const timeout = cb => setTimeout(cb, time += 500);

    timeout(() => this.setLoader.success('successMessage'));
    timeout(() => this.setLoader.error());
    timeout(() => this.setLoader.success());
    timeout(() => this.setLoader.error('an error'));
    timeout(() => this.setLoader.info('there is nothing'));
    timeout(() => this.setLoader.loading('load again', 500));
    time += 1000;
    timeout(() => this.setLoader.reset());
  }

  render() {
    return (
      <Grid container className="Home" justify="center">
        <Typography variant="h4" className="text-white">
          {this.Loader()}
          There is nothing here yet ¯\_(ツ)_/¯
        </Typography>
      </Grid>
    )
  }
}

export default Home;
