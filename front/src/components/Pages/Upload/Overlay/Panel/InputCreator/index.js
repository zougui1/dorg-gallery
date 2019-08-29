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

  /**
   * update the variable 'canvasData' in the store
   */
  updateCanvasData = () => {
    const { canvasData, setCanvasData } = this.props;

    setCanvasData(canvasData);
  }

  /**
   * create an input on the canvas
   */
  createInput = () => {
    const { inputId } = this.state;
    let { inputs, canvasData, labels, setCanvasLabel, setCanvasField } = this.props;
    const { x, y } = canvasData.imageBounds;
    const client = { x: x + 10, y: y + 10 };

    // avoid to use the references to their source (the store)
    inputs = inputs.slice();
    labels = [...labels].slice();

    labels[inputId] = React.createRef();
    console.log(labels);
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

    inputs[inputId] = input;

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
