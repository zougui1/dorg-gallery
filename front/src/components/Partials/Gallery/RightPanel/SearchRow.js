import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Field from '../../Field';
import galleryState from '../../../../store/states/gallery';
import { functionUpdate } from '../../../../utils';
import * as socket from './socket';

const mapStateToProps = mapDynamicState({
  gallery: 'showOverlay images filter currentPage',
  auth: 'user'
});
const mapDispatchToProps = mapDynamicDispatch(galleryState.actions, 'setFilter setImages setSearchOptions');

class SearchRow extends React.Component {

  handleClick = () => {
    let { search, user, currentPage, searchOptions, setSearchOptions } = this.props;

    if (typeof search === 'string') {
      // avoid spaces
      search = search.trim().split(' ').filter(str => str);
    }

    // emit to get the images
    const emitData = {
      tags: [...search, user.name],
      page: currentPage,
      searchOptions: searchOptions,
      user: user,
    }

    setSearchOptions({ ...searchOptions, search });
    /*socket.Emit.getImagesPage(emitData);
    socket.On.sendImage(this.setImages);*/
  }

  setImages = images => {
    const { setImages } = this.props;
    setImages(images);
  }

  handleChange = e => {
    const { name, value } = e;

    this.props.setState({ [name]: value });
  }

  handleChangeSearchOption = prop => value => {
    this.setState(functionUpdate({
      searchOptions: { $merge: { [prop]: value } }
    }));
  }

  render() {
    return (
      <div className="panel-row">
        <Typography variant="h6" className="color-blue-darken-3">Search</Typography>

        <div className="d-flex">
          <Field
            className="field"
            label="Search"
            name="search"
            type="text"
            onChange={this.handleChange}
          />
          <Button className="color-white bold-nested" onClick={this.handleClick}>Search</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRow);
