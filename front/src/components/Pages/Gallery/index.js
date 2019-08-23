import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import PGallery from '../../Partials/Gallery';
import galleryState from '../../../store/states/gallery';

const mapStateToProps = mapDynamicState('gallery: currentPage');
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setCurrentPage setCurrentUser');

class Gallery extends React.Component {

  componentDidMount() {
    const { match, setCurrentPage, setCurrentUser } = this.props;

    if (match.params.page) {
      setCurrentPage(match.params.page);
    }

    setCurrentUser(match.params['user_slug']);
  }


  render() {
    const { currentPage, history } = this.props;

    return <PGallery history={history} currentPage={currentPage} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
