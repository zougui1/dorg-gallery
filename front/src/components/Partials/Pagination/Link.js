import React from 'react'
import { Link as RRDLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import galleryState from '../../../store/states/gallery';

const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setCurrentPage setImages');

class Link extends React.Component {

  render() {
    const { index, basePath, current, setCurrentPage, setImages, children } = this.props;

    return (
      <li></li>
    );
  }
}

export default connect(null, mapDispatchToProps)(Link);
