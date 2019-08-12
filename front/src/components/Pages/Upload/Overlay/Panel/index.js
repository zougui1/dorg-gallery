import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import uploaderState from '../../../../../store/states/uploader';
import ColorPanel from './ColorPanel';
import SizesPanel from './SizesPanel';
import DisplayPanel from './DisplayPanel';
import InputCreator from './InputCreator';
import Uploader from './Uploader';

const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData');

const Panel = () => (
  <div className="ColorPanel colors color-picker-panel color-white text-center">
    <ColorPanel />
    <SizesPanel />
    <DisplayPanel />
    <InputCreator />
    <Uploader />
  </div>
);

export default connect(null, mapDispatchToProps)(Panel);
