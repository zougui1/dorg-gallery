import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import CanvasField from '../../CanvasField';

const mapStateToProps = mapDynamicState('uploader: canvasData inputs labels');
const mapDispatchToProps = mapDynamicDispatch('uploader: setInputs setLabels');

class InputCreator extends React.Component {

  state = {
    inputId: 0,
  };

  /**
   * create an input on the canvas
   */
  createInput = () => {
    const { inputId } = this.state;
    let { inputs, canvasData, labels, setInputs, setLabels } = this.props;
    const { x, y } = canvasData.imageBounds;
    const client = { x: x + 10, y: y + 10 };

    // avoid to use the references to their source (the store)
    inputs = inputs.slice();
    labels = labels.slice();

    labels[inputId] = React.createRef();
    setLabels(labels);

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
      label: labels[inputId],
      currentCanvasData: canvasData,
      value: ''
    };

    inputs[inputId] = input;

    setInputs(inputs);
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
