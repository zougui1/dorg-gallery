import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import '../form.scss';
import uploaderState from '../../../../store/states/uploader';

const mapStateToProps = mapDynamicState('uploader: currentCanvasData imageData imagesToUpload inputs labels');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'editCanvasLabel editCanvasField');
/*const mapDispatchToProps = dispatch => ({
  editCanvasLabel: (label, id) => dispatch(editCanvasLabel(label, id)),
  editCanvasField: (field, id) => dispatch(editCanvasField(field, id)),
});*/
class CanvasField extends React.Component {

  componentDidMount = () => {
    const { editCanvasLabel, labels } = this.props;

    const updatedLabels = labels.map((label, i) => {
      if (i === this.props._key) label.current = document.getElementById('label-' + this.props._key);
      return label;
    });
    //this.props.editCanvasLabel(document.getElementById('label-' + this.props._key), this.props._key);
    editCanvasLabel(updatedLabels);
  }

  shouldComponentUpdate = nextProps => {
    return nextProps.inputs !== this.props.inputs;
  }

  onInputClick = e => {
    let { inputs, editCanvasField, currentCanvasData: current } = this.props;
    const key = Number(e.target.getAttribute('data-key'));

    inputs.forEach(input => {
      if(input.inputKey === key) {
        let currentLabel = input.label.current;
        let currentInput = currentLabel.childNodes[1];

        currentInput.style.color = current.color;
        currentInput.style.borderColor = current.color;
        currentInput.style.fontSize = current.fontSize;
        currentLabel.style.color = current.color;

        //editCanvasField(input, key)
        editCanvasField(inputs)
      }
      return input;
    });
  }

  inputChangeHandler = e => {
    let { inputs } = this.props;
    const self = e.target;
    const value = self.value.trim();
    const key = Number(self.getAttribute('data-key'));

    inputs.forEach(input => {
      if(input.inputKey === key) {
        let labelContent = input.label.current.childNodes[0];
        if (value.length > 0) {
          labelContent.textContent = '';
        } else {
          labelContent.textContent = 'Input';
        }
      }
    });
  }

  dragStartHandler = e => {
    const id = e.target.getAttribute('data-key');
    e.dataTransfer.setData('key', id);
  }

  render() {
    const { _key, client, current } = this.props;

    return (
      <label
        draggable
        htmlFor={'input-' + _key}
        id={'label-' + _key}
        style={{top: client.y, left: client.x, color: current.color}}
        className="canvas-label draggable"
        data-key={_key}
        onClick={this.onInputClick}
        onDragStart={this.dragStartHandler}
        onDrop={this.dropHandler}>
          <span>Input</span>
          <input
            id={'input-' + _key}
            data-key={_key}
            style={{borderColor: current.color, color: current.color, fontSize: '16px'}}
            className="canvas-input"
            onChange={this.inputChangeHandler}
            onFocus={this.focusInputHandler}
            onBlur={this.blurInputHandler}
          />
      </label>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasField);
