import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Grid, Hidden } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Pagination from '../../Pagination';
import OverlayedImage from '../../OverlayedImage';
import ImageContainer from '../../ImageContainer';
import Section from '../../Section';
import './Images.scss';

const mapStateToProps = mapDynamicState('gallery: images currentPage currentUser');
const mapDispatchToProps = mapDynamicDispatch('gallery: currentPage searchOptionsPanel');

class Displayer extends React.Component {

  state = {
    pageCount: 150,
  }

  /**
   * called when the client change of page
   */
  handlePageChange = e => {
    const { history, currentUser, currentPage, images } = this.props;
    // remove all the images
    images.set([]);
    // update the URL
    history.push(`/gallery/${currentUser}/${e.selected + 1}`);
    // update the current page
    currentPage.set(e.selected + 1);
  }

  /**
   * is called when the client click on div
   * set `searchOptionsPanel` to true
   */
  openPanel = () => {
    const { searchOptionsPanel } = this.props;

    searchOptionsPanel.set(true);
  }

  render() {
    const { pageCount } = this.state;
    let { _images, currentPage } = this.props;

    let images = _images.get()

    if (!_.isArray(images)) {
      images = [];
    }

    return (
      <Grid container justify="center" className="Images">
        <Section>
          <Grid container alignItems="center" direction="column">
            <Hidden mdUp>
              <Grid container item justify="flex-end">
                <Grid item className="px-5 mt-4">
                  <div onClick={this.openPanel} className="pointer">
                    <span className="mr-2">Search options</span>
                    <i className="fas fa-caret-right lg"></i>
                  </div>
                </Grid>
              </Grid>
            </Hidden>
            <Grid item container direction="row" wrap="wrap" justify="center" className="px-2 mt-4">
              {images.map(image => (
                <ImageContainer
                  className="z-elevation-3 z-elevation-7-hover shadow-trans"
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
                currentPage={currentPage.get()}
                pageCount={pageCount}
              />
            </Grid>
          </Grid>
        </Section>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Displayer);
