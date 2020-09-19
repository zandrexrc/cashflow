import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, editAccount, deleteAccount } from '../redux/actions/accounts';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '../components/Table';
import { TableFooter } from '../components/TableFooter';
import { isValidCurrencyAmount } from '../utils';


// Styles
const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        maxWidth: '100%',
    },
});


const Accounts = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts);
    const settings = useSelector(state => state.settings);

    // Table params
    const columns = [
        { 
            title: 'Name', 
            field: 'name',
            validate: rowData => rowData.name === undefined ? 'Required' : ''
        },
        {
            title: 'Type',
            field: 'type'
        },
        { 
            title: 'Balance', 
            field: 'balance', 
            type: 'currency',
            currencySetting: {
                currencyCode: settings.currency,
                maximumFractionDigits: 2
            },
            validate: rowData => rowData.balance === undefined || 
                !isValidCurrencyAmount(rowData.balance) ? 'Required' : ''
        },
    ];

    const addData = newData => {
        newData.balance = parseFloat(newData.balance);
        dispatch(addAccount(newData));
    }

    const editData = newData => {
        newData.balance = parseFloat(newData.balance);
        dispatch(editAccount(newData.accountID, newData));
    }

    const deleteData = oldData => {
        dispatch(deleteAccount(oldData.accountID));
    }

    const totalBalance = accounts.reduce((total, a) => total + a.balance, 0);
    

    // Apply styles
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Table
                title="Accounts"
                columns={columns}
                data={accounts}
                addData={addData}
                editData={editData}
                deleteData={deleteData}
            />
            <TableFooter 
                data={[
                    {
                        label: "Total balance",
                        value: totalBalance.toFixed(2),
                        color: "textPrimary"
                    }
                ]}
            />
        </div>
    );
};

export { Accounts };