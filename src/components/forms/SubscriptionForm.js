import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Slide, TextField } from '@material-ui/core';
import { DateSelector } from '../inputs/DateSelector';
import { AccountSelector } from '../inputs/AccountSelector';
import { CategorySelector } from '../inputs/CategorySelector';
import { dateStringToISO, isValidCurrencyAmount, printDate, validateSubscription } from '../../utils';
import { DATE_FORMAT_ISO } from '../../constants';


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
            "& .dates": {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
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


const newSubscription = {
    name: '',
    firstBillingDate: printDate(new Date(), DATE_FORMAT_ISO),
    cycle: 'monthly',
    accountId: null,
    category: '',
    amount: 0,
};


const SubscriptionForm = props => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        subscription: newSubscription
    });

    React.useEffect(() => {
        setState({subscription: props.subscription ? props.subscription : newSubscription});
    }, [props.subscription, setState]);

    const setFirstBillingDate = date =>
        setState({subscription: { ...state.subscription, firstBillingDate: date }});

    const setName = name =>
        setState({subscription: { ...state.subscription, name: name }});

    const setCycle = cycle =>
        setState({subscription: { ...state.subscription, cycle: cycle }});

    const setAmount = amount => 
        setState({subscription: { ...state.subscription, amount: amount }});

    const setAccount = accountId => 
        setState({subscription: { ...state.subscription, accountId: accountId }});

    const setCategory = category => 
        setState({subscription: { ...state.subscription, category: category }});

    const cancelChanges = () => {
        setState({subscription: props.subscription ? props.subscription : newSubscription});
        props.close();
    };

    const saveChanges = () => {
        const subscriptionIsValid = validateSubscription(state.subscription);

        if (subscriptionIsValid) {
            state.subscription.firstBillingDate = dateStringToISO(state.subscription.firstBillingDate);
            state.subscription.amount = parseFloat(state.subscription.amount);
            state.subscription.accountId = parseInt(state.subscription.accountId);
            props.submit(state.subscription);
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
                    <div className="dates">
                        <DateSelector
                            selectedDate={state.subscription.firstBillingDate}
                            setDate={setFirstBillingDate}
                        />
                        <FormControl>
                            <InputLabel id="cycle-select-label">Cycle</InputLabel>
                            <Select
                                labelId="cycle-select-label"
                                id="cycle-select"
                                value={state.subscription.cycle}
                                onChange={event => setCycle(event.target.value)}
                            >
                                <MenuItem value={"monthly"}>Monthly</MenuItem>
                                <MenuItem value={"yearly"}>Yearly</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        fullWidth
                        defaultValue={state.subscription.name}
                        onBlur={event => setName(event.target.value)}
                        error={state.subscription.name.trim().length === 0}
                        helperText={
                            state.subscription.name.trim().length === 0
                            ? 'Required' : ''
                        }
                    />
                   <TextField
                        label="Amount"
                        margin="normal"
                        variant="filled"
                        fullWidth
                        defaultValue={state.subscription.amount}
                        onBlur={event => setAmount(event.target.value)}
                        error={!isValidCurrencyAmount(state.subscription.amount)}
                        helperText={
                            !isValidCurrencyAmount(state.subscription.amount)
                            ? 'Invalid amount' : ''
                        }
                        InputProps={{ endAdornment: props.currency }}
                    />
                    <div className="tags">
                        <CategorySelector
                            type="subscriptions"
                            selectedCategory={state.subscription.category}
                            setCategory={setCategory}
                            enableSelectAll
                            showUncategorized
                        />
                        <AccountSelector
                            selectedAccount={
                                state.subscription.accountId 
                                ? state.subscription.accountId.toString() 
                                : ''
                            }
                            setAccount={setAccount}
                        />
                    </div>
                </div>
            </Paper>
        </Slide>
    )
}

// PropTypes
SubscriptionForm.propTypes = {
    close: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    subscription: PropTypes.object,
};

export { SubscriptionForm };