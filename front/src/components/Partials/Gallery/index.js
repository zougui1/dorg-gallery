import React from 'react';
import * as Space from 'react-spaces';

import './Gallery.scss';

import * as Images from './Images/';
import * as Image from './Image/';
import RightPanel from './RightPanel';
import { Hidden } from '@material-ui/core';

class Gallery extends React.Component {

  static kind = {
    multiple: 0,
    single: 1,
  }

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

  /**
   * set `topSize` to the height of the navbar
   */
  setTopSize = () => {
    const navbar = document.getElementById('Navbar');
    const navbarHeight = navbar.offsetHeight + 'px';

    this.setState({ topSize: navbarHeight });
  }

  render() {
    const { topSize } = this.state;
    const { history, kind } = this.props;

    let GalleryKind = Images;

    const isMultiple = kind === Gallery.kind.multiple;
    const isSingle = kind === Gallery.kind.single;

    if (isMultiple) {
      GalleryKind = Images;
    } else if (isSingle) {
      GalleryKind = Image;
    } else {
      throw new Error(`Kind must be of value "Gallery.kind", got "${kind}"`);
    }

    return (
      <div className="Gallery">
        <GalleryKind.Requester />
        <Space.Fill>
          <Space.Top size={topSize} />
          <Space.Fill>

            <Space.Fill scrollable>
              <GalleryKind.Displayer history={history} />
            </Space.Fill>

            <Hidden smDown>
              <Space.Right size="297px">
                <RightPanel size="large">
                  <GalleryKind.RightPanel />
                </RightPanel>
              </Space.Right>
            </Hidden>

            {
              isMultiple && (
                <Hidden mdUp>
                  <RightPanel size="small">
                    <GalleryKind.RightPanel />
                  </RightPanel>
                </Hidden>
              )
            }

          </Space.Fill>
        </Space.Fill>
      </div>
    );
  }
}

Gallery.defaultProps = {
  currentPage: 1,
};

export default Gallery;
