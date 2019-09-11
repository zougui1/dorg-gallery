import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Uploader from './Uploader';
import Overlay from './Overlay';

const mapStateToProps = mapDynamicState('uploader: formView');
const mapDispatchToProps = mapDynamicDispatch('uploader: resetReducer');

class Upload extends React.Component {

  components = {
    Uploader,
    Overlay,
  };

  componentDidMount() {
    // reset the reducer before doing anything
    //this.props.resetReducer();
  }

  render() {
    const Component = this.components[this.props.formView];

    return <Component />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
