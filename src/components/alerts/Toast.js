import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = props => {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}


const Toast = props => {
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
}

// PropTypes
Toast.propTypes = {
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
};

export { Toast };