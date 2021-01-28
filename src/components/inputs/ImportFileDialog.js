import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        '& .list': {
            fontSize: '0.8em',
            color: theme.palette.text.secondary,
        },
        '& .inputButton': {
            marginRight: '10px',
        },
    },
}));


const ImportFileDialog = props => {
    const classes = useStyles();
    const [uploadedFile, setUploadedFile] = React.useState(null);

    const closeDialog = () => {
        props.cancel();
        setUploadedFile(null);
    };

    const chooseFile = () => {
        document.querySelector('#fileInput').click();
    };

    const submitFile = () => {
        props.importData(uploadedFile);
        closeDialog();
    };

    return (
        <Dialog 
            className={classes.root}
            open={props.isOpen} 
            onClose={closeDialog}
        >
            <DialogTitle>
                Import data from file
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    1. Download this&nbsp;
                    <Link href={props.sampleFile} download="sample.csv">sample file</Link> 
                    &nbsp;and use it as a template.
                </DialogContentText>
                    <ul className="list">
                        <li>The first row is the header row, don't delete it!</li>
                        <li>Dates must follow the ISO format: YYYY-MM-DD</li>
                        <li>Amount and balance must be numerical values</li>
                        <li>A subscription cycle must be either <i>monthly</i> or <i>yearly</i></li>
                        <li>All fields except for category are required</li>
                    </ul>
                <DialogContentText>
                    2. Upload your file.
                </DialogContentText>
                    <ul className="list">
                        <li>The file must be a valid csv file</li>
                        <li>Please don't upload a large file to avoid crashing the app!</li>
                        <li>Kindly limit the file to a maximum of 1000 rows.</li>
                    </ul>
                    <input 
                        id="fileInput"
                        type="file"  
                        accept=".csv" 
                        hidden
                        onChange={event => setUploadedFile(event.target.files[0])}
                    ></input>
            </DialogContent>
            <DialogContent>
                <Button
                    className="inputButton"
                    variant="contained"
                    size="small"
                    color="primary"
                    disableElevation
                    onClick={chooseFile}
                >
                    Choose a file
                </Button>
                <span>
                    { uploadedFile ? uploadedFile.name : 'No file selected.' }
                </span>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitFile} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// PropTypes
ImportFileDialog.propTypes = {
    cancel: PropTypes.func.isRequired,
    importData: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    sampleFile: PropTypes.any.isRequired,
};

export { ImportFileDialog };