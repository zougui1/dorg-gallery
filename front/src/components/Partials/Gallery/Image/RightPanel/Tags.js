import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import './Tags.scss';
import { Grid } from '@material-ui/core';

const mapStateToProps = mapDynamicState('gallery: currentImage');

class Tags extends React.Component {

  render() {
    const { currentImage } = this.props;

    if (!currentImage) {
      return null;
    }

    currentImage.tags = currentImage.tags.filter(t => t.name !== '*');

    return (
      <div className="panel-row Tags">
        <Grid container>
          {currentImage.tags.map(tag => (
            <span className="tag py-1 px-3 m-1 bg-color-grey-darken-2" key={tag._id}>{tag.name}</span>
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Tags);
