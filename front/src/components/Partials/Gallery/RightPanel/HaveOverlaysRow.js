import React from 'react';
import { Typography } from '@material-ui/core';

import Checkbox from '../../Checkbox';

class HaveOverlaysRow extends React.Component {

  handleChange = value => {
    this.props.setState(prevState => {
      const newSearchOptions = { ...prevState.searchOptions };
      const includedAll = prevState.searchOptions.haveOverlays.includes('*');

      if (includedAll) {
        if (value.length > 1) {
          newSearchOptions.haveOverlays = value.filter(str => str !== '*');
        } else {
          newSearchOptions.haveOverlays = value;
        }
      } else if (!includedAll) {
        if (value.includes('*')) {
          newSearchOptions.haveOverlays = ['*'];
        } else {
          newSearchOptions.haveOverlays = value;
        }
      } else {
        newSearchOptions.haveOverlays = value;
      }

      return { searchOptions: newSearchOptions };
    });
  }

  render() {
    const { searchOptions } = this.props;

    return (
      <div className="panel-row">
        <Typography variant="h6" className="color-blue-darken-3">Have overlays</Typography>

        <div className="d-flex justify-content-between">
          <Checkbox.Multiple
            name="have"
            value={searchOptions.haveOverlays}
            className="resize scale-1 m-0"
            data={[
              { label: 'Drawing', name: 'draw' },
              { label: 'Text', name: 'text' },
              { label: 'No matter', name: 'no matter', value: '*' }
            ]}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default HaveOverlaysRow;
