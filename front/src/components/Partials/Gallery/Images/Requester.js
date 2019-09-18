import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import * as socket from './socket';

const mapStateToProps = mapDynamicState({
  gallery: 'searchOptions currentPage currentUser images loader',
  auth: 'user'
});
const mapDispatchToProps = mapDynamicDispatch('gallery: setImages mergeLoader setMaxPage');

class Requester extends React.Component {

  componentDidMount() {
    const { setMaxPage } = this.props;

    socket.On.sendImage(data => this.setImages(data.images));
    socket.On.sendImagesCount(data => setMaxPage(data.count));
    this.request();
  }

  componentDidUpdate(prevProps) {
    const { user, searchOptions, currentPage, currentUser, loader } = this.props;

    // we want to do a request only if
    // the user object has changed
    let canRequest = !_.isEqual(prevProps.user, user);
    // or if the searchOptions has changed
    canRequest = canRequest || !_.isEqual(prevProps.searchOptions, searchOptions);
    // or if the page has changed
    canRequest = canRequest || currentPage !== prevProps.currentPage;
    // or if the currentUser has changed
    canRequest = canRequest || currentUser !== prevProps.currentUser;

    if (loader.loading) {
      canRequest = false;
    }

    if (canRequest) {
      this.resetImages();
      this.request();
    }
  }

  componentWillUnmount() {
    socket.Remove.sendImage(data => this.setImages(data.images));
  }

  request = () => {
    let { user, currentPage, searchOptions, currentUser, mergeLoader } = this.props;

    mergeLoader({ loading: true, success: false, empty: false, error: false });

    if (typeof searchOptions.search === 'string') {
      // avoid spaces
      searchOptions.search = searchOptions.search.trim().split(' ').filter(str => str);
    }

    // data used to make the query
    const emitData = {
      tags: [...searchOptions.search],
      page: currentPage,
      searchOptions: {
        ...searchOptions,
        match: {
          user: {
            slug: currentUser
          }
        },
      },
      user: user,
    }

    socket.Emit.getImagesPage(emitData);
  }

  /**
   * reset the images if any
   */
  resetImages = () => {
    const { images, setImages } = this.props;

    if (images.length) {
      // remove all the images
      setImages([]);
    }
  }

  /**
   * @param {Object[]} images
   */
  setImages = images => {
    const { setImages, mergeLoader } = this.props;
    images = images || [];

    setImages(images);
    mergeLoader({ loading: false, success: true, empty: !images.length });
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Requester);
