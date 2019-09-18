import React from 'react';
import _ from 'lodash';
import { Grid, Hidden } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import Description from './Description/index';
import OverlayedImage from '../../../OverlayedImage';
import ImageContainer from '../../../ImageContainer';
import RightPanelContainer from '../../RightPanel';
import RightPanel from '../RightPanel';
import './Image.scss';

const mapStateToProps = mapDynamicState('gallery: currentImage showOverlay');

class Displayer extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', e => this.resizeContainer(e, true));
  }

  /**
   * get the image size
   * @param {Boolean} useOffsetSize
   * @returns { { width: Number, height: Number} }
   */
  getImgSize = (img, useOffsetSize) => {
    let width, height;

    if (!_.isObject(img)) {
      return { width: 0, height: 0 };
    }

    if (useOffsetSize) {
      width = img.offsetWidth;
      height = img.offsetHeight;
    } else {
      width = img.naturalWidth;
      height = img.naturalHeight;
    }

    return { width, height };
  }

  /**
   * is called when an image has loaded
   * used to resize the container of the image to the height of the image
   * so the container can shrink with the image
   * @param {Boolean} useOffsetSize
   */
  resizeContainer = (_, useOffsetSize) => {
    const img = document.getElementsByClassName('mainImage')[0];
    const imgContainer = document.getElementsByClassName('image-container')[0];

    const { height } = this.getImgSize(img, useOffsetSize);

    // redefine the height of the `imgContainer`
    imgContainer.style.height = height + 'px';
  }

  render() {
    const { currentImage: image } = this.props;

    if (!image) {
      return null;
    }

    return (
      <Grid container className="Image">
        <Grid container item justify="center" className="bg-color-grey-darken-4">
          <ImageContainer>
            <OverlayedImage src={image.link} image={image} />
          </ImageContainer>
        </Grid>
        <Grid container item justify="center" className="bg-color-grey-darken-3 p-2">
          <Description />
        </Grid>
        <Hidden mdUp>
          <Grid container item justify="center" className="bg-color-grey-darken-3 p-2">
            <RightPanelContainer>
              <RightPanel />
            </RightPanelContainer>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Displayer);
