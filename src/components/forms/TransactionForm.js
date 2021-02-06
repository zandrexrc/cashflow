import React from 'react';

import {IconButton, Paper, Slide, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import {DATE_FORMAT_ISO} from '../../constants';
import {
  dateStringToISO,
  validateTransaction,
  isValidCurrencyAmount,
  printDate,
} from '../../utils';
import {AccountSelector} from '../inputs/AccountSelector';
import {CategorySelector} from '../inputs/CategorySelector';
import {DateSelector} from '../inputs/DateSelector';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50%)',
    'height': '100vh',
    'minWidth': '500px',
    'maxHeight': '100vh',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'position': 'absolute',
    'right': '0',
    'overflow': 'auto',
    '& .header': {
      width: 'calc(100% - 30px)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .details': {
      'width': 'calc(100% - 80px)',
      'height': 'calc(100% - 64px)',
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'alignItems': 'flex-start',
      'margin': '0 auto',
      '& .datepicker': {
        margin: '20px 0',
      },
      '& .tags': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: `1px solid ${theme.palette.text.secondary}`,
      },
    },
  },
}));


const newTransaction = {
  date: printDate(new Date(), DATE_FORMAT_ISO),
  description: '',
  accountId: null,
  category: '',
  amount: 0,
};


const TransactionForm = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    transaction: newTransaction,
  });

  React.useEffect(() => {
    setState({
      transaction: props.transaction ?
        props.transaction :
        newTransaction,
    });
  }, [props.transaction, setState]);

  const setDate = (date) =>
    setState({transaction: {...state.transaction, date: date}});

  const setDescription = (description) =>
    setState({transaction: {...state.transaction, description: description}});

  const setAmount = (amount) =>
    setState({transaction: {...state.transaction, amount: amount}});

  const setAccount = (accountId) =>
    setState({transaction: {...state.transaction, accountId: accountId}});

  const setCategory = (category) =>
    setState({transaction: {...state.transaction, category: category}});

  const cancelChanges = () => {
    setState({
      transaction: props.transaction ?
        props.transaction :
        newTransaction,
    });
    props.close();
  };

  const saveChanges = () => {
    const transactionIsValid = validateTransaction(state.transaction);

    if (transactionIsValid) {
      state.transaction.date = dateStringToISO(state.transaction.date);
      state.transaction.amount = parseFloat(state.transaction.amount);
      state.transaction.accountId = parseInt(state.transaction.accountId);
      props.submit(state.transaction);
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
          <DateSelector
            selectedDate={state.transaction.date}
            setDate={setDate}
          />
          <TextField
            label="Description"
            margin="normal"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            defaultValue={state.transaction.description}
            onBlur={(event) => setDescription(event.target.value)}
            error={state.transaction.description.trim().length === 0}
            helperText={
              state.transaction.description.trim().length === 0 ?
              'Required' : ''
            }
          />
          <TextField
            label="Amount"
            margin="normal"
            variant="filled"
            fullWidth
            defaultValue={state.transaction.amount}
            onBlur={(event) => setAmount(event.target.value)}
            error={!isValidCurrencyAmount(state.transaction.amount)}
            helperText={
              !isValidCurrencyAmount(state.transaction.amount) ?
              'Invalid amount' : ''
            }
            InputProps={{endAdornment: props.currency}}
          />
          <div className="tags">
            <CategorySelector
              type="transactions"
              selectedCategory={state.transaction.category}
              setCategory={setCategory}
              enableSelectAll
              showUncategorized
            />
            <AccountSelector
              selectedAccount={
                state.transaction.accountId ?
                state.transaction.accountId.toString() :
                ''
              }
              setAccount={setAccount}
            />
          </div>
        </div>
      </Paper>
    </Slide>
  );
};

TransactionForm.propTypes = {
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function called when submitting the form */
  submit: PropTypes.func.isRequired,
  /** The transaction to be edited (if null, create a new transaction) */
  transaction: PropTypes.object,
};

export {TransactionForm};
