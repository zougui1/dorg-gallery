import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import Menu from './Menu';

const mapStateToProps = mapDynamicState('auth: user');

class Navbar extends React.Component {

  render() {
    const { user } = this.props;

    return (
      <AppBar position="fixed" className="bg-color-blue">
        <ToolBar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                <Link className="color-white" to="/">Dorg gallery</Link>
              </Typography>
            </Grid>

            <Grid item>
              <Menu user={user} />
            </Grid>
          </Grid>
        </ToolBar>
      </AppBar>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
