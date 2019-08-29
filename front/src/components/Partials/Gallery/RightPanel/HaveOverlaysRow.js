import React from 'react';
import { Typography } from '@material-ui/core';

import Checkbox from '../../Checkbox';

class HaveOverlaysRow extends React.Component {

  /**
   * called when the checkboxes trigger the event `onChange`
   * @param {String[]} value
   */
  handleChange = value => {
    this.props.setState(prevState => {
      const newSearchOptions = { ...prevState.searchOptions };
      const includedAll = prevState.searchOptions.haveOverlays.includes('*');

      // if `haveOverlays` previously included `*`
      if (includedAll) {
        // and if the value now has a length greater than 1
        if (value.length > 1) {
          // we don't want to keep the `*` value
          newSearchOptions.haveOverlays = value.filter(str => str !== '*');
        } else {
          // otherwise we now set the new value. value that can be an empty array
          newSearchOptions.haveOverlays = value;
        }
      } else {
        // otherwise if the value includes `*`
        // we want the value to only be `*` so we explicitely set it
        // in an array
        // otherwise we simple set to the value
        if (value.includes('*')) {
          newSearchOptions.haveOverlays = ['*'];
        } else {
          newSearchOptions.haveOverlays = value;
        }
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
