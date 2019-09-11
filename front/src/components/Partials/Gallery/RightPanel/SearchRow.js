import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import Field from '../../Field';

const mapDispatchToProps = mapDynamicDispatch('gallery: searchOptions');

class SearchRow extends React.Component {

  /**
   * is called when the form is submit
   */
  submit = e => {
    const { search, searchOptions } = this.props;
    e.preventDefault();

    searchOptions.set({ ...searchOptions.get, search });
  }

  /**
   * is called when the input trigger the event `onChange`
   */
  handleChange = e => {
    const { value } = e.target;

    this.props.setState({ search: value });
  }

  render() {
    return (
      <div className="panel-row">
        <Typography variant="h6" className="color-blue-darken-3">Search</Typography>

        <form onSubmit={this.submit} className="d-flex">
          <Field
            className="field"
            label="Search"
            name="search"
            type="text"
            onChange={this.handleChange}
          />
          <Button className="color-white bold-nested">Search</Button>
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SearchRow);
