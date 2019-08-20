import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import galleryState from '../../../store/states/gallery';
import Images from './Images';

const mapStateToProps = mapDynamicState('gallery: showOverlay filteredImages images');
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setCurrentPage');

class Gallery extends React.Component {

  render() {
    return <Images />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
