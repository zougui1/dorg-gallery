import React from 'react';

import MainRightPanel from '../../RightPanel';
import Tags from './Tags';
import AdditionalData from './AdditionalData';

const RightPanel = ({ setState, searchOptions, search, ...rest }) => (
  <React.Fragment>
    <MainRightPanel.DisplayRow {...rest} />
    <Tags />
    <AdditionalData />
  </React.Fragment>
);

export default RightPanel;
