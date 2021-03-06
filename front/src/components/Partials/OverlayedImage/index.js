import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

const mapStateToProps = mapDynamicState('gallery: currentImage showOverlay');

class OverlayedImage extends React.Component {

  /**
   * render the overlays if necessary
   * @param {Object} image
   * @param {String} image.draw link to the drawing overlay
   * @param {String} image.text link to the text overlay
   * @returns {ReactElement[]}
   */
  renderOverlays = image => {
    const { showOverlay } = this.props;
    let overlays = [];

    if(image.canvas) {
      const { canvas } = image;

      // eslint-disable-next-line
      for (const key in canvas) {
        if (!showOverlay.includes(key) || !canvas[key]) {
          continue;
        }

        const imageElement = (
          <img key={canvas[key]} className={'image overlay ' + key} src={canvas[key]} alt="" />
        );
        overlays.push(imageElement);
      }
    }

    return overlays
  }

  /**
   * is called when the image has loaded and call the `onLoad` function props (if any)
   */
  loadHandler = e => {
    const { onLoad } = this.props;

    if (_.isFunction(onLoad)) {
      onLoad(e);
    }
  }

  render() {
    const { image, src } = this.props;

    if (!image) {
      return null;
    }

    return (
      <React.Fragment>
        <img
          onLoad={this.loadHandler}
          src={src}
          className={`image mainImage ${image.rate}`}
          alt=""
        />
        {this.renderOverlays(image)}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(OverlayedImage);
