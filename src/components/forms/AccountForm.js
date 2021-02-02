import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Paper, Slide, TextField } from '@material-ui/core';
import { getAccountNames, isValidCurrencyAmount, validateAccount } from '../../utils';


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
    name: '',
    type: '',
    balance: 0,
};


const AccountForm = props => {
    const classes = useStyles();
    const accountNames = Object.values(getAccountNames());

    const [state, setState] = React.useState({
        account: newAccount
    });
    
    const [nameError, setNameError] = React.useState('Required');

    React.useEffect(() => {
        setState({account: props.account ? props.account : newAccount});
        setNameError(props.account ? '' : 'Required' );
    }, [props.account, setState]);

    const setName = name =>
        setState({account: { ...state.account, name: name }});

    const setType = type =>
        setState({account: { ...state.account, type: type }});

    const setBalance = balance => 
        setState({account: { ...state.account, balance: balance }});

    const changeName = name => {
        if (name.trim().length === 0) {
            setNameError('Required');
        } else if (!state.account.accountId && accountNames.includes(name)) {
            setNameError('An account with the same name already exists');
        } else {
            setNameError('');
            setName(name);
        }
    };

    const cancelChanges = () => {
        setState({account: props.account ? props.account : newAccount});
        setNameError('');
        props.close()
    };

    const saveChanges = () => {
        const accountIsValid = validateAccount(state.account);

        if (accountIsValid && !nameError) {
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
                        defaultValue={state.account.type}
                        onBlur={event => setType(event.target.value)}
                        error={state.account.type.trim().length === 0}
                        helperText={
                            state.account.type.trim().length === 0
                            ? 'Required' : ''
                        }
                    />
                    <TextField
                        label="Name"
                        margin="normal"
                        fullWidth
                        defaultValue={state.account.name}
                        onBlur={event => changeName(event.target.value)}
                        error={Boolean(nameError)}
                        helperText={nameError}
                    />
                   <TextField
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
                        InputProps={{ endAdornment: props.currency }}
                    />
                </div>
            </Paper>
        </Slide>
    )
}

// PropTypes
AccountForm.propTypes = {
    account: PropTypes.object,
    currency: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
};

export { AccountForm };