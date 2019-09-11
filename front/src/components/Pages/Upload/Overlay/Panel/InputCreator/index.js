import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import CanvasField from '../../CanvasField';

const mapStateToProps = mapDynamicState('uploader: canvasData inputs labels');
const mapDispatchToProps = mapDynamicDispatch('uploader: canvasData inputs labels');

class InputCreator extends React.Component {

  state = {
    inputId: 0,
  };

  /**
   * update the variable 'canvasData' in the store
   */
  updateCanvasData = () => {
    const { canvasData } = this.props;

    canvasData.set(canvasData.get);
  }

  /**
   * create an input on the canvas
   */
  createInput = () => {
    const { inputId } = this.state;
    let { inputs, canvasData, labels } = this.props;
    const { x, y } = canvasData.get.imageBounds;
    const client = { x: x + 10, y: y + 10 };

    // avoid to use the references to their source (the store)
    inputs.get = inputs.get.slice();
    labels.get = labels.get.slice();

    labels[inputId] = React.createRef();
    console.log(labels.get);
    labels.set(labels.get);

    const field = (
      <CanvasField
        key={inputId}
        id={inputId}
        client={client}
        currentCanvasData={canvasData.get}
      />
    );

    const input = {
      element: field,
      id: inputId,
      label: labels.get[inputId]
    };

    inputs.get[inputId] = input;

    inputs.set(inputs);
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
