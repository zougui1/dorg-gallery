import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import galleryState from '../../../store/states/gallery';
import Gallery from '../../Partials/Gallery';
import * as socket from '../../Partials/Gallery/Image/socket';

const mapStateToProps = mapDynamicState('gallery: currentImage showOverlay');
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setCurrentImage setShowOverlay');

class Show extends React.Component {

  componentDidMount() {
    const { match, setCurrentImage } = this.props;
    socket.On.sendImage(data => setCurrentImage(data.image));

    if (match.params.id) {
      this.request();
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.id !== prevProps.match.params.id) {
      this.request();
    }
  }

  componentWillUnmount() {
    const { setCurrentImage } = this.props;
    socket.Remove.sendImage(data => setCurrentImage(data.image));
  }

  request = () => {
    const { match } = this.props;

    socket.Emit.getImageById({ id: match.params.id });
  }

  /**
   * @param {Object[]} images
   */
  setImages = images => {
    const { setImages } = this.props;
    setImages(images);
  }

  render() {
    const { history } = this.props;

    return <Gallery history={history} kind={Gallery.kind.single} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
