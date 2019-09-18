import React from 'react';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import './Canvas.scss';

const mapStateToProps = mapDynamicState('uploader: canvasData inputs labels');
const mapDispatchToProps = mapDynamicDispatch('uploader: mergeCanvasData setInputs filterInputs setLabels filterLabels');

class Canvas extends React.Component {

  draggingOut = false;

  state = {
    inputId: 0,
  }

  componentDidMount() {
    document.body.addEventListener('dragover', e => throttle(this.dragOverHandler, 200)(e, true));
    document.body.addEventListener('drop', this.dropHandler);
    document.body.addEventListener('mouseup', this.mouseUpHandler);
  }

  /**
   * calculate a position relative to the canvas from an absolute position
   * @param {Number} x
   * @param {Number} y
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
   * @param {Number} x0
   * @param {Number} y0
   * @param {Number} x1
   * @param {Number} y1
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
   * @param {Number} x0
   * @param {Number} y0
   * @param {Number} x1
   * @param {Number} y1
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
   * @param {Number} x
   * @param {Number} y
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
    const { mergeCanvasData } = this.props;

    // update the canvasData
    mergeCanvasData({
      x: e.clientX,
      y: e.clientY,
      drawing: true
    });
  }

  /**
   * is called when the user release the mouse
   */
  mouseUpHandler = e => {
    const { canvasData, mergeCanvasData } = this.props;

    // if the user isn't drawing we don't want to do anything
    if (!canvasData.drawing) {
      return;
    }

    // update the canvasData
    mergeCanvasData({ drawing: false });

    // do an action on the canvas
    this.canvasAction(canvasData.x, canvasData.y, e.clientX, e.clientY);
  }

  /**
   * is called when the mouse move
   */
  mouseMoveHandler = e => {
    const { canvasData, mergeCanvasData } = this.props;

    // if the user isn't drawing we don't want to do anything
    if (!canvasData.drawing) {
      return;
    }

    // do an action on the canvas
    this.canvasAction(canvasData.x, canvasData.y, e.clientX, e.clientY);

    // update the canvasData
    mergeCanvasData({
      x: e.clientX,
      y: e.clientY
    });
  }

  /**
   * is called to persist an event and call a function that'll use the persisted event
   * @param {Function} callback
   * @returns {Function}
   *
   * @param {Boolean} boolean
   */
  persister = callback => e => {
    e.persist();
    return callback(e);
  }

  /**
   * cast a pixel string into a number
   * @param {String}
   * @returns {Number}
   */
  pixelToNumber = str => {
    return +str.replace('px', '');
  }

  /**
   * is called when an input is dragged over the canvas
   * @param {Boolean} preventUpdate
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
    let { inputs, labels, setInputs, setLabels, filterInputs, filterLabels } = this.props;
    const id = +e.dataTransfer.getData('id');

    // if the input is not dragged outside of the canvas
    // we want to change its position
    // otherwise we want to delete it
    if (!this.draggingOut) {
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if ((input && input.id !== id) || !input) {
          continue;
        }

        const { x, y } = this.calculateRelativePosition(e.clientX, e.clientY);
        const { label } = input;

        const prevY = this.pixelToNumber(label.style.top);
        const prevX = this.pixelToNumber(label.style.left);

        // calculate the new position of the label
        label.style.top = (prevY + (y - prevY) + 82) + 'px';
        label.style.left = (prevX + (x - prevX)) + 'px';

        // update the inputs and labels
        setInputs(inputs);
        setLabels(labels);
        break;
      }
    } else {

      filterInputs(input => input.id !== id);
      filterLabels((_, i) => i !== id);
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
          onDragOver={this.persister(throttle(this.dragOverHandler, 100))}
        >
          <canvas
            className="select-none canvas droppable"
            id="canvas"
            width={width && width - 300}
            height={height}
            onMouseDown={this.mouseDownHandler}
            onMouseMove={this.persister(throttle(this.mouseMoveHandler, 20))}
          >

          </canvas>
          {inputs}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
