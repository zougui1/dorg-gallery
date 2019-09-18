import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { mapDynamicState } from 'dynamic-redux';

import OverrideReactElement from '../../OverrideReactElement';
import './RightPanel.scss';

import DisplayRow from './DisplayRow';
import SearchRow from './SearchRow';
import SortRow from './SortRow';
import HaveOverlaysRow from './HaveOverlaysRow';
import RatingRow from './RatingRow';

const mapStateToProps = mapDynamicState('gallery: searchOptionsPanel');

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
    },
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
    const { children, size, searchOptionsPanel: openPanel } = this.props;

    return (
      <div className={classNames('RightPanel color-white w-100 h-100', size, { open: openPanel })}>
        <OverrideReactElement
          setState={this._setState}
          searchOptions={searchOptions}
          search={search}
          size={size}
        >
          {children}
        </OverrideReactElement>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RightPanel);
