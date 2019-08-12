import React from 'react';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';
import uploaderState from '../../../../store/states/uploader';

import './Canvas.scss';

const mapStateToProps = mapDynamicState('uploader: canvasData imageData inputs labels');
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setCanvasData setCanvasField setCanvasLabel');

class Canvas extends React.Component {

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
      x: x - left - window.pageXOffset,
      y: y - top - window.pageYOffset,
    };
  }

  /**
   * make an action on the canvas depending to the context action
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
   */
  mouseDownHandler = e => {
    const { setCanvasData, canvasData } = this.props;

    //const newColor = canvasData.color.replace(/[0-1]+([.][0-9]*)?\)$/, current.alpha + ')');
    //canvasData.color = newColor;

    canvasData.x = e.clientX;
    canvasData.y = e.clientY;
    canvasData.drawing = true;
    setCanvasData(canvasData);
  }

  mouseUpHandler = e => {
    const { setCanvasData, canvasData } = this.props;

    if (!canvasData.drawing) {
      return;
    }

    setCanvasData({
      ...canvasData,
      drawing: false,
    });

    this.canvasAction(canvasData.x, canvasData.y, e.clientX, e.clientY);
  }

  mouseMoveHandler = e => {
    const { setCanvasData, canvasData } = this.props;

    if (!canvasData.drawing) {
      return;
    }

    this.canvasAction(canvasData.x, canvasData.y, e.clientX, e.clientY);
    canvasData.x = e.clientX;
    canvasData.y = e.clientY;
    setCanvasData(canvasData);
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

  dragOverHandler = (e, preventUpdate) => {
    e.preventDefault();
    const { setCanvasData, canvasData } = this.props;

    if (!preventUpdate) {
      setCanvasData({
        ...canvasData,
        draggingOut: false,
      });
    }
  }

  dragLeaveHandler = () => {
    const { setCanvasData, canvasData } = this.props;

    setCanvasData({
      ...canvasData,
      draggingOut: true,
    });
  }

  dropHandler = e => {
    let { inputs, labels, setCanvasField, setCanvasLabel, canvasData } = this.props;
    const id = +e.dataTransfer.getData('id');

    if (!canvasData.draggingOut) {
      console.log('update field position');
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.id !== id) {
          continue;
        }

        const { x, y } = this.calculateRelativePosition(e.clientX, e.clientY);
        //const label = input.label;
        const label = labels[i];
        console.log('labels', labels);
        console.log('inputs', inputs);

        label.style.top = y + 'px';
        label.style.left = x + 'px';
        setCanvasField(inputs);
        break;
      }
    } else {
      console.log('delete field');
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
