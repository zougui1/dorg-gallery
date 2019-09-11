import React from 'react';
import MainRightPanel from '../../RightPanel';

import CloseRow from './CloseRow';

const RightPanel = ({ setState, searchOptions, search, size, ...rest }) => (
  <React.Fragment>
    <CloseRow size={size} />
    <MainRightPanel.DisplayRow {...rest} />
    <MainRightPanel.SearchRow {...rest} setState={setState} searchOptions={searchOptions} search={search} />
    <MainRightPanel.SortRow {...rest} setState={setState} searchOptions={searchOptions} />
    <MainRightPanel.HaveOverlaysRow {...rest} setState={setState} searchOptions={searchOptions} />
    <MainRightPanel.RatingRow {...rest} setState={setState} searchOptions={searchOptions} />
  </React.Fragment>
);

export default RightPanel;
