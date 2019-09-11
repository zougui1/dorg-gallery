import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

const mapStateToProps = mapDynamicState('uploader: canvasData inputs labels');
const mapDispatchToProps = mapDynamicDispatch('uploader: labels inputs');

class CanvasField extends React.Component {

  componentDidMount() {
    let { inputs, labels } = this.props;

    // set the label element in the array
    const updatedLabels = labels.get.map((label, i) => {
      if (i === this.props.id) label = document.getElementById('label-' + this.props.id);
      return label;
    });

    // set the label element in the array
    const updatedFields = inputs.get.map((field, i) => {
      if (i === this.props.id) field.label = document.getElementById('label-' + this.props.id);
      return field;
    });

    // update the labels and inputs
    labels.set(updatedLabels);
    inputs.set(updatedFields);
  }

  shouldComponentUpdate = nextProps => {
    return nextProps.inputs.get !== this.props.inputs.get;
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
    const { inputs, setCanvasField, canvasData } = this.props;
    const id = +e.target.getAttribute('data-id');

    for (let i = 0; i < inputs.get.length; i++) {
      if (inputs.get[i].id !== id) {
        continue;
      }

      const label = inputs.get[i].label;
      const input = label.childNodes[1];

      // change the style of the field
      input.style.color = canvasData.color;
      label.style.color = canvasData.color;
      input.style.borderColor = canvasData.color;
      input.style.fontSize = canvasData.fontSize + 'px';
      label.style.fontSize = canvasData.fontSize + 'px';
      input.style.height = this.getHeight(canvasData.fontSize) + 'px';

      // update the fields
      setCanvasField(inputs.get);
      break;
    }
  }

  /**
   * is called when the value of an input change
   */
  inputChangeHandler = e => {
    const { inputs } = this.props;
    let { value } = e.target;
    value = value.trim();

    const id = +e.target.getAttribute('data-id');

    for (let i = 0; i < inputs.get.length; i++) {
      if (inputs.get[i].id !== id) {
        continue;
      }

      let labelContent = inputs.get[i].label.childNodes[0];

      // if the input has text written in it we don't want the label to have content
      if (value.length > 0) {
        labelContent.textContent = '';
      } else {
        labelContent.textContent = 'Input';
      }
    }
  }

  /**
   * is called when the user start to drag the field
   */
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
          //onFocus={this.focusInputHandler}
          //onBlur={this.blurInputHandler}
        />
      </label>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasField);
