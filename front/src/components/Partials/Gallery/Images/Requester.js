import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import * as socket from './socket';

const mapStateToProps = mapDynamicState({
  gallery: 'searchOptions currentPage currentUser',
  auth: 'user'
});
const mapDispatchToProps = mapDynamicDispatch('gallery: images');

class Requester extends React.Component {

  state = {
    pageCount: 150,
  }

  componentDidMount() {
    socket.On.sendImage(data => this.setImages(data.images));
    this.request();
  }

  componentDidUpdate(prevProps) {
    const { user, searchOptions, currentPage, currentUser } = this.props;

    // we want to do a request only if
    // the user object has changed
    let canRequest = !_.isEqual(prevProps.user, user);
    // or if the searchOptions has changed
    canRequest = canRequest || !_.isEqual(prevProps.searchOptions, searchOptions);
    // or if the page has changed
    canRequest = canRequest || currentPage !== prevProps.currentPage;
    // or if the currentUser has changed
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
   * @param {Object[]} images
   */
  setImages = _images => {
    const { images } = this.props;
    images.set(_images);
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Requester);
