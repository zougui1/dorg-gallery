import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './Canvas.scss';

import uploaderState from '../../../../store/states/uploader';


const mapStateToProps = mapDynamicState('uploader: currentCanvasData imageData inputs');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCurrentCanvasData setCanvasField editCanvasField');
/*dispatch => ({
  changeCurrentCanvasData: contextAction => dispatch(changeCurrentCanvasData(contextAction)),
  setCanvasField: field => dispatch(setCanvasField(field)),
  editCanvasField: (field, id) => dispatch(editCanvasField(field, id)),
});*/
class Canvas extends React.Component {

  state = {
    inputKey: 0,
    lineSize: 3,
  }

  componentDidMount = () => {
    this.props.setRef(document.getElementById('canvas'));
    const htmlElement = document.getElementsByTagName('html')[0];

    htmlElement.addEventListener('dragover', e => this.dragOverHandler(e, 'html'));
    htmlElement.addEventListener('drop', this.dropHandler);
    htmlElement.addEventListener('mouseup', this.mouseUpHandler);
  }


  drawLine = (x0, y0, x1, y1) => {
    const { canvasPositions } = this.props.canvasDatas;
    const current = this.props.currentCanvasData;

    const { context, contextAction, } = current;

    // calculate the position of the cursor relative to the canvas position
    let { top, left } = canvasPositions;
    left -= window.pageYOffset;
    top -= window.pageXOffset;
    x0 -= left;
    y0 -= top;
    x1 -= left;
    y1 -= top;

    if(contextAction === 'draw') {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = current.color;
      context.lineWidth = this.state.lineSize || 3;
      context.lineCap = 'butt';
      context.stroke();
      context.closePath();
    } else if(contextAction === 'erase') {
      const eraseSize = current.eraseSize;

      x0 = x0 - (eraseSize / 2);
      y0 = y0 - (eraseSize / 2);
      context.clearRect(x0, y0, eraseSize, eraseSize);
    }
  }

  mouseDownHandler = e => {
    const { setCurrentCanvasData, currentCanvasData: current } = this.props;

    // if you change the color the alpha isn't set, so we change again the color to set the alpha
    let newColor = current.color.replace(/[0-1]+([.][0-9]*)?\)$/, current.alpha + ')');
    current.color = newColor;

    current.x = e.clientX;
    current.y = e.clientY;
    current.drawing = true;
    setCurrentCanvasData(current)
  }

  mouseUpHandler = e => {
    const { setCurrentCanvasData, currentCanvasData: current } = this.props;

    if (!current.drawing) {return};
    setCurrentCanvasData(current.drawing = false)
    this.drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  }

  mouseMoveHandler = e => {
    const { setCurrentCanvasData, currentCanvasData: current } = this.props;

    if (!current.drawing) {return};
    this.drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    current.x = e.clientX;
    current.y = e.clientY;
    setCurrentCanvasData(current)
  }

  throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
    return function() {
      let time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  dragOverHandler = (e, type) => {
    e.preventDefault();
    if(type !== 'html')
      this.props.setCurrentCanvasData({ ...this.props.currentCanvasData, draggingOut: false });
  }

  dragLeaveHandler = () =>
    this.props.setCurrentCanvasData({ ...this.props.currentCanvasData, draggingOut: true });

  dropHandler = e => {
    let { inputs, editCanvasField, setCanvasField, currentCanvasData, canvasDatas } = this.props;
    const key = Number(e.dataTransfer.getData('key'));
    let inputsUpdate;

    if(!currentCanvasData.draggingOut) {
      inputs.forEach(input => {
        if(input.inputKey === key) {
          let { top, left } = canvasDatas.canvasPositions;
          let x = e.clientX;
          let y = e.clientY;

          left -= window.pageYOffset;
          top -= window.pageXOffset;
          x -= left;
          y -= top;
          let currentLabel = input.label.current;

          currentLabel.style.top = y + 'px';
          currentLabel.style.left = x + 'px';
          //editCanvasField(input, key);
          editCanvasField(inputs);
        }
      });
    } else {
      inputsUpdate = inputs.filter(input => {
        return input.inputKey !== key;
      });
      setCanvasField(inputsUpdate);
    }
  }

  render() {
    const { imageData, inputs } = this.props;
    let { width, height } = imageData;

    const inputsElement = inputs.map(input => input.element);

    return (
      <div>
        <div
          style={{ userSelect: 'none' }}
          className="canvas-container"
          onDragLeave={this.dragLeaveHandler}
          onDragOver={this.dragOverHandler}
        >
          <canvas
            style={{userSelect: 'none'}}
            className="canvas droppable"
            id="canvas"
            width={width && width - 300}
            height={height && height}
            onMouseDown={this.mouseDownHandler}
            onMouseMove={this.throttle(this.mouseMoveHandler, 10)}
          ></canvas>
          {inputsElement}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
