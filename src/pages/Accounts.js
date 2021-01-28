import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, editAccount, deleteAccount, addMultipleAccounts } from '../redux/actions/accounts';
import { setError, showDialog, hideDialog } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import { AccountDetails } from '../components/details/AccountDetails';
import { AccountForm } from '../components/forms/AccountForm';
import { AccountList } from '../components/lists/AccountList';
import { AccountStatistics } from '../components/statistics/AccountStatistics';
import { createAccountsGraphData, csvToAccounts } from '../utils';


// Styles
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        minWidth: '100%',
        maxWidth: '100%',
    }
});


const Accounts = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts).sort((a, b) => b.balance - a.balance);
    const currency = useSelector(state => state.settings.currency);

    const [state, setState] = React.useState({
        detailsTabIsOpen: false,
        formTabIsOpen: false,
        selectedAccount: null
    });

    const chartData = createAccountsGraphData(accounts);

    // Manage state
    const openDetailsTab = account => {
        setState({ ...state, detailsTabIsOpen: true, selectedAccount: account });
    };

    const closeDetailsTab = () => {
        setState({ ...state, detailsTabIsOpen: false, selectedAccount: null });
    };

    const toggleFormTab = () => {
        setState({ ...state, formTabIsOpen: !state.formTabIsOpen });
    };

    // Manage data
    const addData = newData => {
        newData.balance = parseFloat(newData.balance);
        dispatch(addAccount(newData));
        setState({ ...state, formTabIsOpen: false });
    }

    const editData = newData => {
        newData.balance = parseFloat(newData.balance);
        dispatch(editAccount(newData.accountId, newData));
        setState({ ...state, selectedAccount: newData, formTabIsOpen: false });
    }

    const deleteData = () => {
        dispatch(deleteAccount(state.selectedAccount.accountId));
        dispatch(hideDialog());
        closeDetailsTab();
    }

    const alertDelete = () => {
        dispatch(showDialog('Delete account?', deleteData));
    }

    const importData = file => {
        csvToAccounts(file, (error, result) => {
            if (error) {
                dispatch(setError(error));
            } else {
                dispatch(addMultipleAccounts(result));
            }
        });
    }
    

    // Apply styles
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AccountStatistics chartData={chartData} />
            <AccountList
                accounts={accounts}
                currency={currency}
                importData={importData}
                openDetailsTab={openDetailsTab}
                openFormTab={toggleFormTab}
            />
            <AccountDetails
                account={state.selectedAccount}
                close={closeDetailsTab}
                currency={currency}
                deleteItem={alertDelete}
                isOpen={state.detailsTabIsOpen}
                openFormTab={toggleFormTab}
            />
            <AccountForm
                close={toggleFormTab}
                isOpen={state.formTabIsOpen}
                submit={state.selectedAccount ? editData : addData}
                account={state.selectedAccount}
            />
        </div>
    );
};

export { Accounts };