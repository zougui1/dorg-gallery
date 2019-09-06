import React from 'react';

import OverrideReactElement from '../../OverrideReactElement';
import './RightPanel.scss';

import DisplayRow from './DisplayRow';
import SearchRow from './SearchRow';
import SortRow from './SortRow';
import HaveOverlaysRow from './HaveOverlaysRow';
import RatingRow from './RatingRow';

class RightPanel extends React.Component {

  static DisplayRow = DisplayRow;
  static SearchRow = SearchRow;
  static SortRow = SortRow;
  static HaveOverlaysRow = HaveOverlaysRow;
  static RatingRow = RatingRow;

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

  /**
   * used to set state of this component
   * @param {Object} obj
   */
  _setState = obj => {
    this.setState(obj);
  }

  render() {
    const { searchOptions, search } = this.state;
    const { children } = this.props;

    return (
      <div className="RightPanel color-white">
        <OverrideReactElement
          setState={this._setState}
          searchOptions={searchOptions}
          search={search}
        >
          {children}
        </OverrideReactElement>
      </div>
    );
  }
}

export default RightPanel;
