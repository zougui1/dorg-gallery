import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import Gallery from '../../Partials/Gallery';
import * as socket from '../../Partials/Gallery/Image/socket';

const mapDispatchToProps = mapDynamicDispatch('gallery: currentImage');

class Show extends React.Component {

  componentDidMount() {
    const { match, currentImage } = this.props;
    socket.On.sendImage(data => currentImage.set(data.image));

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
    const { currentImage } = this.props;
    socket.Remove.sendImage(data => currentImage.set(data.image));
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

export default connect(null, mapDispatchToProps)(Show);
