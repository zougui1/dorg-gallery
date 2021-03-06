import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import Input from '../../Input';

const mapDispatchToProps = mapDynamicDispatch('gallery: mergeSearchOptions');

class SearchRow extends React.Component {

  /**
   * is called when the form is submit
   */
  submit = e => {
    const { search, searchOptions, mergeSearchOptions } = this.props;
    e.preventDefault();

    mergeSearchOptions({ ...searchOptions, search });
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
          <Input
            className="field"
            label="Search"
            name="search"
            type="text"
            onChange={this.handleChange}
          />
          <Button type="submit" className="color-white bold-nested">Search</Button>
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SearchRow);
