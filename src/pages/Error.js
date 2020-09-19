import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Error = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary">
                Oops.
            </Typography>
            <Typography variant="h5" color="textPrimary">
                {props.error}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Please refresh the page.
            </Typography>
        </div>
    );
};

export { Error };