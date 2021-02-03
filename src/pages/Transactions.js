import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccountBalance } from '../redux/actions/accounts';
import { addTransaction, editTransaction, deleteTransaction, addMultipleTransactions } from '../redux/actions/transactions';
import { setError } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionDetails } from '../components/details/TransactionDetails';
import { TransactionForm } from '../components/forms/TransactionForm';
import { TransactionList } from '../components/lists/TransactionList';
import { TransactionStatistics } from '../components/statistics/TransactionStatistics';
import { ConfirmationDialog } from '../components/alerts/ConfirmationDialog';
import { ImportFileDialog } from '../components/inputs/ImportFileDialog';
import { createTransactionsGraphData, csvToTransactions, filterTransactions, generateSampleCsv, transactionsToCsv } from '../utils';
import { SampleTransaction } from '../constants';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        minWidth: '100%',
        maxWidth: '100%',
    }
});

const initialFilters = {
    account: 'All',
    category: 'All',
    date: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    }
};

const Transactions = () => {
    const classes = useStyles();

    // Local state
    const [filters, setFilters] = React.useState(initialFilters);
    const [selectedTransaction, setSelectedTransaction] = React.useState(null);
    const [ui, setUi] = React.useState({
        confirmationDialogIsOpen: false,
        detailsTabIsOpen: false,
        formTabIsOpen: false,
        importFileDialogIsOpen: false,
    });

    // Fetch items from Redux store
    const dispatch = useDispatch();
    const currency = useSelector(state => state.settings.currency);
    const dateFormat = useSelector(state => state.settings.dateFormat);
    const transactions = useSelector(state => state.transactions);
    const displayedTransactions = filterTransactions(transactions, filters);
    const chartData = createTransactionsGraphData(displayedTransactions);
    const sampleFile = generateSampleCsv([SampleTransaction, SampleTransaction]);

    // Manage state
    const openDetailsTab = transaction => {
        setSelectedTransaction(transaction);
        setUi({ ...ui, detailsTabIsOpen: true });
    };

    const closeDetailsTab = () => {
        setSelectedTransaction(null);
        setUi({ ...ui, detailsTabIsOpen: false });
    };

    const toggleFormTab = () => {
        setUi({ ...ui, formTabIsOpen: !ui.formTabIsOpen });
    };

    const toggleConfirmationDialog = () => {
        setUi({ ...ui, confirmationDialogIsOpen: !ui.confirmationDialogIsOpen });
    };

    const toggleImportFileDialog = () => {
        setUi({ ...ui, importFileDialogIsOpen: !ui.importFileDialogIsOpen });
    };

    // Manage data
    const addData = async (newData) => {
        await dispatch(addTransaction(newData));
        dispatch(updateAccountBalance(newData.accountId, newData.amount));
        setFilters(initialFilters);
        toggleFormTab();
    }

    const editData = async (newData) => {
        await dispatch(editTransaction(newData.transactionId, newData));
        dispatch(updateAccountBalance(newData.accountId, (newData.amount - selectedTransaction.amount)));
        setSelectedTransaction(newData);
        toggleFormTab();
    }

    const deleteData = async () => {
        const oldData = selectedTransaction;
        await dispatch(deleteTransaction(oldData.transactionId));
        dispatch(updateAccountBalance(oldData.accountId, -oldData.amount));
        toggleConfirmationDialog();
        closeDetailsTab();
    }

    const exportData = () => {
        transactionsToCsv(displayedTransactions);
    }

    const importData = file => {
        csvToTransactions(file, (error, result) => {
            if (error) {
                dispatch(setError(error));
            } else {
                dispatch(addMultipleTransactions(result));
            }
        });
    }

    return (
        <div className={classes.root}>
            <TransactionStatistics
                chartData={chartData}
                filters={filters}
                setFilters={setFilters}
            />
            <TransactionList
                currency={currency}
                exportData={exportData}
                openDetailsTab={openDetailsTab}
                openFormTab={toggleFormTab}
                openImportFileDialog={toggleImportFileDialog}
                transactions={displayedTransactions}
            />
            <TransactionDetails
                close={closeDetailsTab}
                currency={currency}
                dateFormat={dateFormat}
                deleteItem={toggleConfirmationDialog}
                isOpen={ui.detailsTabIsOpen}
                openFormTab={toggleFormTab}
                transaction={selectedTransaction}
            />
            <TransactionForm
                close={toggleFormTab}
                currency={currency}
                isOpen={ui.formTabIsOpen}
                submit={selectedTransaction ? editData : addData}
                transaction={selectedTransaction}
            />
            <ConfirmationDialog 
                cancel={toggleConfirmationDialog}
                confirm={deleteData}
                isOpen={ui.confirmationDialogIsOpen}
                title="Delete transaction?"
            />
            <ImportFileDialog
                cancel={toggleImportFileDialog}
                importData={importData}
                isOpen={ui.importFileDialogIsOpen}
                sampleFile={sampleFile}
            />
        </div>
    );
};

export { Transactions };