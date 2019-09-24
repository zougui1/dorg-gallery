import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import PGallery from '../../Partials/Gallery';

const mapDispatchToProps = mapDynamicDispatch('gallery: setCurrentPage setCurrentUser resetState');

class Gallery extends React.Component {

  componentDidMount() {
    const { resetGalleryState } = this.props;

    resetGalleryState();
    this.initGallery();
  }

  componentDidUpdate(prevProps) {
    const { match, setCurrentUser } = this.props;

    if (match.params.user_slug !== prevProps.match.params.user_slug) {
      setCurrentUser(match.params.user_slug);
    }
  }

  /**
   * used to set the data used by the gallery
   */
  initGallery = () => {
    const { match, setCurrentPage, setCurrentUser } = this.props;

    if (match.params.page) {
      setCurrentPage(match.params.page);
    }

    setCurrentUser(match.params.user_slug);
  }

  render() {
    const { history } = this.props;

    return <PGallery history={history} kind={PGallery.kind.multiple} />
  }
}

export default connect(null, mapDispatchToProps)(Gallery);
