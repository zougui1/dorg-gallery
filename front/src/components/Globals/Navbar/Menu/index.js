import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MuiMenu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import Auth from '../../../../services/Auth';
import * as data from './data';
import MenuItem from './MenuItem';

class Menu extends React.Component {

  state = {
    // wether or no the menu is opened
    menu: null
  }

  /**
   * get the menu contents
   */
  getMenu = () => {
    const dataLinks = this.getDataLinks();

    return this.parseDataToMenu(dataLinks);
  }

  /**
   * get the data links depending on the user data
   */
  getDataLinks = () => {
    let dataLinks = [];

    if (!Auth.isLogged()) {
      dataLinks = [...data.guest];

      return dataLinks;
    }

    if (Auth.isUser()) {
      dataLinks = [...data.user];
    }

    return dataLinks;
  }

  /**
   * parse the data links into jsx
   */
  parseDataToMenu = dataLinks => {
    let links = [];

    dataLinks.forEach(link => {
      links[links.length] = (
        <MenuItem key={link.label} onClose={this.handleClose} {...link} >
          {link.label}
        </MenuItem>
      );
    });

    return links;
  }

  // open the menu
  handleClick = e => this.setState({ menu: e.currentTarget });
  // close the menu
  handleClose = () => this.setState({ menu: null });

  render() {
    const { menu } = this.state;

    return (
      <div>
        <i
          className="fa fa-bars fa-2x color-white pointer"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        ></i>
        <MuiMenu
          id="navbar-menu"
          keepMounted
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={this.handleClose}
        >
          {this.getMenu()}
        </MuiMenu>
      </div>
    )
  }
}

export default Menu;
