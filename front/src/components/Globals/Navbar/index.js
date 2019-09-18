import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import Auth from '../../../services/Auth';
import Menu from './Menu';
import './Navbar.scss';

const mapStateToProps = mapDynamicState('auth: user');

class Navbar extends React.Component {

  render() {
    const { user } = this.props;

    return (
      <AppBar
        position="fixed"
        className="navbar"
        id="Navbar"
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                <Link className="color-white" to="/">D.Org gallery</Link>
              </Typography>
            </Grid>

            <Grid item>
              {
                Auth.isLogged() && <Link to="/upload"></Link>
              }
              <Menu user={user} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
