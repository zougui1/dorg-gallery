import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Field from '../../Field';
import galleryState from '../../../../store/states/gallery';

const mapStateToProps = mapDynamicState({
  gallery: 'showOverlay images filter currentPage',
  auth: 'user'
});
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setFilter setImages setSearchOptions');

class SearchRow extends React.Component {

  /**
   * is called when the form is submit
   */
  submit = e => {
    const { search, searchOptions, setSearchOptions } = this.props;
    e.preventDefault();

    setSearchOptions({ ...searchOptions, search });
  }

  /**
   * set the images into the store
   * @param {Object[]} images
   */
  setImages = images => {
    const { setImages } = this.props;
    setImages(images);
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchRow);
