import React from 'react';
import { Button, Typography, NativeSelect } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './RightPanel.scss';
import Field from '../../Field';
import Checkbox from '../../Checkbox';
import galleryState from '../../../../store/states/gallery';
import { functionUpdate } from '../../../../utils';

import DisplayRow from './DisplayRow';
import SearchRow from './SearchRow';
import SortRow from './SortRow';
import HaveOverlaysRow from './HaveOverlaysRow';
import RatingRow from './RatingRow';

class RightPanel extends React.Component {

  state = {
    inputTags: [],
    search: '',

    searchOptions: {
      haveOverlays: ['*'],
      rating: ['general', 'suggestive', 'nsfw'],
      sort: {
        criteria: 'date',
        order: 'ASC'
      }
    }
  }

  _setState = obj => {
    this.setState(obj);
  }

  render() {
    const { searchOptions, search } = this.state;

    return (
      <div className="RightPanel color-white">
        <DisplayRow />
        <SearchRow setState={this._setState} searchOptions={searchOptions} search={search} />
        <SortRow setState={this._setState} searchOptions={searchOptions} />
        <HaveOverlaysRow setState={this._setState} searchOptions={searchOptions} />
        <RatingRow setState={this._setState} searchOptions={searchOptions} />
      </div>
    );
  }
}

export default RightPanel;
