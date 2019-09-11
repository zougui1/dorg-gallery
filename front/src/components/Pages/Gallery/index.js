import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import PGallery from '../../Partials/Gallery';

const mapDispatchToProps = mapDynamicDispatch('gallery: currentPage currentUser');

class Gallery extends React.Component {

  componentDidMount() {
    this.initGallery();
  }

  componentDidUpdate(prevProps) {
    const { match, currentUser } = this.props;

    if (match.params.user_slug !== prevProps.match.params.user_slug) {
      currentUser.set(match.params.user_slug);
    }
  }

  /**
   * used to set the data used by the gallery
   */
  initGallery = () => {
    const { match, currentPage, currentUser } = this.props;

    if (match.params.page) {
      currentPage.set(match.params.page);
    }

    currentUser.set(match.params.user_slug);
  }

  render() {
    const { history } = this.props;

    return <PGallery history={history} kind={PGallery.kind.multiple} />
  }
}

export default connect(null, mapDispatchToProps)(Gallery);
