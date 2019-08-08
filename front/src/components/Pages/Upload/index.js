import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import Uploader from './Uploader';
import Overlay from './Overlay';
import uploaderState from '../../../store/states/uploader';

const mapStateToProps = mapDynamicState('uploader: formView');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'resetReducer');

class Upload extends React.Component {

  state = {
    object: {
      prop: 'value'
    }
  }

  components = {
    Uploader,
    Overlay,
  };

  componentDidMount() {
    this.props.resetReducer();
    this.setState({ 'object.prop': 'new value' });
  }

  render() {
    const Component = this.components[this.props.formView];

    return <Component />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
