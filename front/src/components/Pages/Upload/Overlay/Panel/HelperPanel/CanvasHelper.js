import React from 'react';
import { withMobileDialog } from '@material-ui/core';

import Dialog from '../../../../../Partials/Dialog';
import './CanvasHelper.scss';

const CanvasHelper = ({ onClose, open }) => (
  <Dialog
    aria-labelledby="simple-dialog-title"
    open={open}
    onClose={onClose}
    PaperProps={{
      className: 'bg-color-grey-darken-3 color-grey-lighten-4'
    }}
  >
    <Dialog.Title closer>Tutorial</Dialog.Title>
    <Dialog.ContentText textProps={{ component: 'div' }}>
      <div className="text-content color-grey-lighten-1">
        <span className="subtitle">You can:</span>
        <ul>
          <li>
            Change the color/alpha of the brush/text
          </li>
          <li>
            Create a textbox
          </li>
          <li>
            Move the textboxes
          </li>
          <li>
            To remove a textbox you must drop it out of the image, re-drag it and quickly re-drop it
          </li>
          <li>
            Change the text size
          </li>
          <li>
            Erase what you drew
          </li>
          <li>
            Change the eraser size
          </li>
          <li>
            Remove everything you drew
          </li>
          <li>
            Display/hide the textboxes and/or the drawing
          </li>
        </ul>
        <p>
          The textboxes are created on the top left of the image,
        </p>
      </div>
    </Dialog.ContentText>
  </Dialog>
);

export default withMobileDialog()(CanvasHelper);
