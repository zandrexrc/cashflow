import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
                <Link href="/">Click here to refresh the page.</Link>
            </Typography>
        </div>
    );
};

export { Error };