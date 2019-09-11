import React from 'react';

import ColorPanel from './ColorPanel';
import SizesPanel from './SizesPanel';
import DisplayPanel from './DisplayPanel';
import InputCreator from './InputCreator';
import Uploader from './Uploader';
import HelperPanel from './HelperPanel';
import DataEditionDialog from './DataEditionDialog';

const Panel = () => (
  <div className="ColorPanel colors color-picker-panel color-white text-center">
    <ColorPanel />
    <SizesPanel />
    <DisplayPanel />
    <InputCreator />
    <DataEditionDialog />
    <Uploader />
    <HelperPanel />
  </div>
);

export default Panel;
