import React from 'react';
import * as Space from 'react-spaces';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './Gallery.scss';

import galleryState from '../../../store/states/gallery';
import Images from './Images';
import RightPanel from './RightPanel';
import { Grid } from '@material-ui/core';

const mapStateToProps = mapDynamicState('gallery: showOverlay filteredImages images');
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setCurrentPage');

class Gallery extends React.Component {

  state = {
    topSize: '0px'
  }

  componentDidMount() {
    this.setTopSize();
    window.addEventListener('resize', this.setTopSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTopSize);
  }

  setTopSize = () => {
    const navbar = document.getElementById('Navbar');
    const navbarHeight = navbar.offsetHeight + 'px';

    this.setState({ topSize: navbarHeight });
  }

  render() {
    const { topSize } = this.state;
    const { currentPage, match, history } = this.props;

    return (
      <div className="Gallery">
        <Space.Fill>
          <Space.Top size={topSize} />
          <Space.Fill>

            <Space.Fill scrollable>
              <Images history={history} currentPage={currentPage} />
            </Space.Fill>

            <Space.Right size="297px">
              <RightPanel />
            </Space.Right>

          </Space.Fill>
        </Space.Fill>
      </div>
    );
  }
}

Gallery.defaultProps = {
  currentPage: 1,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
