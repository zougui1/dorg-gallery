import React from 'react';
import * as Space from 'react-spaces';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './Gallery.scss';

import galleryState from '../../../store/states/gallery';
import * as Images from './Images/';
import * as Image from './Image/';
import RightPanel from './RightPanel';

const mapStateToProps = mapDynamicState('gallery: showOverlay filteredImages images');
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setCurrentPage');

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

    switch (kind) {
      case Gallery.kind.multiple:
        GalleryKind = Images;
        break;
      case Gallery.kind.single:
        GalleryKind = Image;
        break;

      default:
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

            <Space.Right size="297px">
              <RightPanel >
                <GalleryKind.RightPanel />
              </RightPanel>
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
