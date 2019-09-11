import React from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import './Home.scss';

const mapDispatchToProps = mapDynamicDispatch('gallery: currentPage');

class Home extends React.Component {

  componentDidMount() {
    const { currentPage } = this.props;

    currentPage.inc(1);
    currentPage.inc(5);
    currentPage.dec(3);
  }


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

export default connect(null, mapDispatchToProps)(Home);
