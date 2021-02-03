import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, editAccount, deleteAccount, addMultipleAccounts } from '../redux/actions/accounts';
import { setError } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import { AccountDetails } from '../components/details/AccountDetails';
import { AccountForm } from '../components/forms/AccountForm';
import { AccountList } from '../components/lists/AccountList';
import { AccountStatistics } from '../components/statistics/AccountStatistics';
import { ConfirmationDialog } from '../components/alerts/ConfirmationDialog';
import { ImportFileDialog } from '../components/inputs/ImportFileDialog';
import { createAccountsGraphData, csvToAccounts, generateSampleCsv, accountsToCsv } from '../utils';
import { SampleAccount } from '../constants';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        minWidth: '100%',
        maxWidth: '100%',
    }
});

const Accounts = () => {
    const classes = useStyles();

    // Local state
    const [selectedAccount, setSelectedAccount] = React.useState(null);
    const [ui, setUi] = React.useState({
        confirmationDialogIsOpen: false,
        detailsTabIsOpen: false,
        formTabIsOpen: false,
        importFileDialogIsOpen: false,
    });

    // Fetch items from Redux store
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts).sort((a, b) => b.balance - a.balance);
    const currency = useSelector(state => state.settings.currency);
    const chartData = createAccountsGraphData(accounts);
    const sampleFile = generateSampleCsv([SampleAccount, SampleAccount]);

    // Manage state
    const openDetailsTab = account => {
        setSelectedAccount(account);
        setUi({ ...ui, detailsTabIsOpen: true });
    };

    const closeDetailsTab = () => {
        setSelectedAccount(null);
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
    const addData = newData => {
        newData.balance = parseFloat(newData.balance);
        dispatch(addAccount(newData));
        toggleFormTab();
    }

    const editData = newData => {
        newData.balance = parseFloat(newData.balance);
        dispatch(editAccount(newData.accountId, newData));
        setSelectedAccount(newData);
        toggleFormTab();
    }

    const deleteData = () => {
        dispatch(deleteAccount(selectedAccount.accountId));
        toggleConfirmationDialog();
        closeDetailsTab();
    }

    const exportData = () => {
        accountsToCsv(accounts);
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
    
    return (
        <div className={classes.root}>
            <AccountStatistics chartData={chartData} />
            <AccountList
                accounts={accounts}
                currency={currency}
                exportData={exportData}
                openDetailsTab={openDetailsTab}
                openFormTab={toggleFormTab}
                openImportFileDialog={toggleImportFileDialog}
            />
            <AccountDetails
                account={selectedAccount}
                close={closeDetailsTab}
                currency={currency}
                deleteItem={toggleConfirmationDialog}
                isOpen={ui.detailsTabIsOpen}
                openFormTab={toggleFormTab}
            />
            <AccountForm
                close={toggleFormTab}
                currency={currency}
                isOpen={ui.formTabIsOpen}
                submit={selectedAccount ? editData : addData}
                account={selectedAccount}
            />
            <ConfirmationDialog 
                cancel={toggleConfirmationDialog}
                confirm={deleteData}
                isOpen={ui.confirmationDialogIsOpen}
                title="Delete account?"
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

export { Accounts };