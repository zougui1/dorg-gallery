import React from 'react';

import Checkbox from './';

class YesNo extends React.Component {

  checkboxData = [{
    label: 'Yes',
    name: 'yes',
  }, {
    label: 'No',
    name: 'no',
  }]

  render() {
    const { name, value, onChange } = this.props;

    return (
      <Checkbox.Multiple
        data={this.checkboxData}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }
}

export default YesNo;
