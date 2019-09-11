import React from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import './Tags.scss';

const mapStateToProps = mapDynamicState('gallery: currentImage');

class Tags extends React.Component {

  getValidElement = () => {
    const { currentImage } = this.props;

    if (validator.isURL(currentImage.artist.link)) {
      return ({ children, ...rest }) => <a {...rest} rel="noreferrer" href={currentImage.artist.link}>{children}</a>;
    }

    return ({ children, ...rest }) => <span {...rest}>{children}</span>;
  }

  render() {
    const { currentImage } = this.props;

    if (!currentImage) {
      return null;
    }

    const Link = this.getValidElement();

    return (
      <div className="panel-row AdditionalData">
        <span className="fw-500">Artist name:</span> <Link className="color-white">{currentImage.artist.name}</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Tags);
