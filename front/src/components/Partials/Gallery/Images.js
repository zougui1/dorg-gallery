import React from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import galleryState from '../../../store/states/gallery';
import Pagination from '../Pagination';
import * as socket from './socket';

const mapStateToProps = mapDynamicState({
  gallery: 'images showOverlay searchOptions currentPage currentUser',
  auth: 'user'
});
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setFilter setCurrentPage setImages setSearchOptions');

class Images extends React.Component {

  state = {
    pageCount: 150,
  }

  componentDidMount() {
    socket.On.sendImage(data => this.setImages(data.images));
    setTimeout(() => {
      this.request();
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const { user, searchOptions, currentPage, currentUser } = this.props;

    let canRequest = !_.isEqual(prevProps.user, user);
    canRequest = canRequest || !_.isEqual(prevProps.searchOptions, searchOptions);
    canRequest = canRequest || currentPage !== prevProps.currentPage;
    canRequest = canRequest || currentUser !== prevProps.currentUser;

    if (canRequest) {
      this.request();
    }
  }

  componentWillUnmount() {
    socket.Remove.sendImage(data => this.setImages(data.images));
  }


  request = () => {
    let { user, currentPage, searchOptions, currentUser } = this.props;

    if (typeof searchOptions.search === 'string') {
      // avoid spaces
      searchOptions.search = searchOptions.search.trim().split(' ').filter(str => str);
    }

    // emit to get the images
    const emitData = {
      tags: [...searchOptions.search, currentUser],
      page: currentPage,
      searchOptions: searchOptions,
      user: user,
    }

    socket.Emit.getImagesPage(emitData);
  }

  setImages = images => {
    const { setImages } = this.props;
    setImages(images);
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

  handlePageChange = e => {
    const { history, currentUser, setCurrentPage } = this.props;
    // update the URL
    history.push(`/gallery/${currentUser}/${e.selected + 1}`);
    // update the current page
    setCurrentPage(e.selected + 1);
  }

  render() {
    const { pageCount } = this.state;
    const { images, currentPage } = this.props;

    return (
      <Grid container alignItems="center" direction="column" className="Images">
        <Grid item container direction="row" wrap="wrap" justify="center" className="px-2 mt-4">
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
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);
