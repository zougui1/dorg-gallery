import React from 'react';
import { withMobileDialog } from '@material-ui/core';

import Form from './Form';
import Dialog from '../../../../../Partials/Dialog';
import './FormDialog.scss';

const FormDialog = ({ open, onClose, onSubmit }) => (
  <Dialog
    className="form-dialog"
    classes={{ paper: 'paper' }}
    aria-labelledby="form of edition of the data associated to the image"
    open={open}
    onClose={onClose}
    PaperProps={{
      className: 'bg-color-grey-darken-3 color-grey-lighten-4'
    }}
  >
    <Dialog.Title closer>Change infos</Dialog.Title>

    <Dialog.Content>
      <Form onSubmit={onSubmit} />
    </Dialog.Content>
  </Dialog>
);

export default withMobileDialog()(FormDialog);
