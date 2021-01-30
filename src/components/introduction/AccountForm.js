import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addAccount } from '../../redux/actions/accounts';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { getAccountNames, isValidCurrencyAmount, validateAccount } from '../../utils';


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
            "& .formDetails": {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            },
            "& .button": {
                marginTop: '20px',
            },
        },
    }
}));


const AccountForm = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accountNames = Object.values(getAccountNames());

    const [accountState, setAccountState] = React.useState({
        name: 'Name',
        type: 'Type',
        balance: 0
    });

    const [nameError, setNameError] = React.useState('');

    const setName = name =>
        setAccountState({ ...accountState, name: name });

    const setType = type =>
        setAccountState({ ...accountState, type: type });

    const setBalance = balance => 
        setAccountState({ ...accountState, balance: balance });

    const changeName = name => {
        if (name.trim().length === 0) {
            setNameError('*Required');
        } else if (accountNames.includes(name)) {
            setNameError('An account with the same name already exists');
        } else {
            setNameError('');
            setName(name);
        }
    };

    const saveChanges = () => {
        const accountIsValid = validateAccount(accountState);

        if (accountIsValid) {
            accountState.balance = parseFloat(accountState.balance);
            dispatch(addAccount(accountState));
            props.next();
        }
    };

    return (
        <div className={classes.root}>
            <div className="description">
                <Typography variant="h3" color="primary" gutterBottom>
                    Create an account
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    It's where your transactions and subscriptions are recorded. <br/>
                    You can create more later, but you need at least one 
                    to get started.
                </Typography>
            </div>
            <Paper className="form">
                <TextField
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    defaultValue={accountState.name}
                    onBlur={event => changeName(event.target.value)}
                    error={Boolean(nameError)}
                    helperText={nameError}
                />
                <div className="formDetails">
                    <TextField
                        label="Type"
                        margin="normal"
                        defaultValue={accountState.type}
                        onBlur={event => setType(event.target.value)}
                        error={accountState.type.trim().length === 0}
                        helperText={
                            accountState.type.trim().length === 0
                            ? '*Required' : '(e.g. Checking, Savings)'
                        }
                    />
                    <TextField
                        label="Balance"
                        margin="normal"
                        defaultValue={accountState.balance}
                        onBlur={event => setBalance(event.target.value)}
                        error={!isValidCurrencyAmount(accountState.balance)}
                        helperText={
                            !isValidCurrencyAmount(accountState.balance)
                            ? 'Invalid amount' : ''
                        }
                        InputProps={{ endAdornment: props.currency }}
                    />
                </div>
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
AccountForm.propTypes = {
    currency: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
};

export { AccountForm };