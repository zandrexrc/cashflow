import React from 'react';

import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';


const ConfirmationDialog = (props) => {
  return (
    <MuiDialog
      open={props.isOpen}
      onClose={props.cancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        { props.title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.cancel} color="primary">
          Cancel
        </Button>
        <Button onClick={props.confirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

ConfirmationDialog.propTypes = {
  /** Function to cancel/close the dialog */
  cancel: PropTypes.func.isRequired,
  /** Function called when clicking on the 'confirm' button */
  confirm: PropTypes.func.isRequired,
  /** If true, the dialog is open/visible */
  isOpen: PropTypes.bool.isRequired,
  /** The message displayed at the top of the dialog */
  title: PropTypes.string.isRequired,
};

export {ConfirmationDialog};
