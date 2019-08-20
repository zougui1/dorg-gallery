import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import Pagination from '../Pagination';

const mapStateToProps = mapDynamicState('gallery: images showOverlay');

class Images extends React.Component {

  state = {
    pageCount: 150,
  }

  componentDidMount() {
    // request for the pageCount
  }


  renderOverlays = image => {
    const { showOverlay } = this.props;

    if(showOverlay.all && image.canvas) {
      const { canvas } = image;
      let overlays = [];

      for (const key in canvas) {
        const imageElement = (
          <img key={canvas[key]} className={'image overlay ' + key} src={canvas[key]} alt="" />
        );
        overlays.push(imageElement);
      }
      return overlays
    }
  }

  resizeContainer = e => {
    const self = e.target;
    const width = self.offsetWidth;
    self.offsetParent.style.width = width + 'px';
  }

  render() {
    const { pageCount } = this.state;
    const { images } = this.props;

    return (
      <Grid container justify="center">
        <Grid item>
          {images.map(image => (
            <div key={image._id} className="image-container">
              <Link to={'/image/' + image._id}>
                <img onLoad={this.resizeContainer} src={image.thumb} className="image mainImage" alt="" />
                {this.renderOverlays(image)}
              </Link>
            </div>
          ))}
        </Grid>
        <Grid item>
          <Pagination
            pageCount={pageCount}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Images);
