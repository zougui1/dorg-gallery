import React from 'react';
import { Typography } from '@material-ui/core';

import Checkbox from '../../Checkbox';
import { functionUpdate } from '../../../../utils';

class RatingRow extends React.Component {

  handleChange = value => {
    this.props.setState(functionUpdate({
      searchOptions: { $merge: { rating: value } }
    }))
  }

  render() {
    const { searchOptions } = this.props;

    return (
      <div className="panel-row">
        <Typography variant="h6" className="color-blue-darken-3">Rating</Typography>

        <div className="d-flex justify-content-between">
          <Checkbox.Multiple
            name="rating"
            value={searchOptions.rating}
            className="resize scale-1 m-0"
            data={[
              { label: 'General', name: 'general' },
              { label: 'Suggestive', name: 'suggestive' },
              { label: 'NSFW', name: 'nsfw' }
            ]}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default RatingRow;
