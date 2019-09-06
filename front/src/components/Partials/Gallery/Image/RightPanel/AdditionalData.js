import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import './Tags.scss';

const mapStateToProps = mapDynamicState('gallery: currentImage');

class Tags extends React.Component {

  getValidElement = () => {
    const { currentImage } = this.props;

    if (validator.isURL(currentImage.artist.link)) {
      return ({ children }) => <Link target="blank" to={currentImage.artist.link}>{children}</Link>;
    }

    return ({ children }) => <span>{children}</span>;
  }

  render() {
    const { currentImage } = this.props;

    if (!currentImage) {
      return null;
    }

    const Link = this.getValidElement();

    return (
      <div className="panel-row Tags">
        <div>
          <span className="fw-500">Artist name:</span> <Link>{currentImage.artist.name}</Link>
        </div>
        <div>
          <span className="fw-500">Character name:</span> <span>{currentImage.characterName}</span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Tags);
