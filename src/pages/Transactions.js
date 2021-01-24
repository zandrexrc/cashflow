import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccountBalance } from '../redux/actions/accounts';
import { addTransaction, editTransaction, deleteTransaction } from '../redux/actions/transactions';
import { showDialog, hideDialog } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionDetails } from '../components/details/TransactionDetails';
import { TransactionForm } from '../components/forms/TransactionForm';
import { TransactionList } from '../components/lists/TransactionList';
import { TransactionStatistics } from '../components/statistics/TransactionStatistics';
import { filterTransactions, createTransactionsGraphData } from '../utils';


 // Styles
 const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        minWidth: '100%',
        maxWidth: '100%',
    }
});


const Transactions = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const currency = useSelector(state => state.settings.currency);
    const dateFormat = useSelector(state => state.settings.dateFormat);
    const transactions = useSelector(state => state.transactions);

    // Local state
    const initialFilters = {
        account: 'All',
        category: 'All',
        date: {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        }
    };
    
    const [state, setState] = React.useState({
        filters: initialFilters,
        detailsTabIsOpen: false,
        formTabIsOpen: false,
        selectedTransaction: null
    });

    const displayedTransactions = filterTransactions(transactions, state.filters);
    const chartData = createTransactionsGraphData(displayedTransactions);

    // Manage state
    const setFilters = newFilters => {
        setState({ ...state, filters: newFilters });
    };

    const openDetailsTab = transaction => {
        setState({ ...state, detailsTabIsOpen: true, selectedTransaction: transaction });
    };

    const closeDetailsTab = () => {
        setState({ ...state, detailsTabIsOpen: false, selectedTransaction: null });
    };

    const toggleFormTab = () => {
        setState({ ...state, formTabIsOpen: !state.formTabIsOpen });
    };

    // Manage data
    const addData = async (newData) => {
        await dispatch(addTransaction(newData));
        dispatch(updateAccountBalance(newData.accountId, newData.amount));
        setState({ ...state, filters: initialFilters, formTabIsOpen: false });
    }

    const editData = async (newData) => {
        await dispatch(editTransaction(newData.transactionId, newData));
        dispatch(updateAccountBalance(newData.accountId, (newData.amount - state.selectedTransaction.amount)));
        setState({ ...state, selectedTransaction: newData, formTabIsOpen: false });
    }

    const deleteData = async () => {
        const oldData = state.selectedTransaction;
        await dispatch(deleteTransaction(oldData.transactionId));
        dispatch(updateAccountBalance(oldData.accountId, -oldData.amount));
        dispatch(hideDialog());
        closeDetailsTab();
    }

    const alertDelete = () => {
        dispatch(showDialog('Delete transaction?', deleteData));
    }

    // Apply styles
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TransactionStatistics
                chartData={chartData}
                filters={state.filters}
                setFilters={setFilters}
            />
            <TransactionList
                currency={currency}
                openDetailsTab={openDetailsTab}
                openFormTab={toggleFormTab}
                transactions={displayedTransactions}
            />
            <TransactionDetails
                close={closeDetailsTab}
                currency={currency}
                dateFormat={dateFormat}
                deleteItem={alertDelete}
                isOpen={state.detailsTabIsOpen}
                openFormTab={toggleFormTab}
                transaction={state.selectedTransaction}
            />
            <TransactionForm
                close={toggleFormTab}
                isOpen={state.formTabIsOpen}
                submit={state.selectedTransaction ? editData : addData}
                transaction={state.selectedTransaction}
            />
        </div>
    );
};

export { Transactions };