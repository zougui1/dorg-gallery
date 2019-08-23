import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';
import uploaderState from '../../../../store/states/uploader';

import './Canvas.scss';

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData setCanvasField setCanvasLabel');

class Canvas extends React.Component {

  draggingOut = false;

  state = {
    inputId: 0,
  }

  componentDidMount() {
    document.body.addEventListener('dragover', e => this.dragOverHandler(e, true));
    document.body.addEventListener('drop', this.dropHandler);
    document.body.addEventListener('mouseup', this.mouseUpHandler);
  }

  /**
   * calculate a position relative to the canvas from an absolute position
   */
  calculateRelativePosition = (x, y) => {
    const { top, left } = this.props.canvasData.imageBounds;

    return {
      x: x - left + window.pageXOffset,
      y: y - top + window.pageYOffset,
    };
  }

  /**
   * do an action on the canvas depending to the context action
   */
  canvasAction = (x0, y0, x1, y1) => {
    const { canvasData } = this.props;

    let pos = this.calculateRelativePosition(x0, y0);
    x0 = pos.x;
    y0 = pos.y;

    pos = this.calculateRelativePosition(x1, y1);
    x1 = pos.x;
    y1 = pos.y;

    if (canvasData.contextAction === 'draw') {
      this.drawLine(x0, y0, x1, y1);
    } else if (canvasData.contextAction === 'erase') {
      this.eraseArea(x0, y0);
    }
  }

  /**
   * draw a line on the canvas
   */
  drawLine = (x0, y0, x1, y1) => {
    const { canvasData } = this.props;
    const { context, lineWidth, color } = canvasData;

    context.beginPath();

    // draw the line
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);

    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'butt';
    context.stroke();

    context.closePath();
  }

  /**
   * erase an area on the canvas
   */
  eraseArea = (x, y) => {
    const { canvasData } = this.props;
    const { context, eraseSize } = canvasData;

    x -= eraseSize / 2;
    y -= eraseSize / 2;

    context.clearRect(x, y, eraseSize, eraseSize);
  }

  /**
   * set the client position in the canvas data
   * and specify in the data that the user is drawing
   */
  mouseDownHandler = e => {
    const { setCanvasData, canvasData } = this.props;

    canvasData.x = e.clientX;
    canvasData.y = e.clientY;
    canvasData.drawing = true;

    // update the canvasData
    setCanvasData(canvasData);
  }

  /**
   * is called when the user release the mouse
   */
  mouseUpHandler = e => {
    const { setCanvasData, canvasData } = this.props;

    // if the user isn't drawing we don't want to do anything
    if (!canvasData.drawing) {
      return;
    }

    // update the canvasData
    setCanvasData({
      ...canvasData,
      drawing: false,
    });

    // do an action on the canvas
    this.canvasAction(canvasData.x, canvasData.y, e.clientX, e.clientY);
  }

  /**
   * is called when the mouse move
   */
  mouseMoveHandler = e => {
    const { setCanvasData, canvasData } = this.props;

    // if the user isn't drawing we don't want to do anything
    if (!canvasData.drawing) {
      return;
    }

    // do an action on the canvas
    this.canvasAction(canvasData.x, canvasData.y, e.clientX, e.clientY);
    canvasData.x = e.clientX;
    canvasData.y = e.clientY;

    // update the canvasData
    setCanvasData(canvasData);
  }

  /**
   * is called to put a cooldown on the call of a function
   */
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

  /**
   * cast a pixel string into a number
   */
  pixelToNumber = str => {
    return +str.replace('px', '');
  }

  /**
   * is called when an input is dragged over the canvas
   */
  dragOverHandler = (e, preventUpdate) => {
    e.preventDefault();

    if (!preventUpdate && this.draggingOut) {
      this.draggingOut = false;
    }
  }

  /**
   * is called when an input is dragged outside of the canvas
   */
  dragLeaveHandler = () => {
    if (!this.draggingOut) {
      this.draggingOut = true;
    }
  }

  /**
   * is called when an input is dropped
   */
  dropHandler = e => {
    let { inputs, labels, setCanvasField, setCanvasLabel, canvasData } = this.props;
    const id = +e.dataTransfer.getData('id');

    // if the input is not dragged outside of the canvas
    // we want to change its position
    // otherwise we want to delete it
    if (!this.draggingOut) {
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.id !== id) {
          continue;
        }

        const { x, y } = this.calculateRelativePosition(e.clientX, e.clientY);
        const label = labels[i];

        const prevY = this.pixelToNumber(label.style.top);
        const prevX = this.pixelToNumber(label.style.left);

        // calculate the new position of the label
        label.style.top = (prevY + (y - prevY) + 82) + 'px';
        label.style.left = (prevX + (x - prevX)) + 'px';

        // update the inputs and labels
        setCanvasField(inputs);
        setCanvasLabel(labels);
        break;
      }
    } else {
      const inputsUpdate = inputs.filter(input => input.id !== id);
      const labelsUpdate = labels.filter((_, i) => i !== id);

      setCanvasField(inputsUpdate);
      setCanvasLabel(labelsUpdate);
    }
  }

  render() {
    const { canvasData, inputs: _inputs } = this.props;
    const { width, height } = canvasData.imageBounds;

    const inputs = _inputs.map(input => input.element);

    return (
      <div>
        <div
          className="select-none canvas-container"
          onDragLeave={this.dragLeaveHandler}
          onDragOver={this.dragOverHandler}
        >
          <canvas
            className="select-none canvas droppable"
            id="canvas"
            width={width && width - 300}
            height={height}
            onMouseDown={this.mouseDownHandler}
            onMouseMove={this.throttle(this.mouseMoveHandler, 10)}
          >

          </canvas>
          {inputs}
        </div>
        <div style={{ height: '1000px', width: '100px' }}></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
