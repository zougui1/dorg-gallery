import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import uploaderState from '../../../../../../store/states/uploader';
import CanvasField from '../../CanvasField';

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels imagesToUpload');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData setCanvasField setCanvasLabel resetReducer');

class InputCreator extends React.Component {

  state = {
    inputId: 0,
  };

  updateCanvasData = () => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData(canvasData);
  }

  createInput = () => {
    const { inputId } = this.state;
    let { inputs, canvasData, labels, setCanvasLabel, setCanvasField } = this.props;
    const client = { x: 10, y: 10 };

    inputs = [...inputs];
    labels = [...labels];

    labels[inputId] = React.createRef();
    setCanvasLabel(labels);

    const field = (
      <CanvasField
        key={inputId}
        id={inputId}
        client={client}
        currentCanvasData={canvasData}
      />
    );

    const input = {
      element: field,
      id: inputId,
      label: labels[inputId]
    };

    inputs[inputs.length] = input;

    setCanvasField(inputs);
    this.setState({ inputId: inputId + 1, lastInput: input })
  }

  render() {
    return (
      <div className="panel-row">
        <Button className="color-white" onClick={this.createInput}>
          Create a textbox
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputCreator);