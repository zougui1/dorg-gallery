import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import galleryState from '../../../../store/states/gallery';
import Pagination from '../../Pagination';
import OverlayedImage from '../../OverlayedImage';
import ImageContainer from '../../ImageContainer';
import './Images.scss';

const mapStateToProps = mapDynamicState('gallery: images showOverlay currentPage currentUser');
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setImages setCurrentPage');

class Displayer extends React.Component {

  state = {
    pageCount: 150,
  }

  /**
   * called when the client change of page
   */
  handlePageChange = e => {
    const { history, currentUser, setCurrentPage, setImages } = this.props;
    // remove all the images
    setImages([]);
    // update the URL
    history.push(`/gallery/${currentUser}/${e.selected + 1}`);
    // update the current page
    setCurrentPage(e.selected + 1);
  }

  render() {
    const { pageCount } = this.state;
    let { images, currentPage } = this.props;

    if (!_.isArray(images)) {
      images = [];
    }

    return (
      <Grid container alignItems="center" direction="column" className="Images">
        <Grid item container direction="row" wrap="wrap" justify="center" className="px-2 mt-4">
          {images.map(image => (
            <ImageContainer
              subContainer={({ children }) => <Link to={'/image/' + image._id}>{children}</Link>}
              key={image._id}
            >
              <OverlayedImage src={image.thumb} image={image} />
            </ImageContainer>
          ))}
        </Grid>
        <Grid item>
          <Pagination
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Displayer);
