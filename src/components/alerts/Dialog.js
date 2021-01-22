import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';


const Dialog = props => {
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
}

// PropTypes
Dialog.propTypes = {
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

export { Dialog };