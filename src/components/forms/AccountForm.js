import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Paper, Slide, TextField } from '@material-ui/core';
import { isValidCurrencyAmount, validateAccount } from '../../utils';


const useStyles = makeStyles(theme => ({
    root: {
        width: 'calc(50%)',
        height: '100vh',
        minWidth: '500px',
        maxHeight: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        position: 'absolute',
        right: '0',
        overflow: 'auto',
        "& .header": {
            width: 'calc(100% - 30px)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px 0 20px',
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .details": {
            width: 'calc(100% - 80px)',
            height: 'calc(100% - 64px)',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'flex-start',
            margin: '0 auto',
            "& .datepicker": {
                margin: '20px 0'
            },
            "& .tags": {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: `1px solid ${theme.palette.text.secondary}`
            }
        },
    }
}));


const newAccount = {
    accountID: 'abcde',
    name: '',
    type: '',
    balance: 0,
};


const AccountForm = props => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        account: newAccount
    });

    React.useEffect(() => {
        setState({account: props.account ? props.account : newAccount});
    }, [props.account, setState]);

    const setName = name =>
        setState({account: { ...state.account, name: name }});

    const setType = type =>
        setState({account: { ...state.account, type: type }});

    const setBalance = balance => 
        setState({account: { ...state.account, balance: balance }});

    const cancelChanges = () => {
        setState({account: props.account ? props.account : newAccount});
        props.close()
    };

    const saveChanges = () => {
        // Validate account
        const accountIsValid = validateAccount(state.account);

        // Submit form only if transaction is valid
        if (accountIsValid) {
            state.account.balance = parseFloat(state.account.balance);
            props.submit(state.account);
        }
    };

    return (
        <Slide direction="left" in={props.isOpen} mountOnEnter unmountOnExit>
            <Paper className={classes.root} square elevation={10}>
                <div className="header">
                    <IconButton onClick={cancelChanges}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton onClick={saveChanges}>
                        <CheckIcon />
                    </IconButton>
                </div>
                <div className="details">
                    <TextField
                        label="Type"
                        margin="normal"
                        variant="outlined"
                        defaultValue={state.account.type}
                        onBlur={event => setType(event.target.value)}
                        error={state.account.type.trim().length === 0}
                        helperText={
                            state.account.type.trim().length === 0
                            ? 'Must be filled out' : ''
                        }
                    />
                    <TextField
                        label="Name"
                        margin="normal"
                        fullWidth
                        defaultValue={state.account.name}
                        onBlur={event => setName(event.target.value)}
                        error={state.account.name.trim().length === 0}
                        helperText={
                            state.account.name.trim().length === 0
                            ? 'Must be filled out' : ''
                        }
                    />
                   <TextField
                        type="number"
                        inputProps={{step: 0.01}}
                        label="Balance"
                        margin="normal"
                        variant="filled"
                        fullWidth
                        defaultValue={state.account.balance}
                        onBlur={event => setBalance(event.target.value)}
                        error={!isValidCurrencyAmount(state.account.balance)}
                        helperText={
                            !isValidCurrencyAmount(state.account.balance)
                            ? 'Invalid amount' : ''
                        }
                    />
                </div>
            </Paper>
        </Slide>
    )
}

// PropTypes
AccountForm.propTypes = {
    account: PropTypes.object,
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
};

export { AccountForm };