import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';
import uploaderState from '../../../../store/states/uploader';

const mapStateToProps = mapDynamicState('uploader: imageData canvasSize canvasData imagesToUpload inputs labels');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasLabel setCanvasField setImageData setCanvasData');

class CanvasField extends React.Component {

  componentDidMount() {
    let { setCanvasLabel, inputs, setCanvasField } = this.props;

    const updatedLabels = inputs.map((label, i) => {
      if (i === this.props.id) label = document.getElementById('label-' + this.props.id);
      return label;
    });

    const updatedFields = inputs.map((field, i) => {
      if (i === this.props.id) field.label = document.getElementById('label-' + this.props.id);
      return field;
    });

    setCanvasLabel(updatedLabels);
    setCanvasField(updatedFields);
  }

  shouldComponentUpdate = nextProps => {
    return nextProps.inputs !== this.props.inputs;
  }

  onInputClick = e => {
    const { inputs, setCanvasField, canvasData } = this.props;
    const id = +e.target.getAttribute('data-id');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].id !== id) {
        continue;
      }

      const label = inputs[i].label;
      const input = label.childNodes[1];

      input.style.color = canvasData.color;
      input.style.borderColor = canvasData.color;
      label.style.borderColor = canvasData.color;

      input.style.fontSize = canvasData.fontSize;

      setCanvasField(inputs);
      break;
    }
  }

  inputChangeHandler = e => {
    const { inputs } = this.props;
    let { value } = e.target;
    value = value.trim();

    const id = +e.target.getAttribute('data-id');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].id !== id) {
        continue;
      }

      let labelContent = inputs[i].label.childNodes[0];

      if (value.length > 0) {
        labelContent.textContent = '';
      } else {
        labelContent.textContent = 'Input';
      }
    }
  }

  dragStartHandler = e => {
    const id = e.target.getAttribute('data-id');
    e.dataTransfer.setData('id', id);
  }

  render() {
    const { id, client, currentCanvasData } = this.props;

    return (
      <label
        htmlFor={'input-' + id}
        draggable
        id={'label-' + id}
        style={{ top: client.y, left: client.x, color: currentCanvasData.color }}
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
          style={{ borderColor: currentCanvasData.color, color: currentCanvasData.color, fontSize: currentCanvasData.fontSize }}
          className="canvas-input"
          onChange={this.inputChangeHandler}
          //onFocus={this.focusInputHandler}
          //onBlur={this.blurInputHandler}
        />
      </label>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasField);
