import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editSettings } from '../../redux/actions/settings';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        "& .icon": {
            color: theme.palette.primary.main,
            fontSize: '5em',
            marginBottom: '20px',
        },
        "& .button": {
            marginTop: '20px',
        },
    }
}));


const Offboarding = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const saveChanges = () => {
        dispatch(editSettings(props.settings));
    };

    return (
        <div className={classes.root}>
            <CheckCircleIcon className="icon" />
            <Typography variant="h3" color="primary" gutterBottom>
                You're all set!
            </Typography>
            <Typography variant="body1" color="textPrimary" align="center">
                Go on and explore the app. <br/>
                We hope you'll enjoy Cashflow!
            </Typography>
            <Button 
                className="button" 
                variant="contained" 
                color="primary" 
                disableElevation
                onClick={saveChanges}
            >
                OK
            </Button>
        </div>
    )
}

// PropTypes
Offboarding.propTypes = {
    settings: PropTypes.object.isRequired,
};

export { Offboarding };