import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        "& .description": {
            width: '500px',
            marginBottom: '20px',
        },
        "& .form": {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'flex-end',
            width: '460px',
            padding: '20px',
            "& .button": {
                marginTop: '20px',
            },
        },
    }
}));


const SettingsForm = props => {
    const classes = useStyles();

    const [currency, setCurrency] = React.useState(props.currency);

    const currencyIsValid = c => {
        return c.length > 0 && c.length <= 3;
    }

    const saveChanges = () => {
        if (currencyIsValid(currency)) {
            props.setCurrency(currency);
            props.next();
        }
    };

    return (
        <div className={classes.root}>
            <div className="description">
                <Typography variant="h6" color="primary" gutterBottom>
                    Before we start, let's talk about
                </Typography>
                <Typography variant="h3" color="primary" gutterBottom>
                    Currency.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Which currency do you use?
                    It can be either a symbol ($) or a code (USD). <br/>
                    You can also change this later in the Settings page.
                </Typography>
            </div>
            <Paper className="form">
                <TextField
                    label="Currency"
                    margin="normal"
                    fullWidth
                    defaultValue={currency}
                    onBlur={event => setCurrency(event.target.value)}
                    error={!currencyIsValid(currency)}
                    helperText="Max 3 characters"
                />
                <Button 
                    className="button" 
                    variant="contained" 
                    color="primary" 
                    disableElevation
                    onClick={saveChanges}
                >
                    Submit
                </Button>
            </Paper>
        </div>
    )
}

// PropTypes
SettingsForm.propTypes = {
    currency: PropTypes.string.isRequired,
    setCurrency: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
};

export { SettingsForm };