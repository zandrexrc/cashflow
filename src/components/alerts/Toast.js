import React from 'react';

import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';


const Alert = (props) => {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
};


const Toast = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.isOpen}
      autoHideDuration={6000}
      onClose={props.close}
    >
      <Alert onClose={props.close} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

Toast.propTypes = {
  /** Function to close the toast */
  close: PropTypes.func.isRequired,
  /** If true, the toast is open/visible */
  isOpen: PropTypes.bool.isRequired,
  /** The text content of the toast */
  message: PropTypes.string.isRequired,
  /** Defines the color and icon of the toast.
   * Values: 'success' | 'warning' | 'error' | 'info' */
  severity: PropTypes.string.isRequired,
};

export {Toast};
