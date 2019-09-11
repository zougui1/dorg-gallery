import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

const mapStateToProps = mapDynamicState('uploader: canvasData inputs labels');
const mapDispatchToProps = mapDynamicDispatch('uploader: labels inputs');

class CanvasField extends React.Component {

  state = {
    currentCanvasData: this.props.currentCanvasData
  }

  componentDidMount() {
    let { inputs, labels, currentCanvasData } = this.props;

    this.setState({
      currentCanvasData
    });

    // set the label element in the array
    const updatedLabels = labels.get().map((label, i) => {
      if (i === this.props.id) label = document.getElementById('label-' + this.props.id);
      return label;
    });

    // set the label element in the array
    const updatedFields = inputs.get().map((field, i) => {
      if (i === this.props.id) field.label = document.getElementById('label-' + this.props.id);
      return field;
    });

    // update the labels and inputs
    labels.set(updatedLabels);
    inputs.set(updatedFields);

    this.inputChangeHandler();
  }

  /**
   * cast a pixel string into a number
   */
  pixelToNumber = str => {
    return +str.replace('px', '');
  }

  getHeight = fontSize => {
    if (fontSize >= 35) {
      fontSize -= 10;

      return fontSize;
    } else {
      return 25;
    }
  }

  /**
   * is called when the user click on a input
   * is used to change the input's style with the style saved in the canvasData
   */
  onInputClick = e => {
    const { inputs: _inputs, canvasData } = this.props;
    const id = +e.target.getAttribute('data-id');

    const inputs = _inputs.get();

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].id !== id) {
        continue;
      }

      const input = inputs[i];

      input.currentCanvasData.color = canvasData.color;
      input.currentCanvasData.fontSize = canvasData.fontSize;
      input.currentCanvasData.height = this.getHeight(canvasData.fontSize) + 'px';

      // update the fields
      _inputs.set(inputs);
      break;
    }
  }

  /**
   * is called when the value of an input change
   */
  inputChangeHandler = e => {
    const { inputs: _inputs, id } = this.props;

    const inputs = _inputs.get();

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].id !== id) {
        continue;
      }

      const input = inputs[i];

      let { value } = e ? e.target : input;
      value = value.trim();

      input.value = value;

      let labelContent = input.label.childNodes[0];

      // if the input has text written in it we don't want the label to have content
      if (value.length > 0) {
        labelContent.textContent = '';
      } else {
        labelContent.textContent = 'Input';
      }
    }

    _inputs.set(inputs);
  }

  /**
   * is called when the user start to drag the field
   */
  dragStartHandler = e => {
    const id = e.target.getAttribute('data-id');
    e.dataTransfer.setData('id', id);
  }

  render() {
    const { id, client, inputs } = this.props;
    const { currentCanvasData, value } = inputs.get().find(i => i.id === id);

    return (
      <label
        htmlFor={'input-' + id}
        draggable
        id={'label-' + id}
        style={{ top: client.y, left: client.x, color: currentCanvasData.color, fontSize: currentCanvasData.fontSize + 'px' }}
        className="canvas-label draggable"
        data-id={id}
        onClick={this.onInputClick}
        onDragStart={this.dragStartHandler}
        //onDrop={this.dropHandler}
      >
        <span>Input</span>
        <input
          id={'input-' + id}
          data-id={id}
          style={{
            borderColor: currentCanvasData.color,
            color: currentCanvasData.color,
            fontSize: currentCanvasData.fontSize + 'px',
            height: this.getHeight(currentCanvasData.fontSize) + 'px'
          }}
          className="canvas-input"
          onChange={this.inputChangeHandler}
          value={value}
          //onFocus={this.focusInputHandler}
          //onBlur={this.blurInputHandler}
        />
      </label>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasField);
