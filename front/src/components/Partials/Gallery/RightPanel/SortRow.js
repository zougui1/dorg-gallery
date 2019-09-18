import React from 'react';
import { Typography, NativeSelect } from '@material-ui/core';

import { functionUpdate } from '../../../../utils';

class SortRow extends React.Component {

  returnData = data => data;

  toNumber = data => +data;

  /**
   * is called when a select trigger the event `onChange`
   * @param {String} prop the name of the property to change
   * @returns {Function}
   */
  handleChange = (prop, dataProcess = this.returnData) => e => {
    this.props.setState(functionUpdate({
      searchOptions: { $merge: { sort: { [prop]: dataProcess(e.target.value) } } }
    }));
  }

  render() {
    const { searchOptions } = this.props;

    return (
      <div className="panel-row">
        <Typography variant="h6" className="color-blue-darken-3">Sorting</Typography>

        <NativeSelect
          className="field"
          value={searchOptions.sort.criteria}
          onChange={this.handleChange('criteria')}
        >
          <option className="color-black" value="date">date</option>
          {/*<option className="color-black" value="relevancy">relevancy</option>*/}
        </NativeSelect>

        <span>in the</span>

        <NativeSelect
          className="field ml-2"
          value={searchOptions.sort.order}
          onChange={this.handleChange('order', this.toNumber)}
        >
          <option className="color-black" value="1">ascending</option>
          <option className="color-black" value="-1">descending</option>
        </NativeSelect>

        <span>order</span>
      </div>
    );
  }
}

export default SortRow;
