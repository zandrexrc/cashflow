import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, editSubscription, deleteSubscription } from '../redux/actions/subscriptions';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '../components/Table';
import { TableFooter } from '../components/TableFooter';
import { 
    dateStringToISO,
    printDate,
    isValidCurrencyAmount,
    getAccountNames,
    calcMonthlySubscriptions,
    calcYearlySubscriptions,
    printNextBillingDate,
    sortNextBillingDates
 } from '../utils';


 // Styles
 const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        maxWidth: '100%',
    },
});


const Subscriptions = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const subscriptions = useSelector(state => state.subscriptions);
    const accounts = useSelector(state => state.accounts);
    const settings = useSelector(state => state.settings);

    // Table props
    const columns = [
        { 
            title: 'Next billing date', 
            field: 'nextBillingDate',
            render: (rowData => rowData === undefined ? "" :
                    printNextBillingDate(new Date(rowData.firstBillingDate), rowData.cycle)),
            customSort: (a, b) => sortNextBillingDates(a, b),
            defaultSort: 'asc',
            editable: 'never',
            export: false,
        },
        { 
            title: 'Name', 
            field: 'name',
            validate: rowData => rowData.name === undefined ? 'Required' : ''
        },
        { 
            title: 'First billing date', 
            field: 'firstBillingDate', 
            type: 'date',
            render: (rowData => printDate(rowData.firstBillingDate, settings.dateFormat)),
            validate: rowData => rowData.firstBillingDate === undefined ? 'Required' : ''
        },
        {
            title: 'Cycle',
            field: 'cycle',
            lookup: {"monthly": "monthly", "yearly": "yearly"},
            validate: rowData => rowData.cycle === undefined ? 'Required' : ''
        },
        { 
            title: 'Account', 
            field: 'accountID',
            lookup: getAccountNames(accounts),
            validate: rowData => rowData.accountID === undefined ? 'Required' : ''
        },
        { 
            title: 'Category', 
            field: 'category'
        },
        { 
            title: 'Amount', 
            field: 'amount', 
            type: 'currency',
            currencySetting: {
                currencyCode: settings.currency,
                maximumFractionDigits: 2
            },
            validate: rowData => rowData.amount === undefined || 
                !isValidCurrencyAmount(rowData.amount) ? 'Required' : ''
        }
    ];

    const addData = newData => {
        newData.firstBillingDate = dateStringToISO(newData.firstBillingDate);
        newData.amount = parseFloat(newData.amount);
        newData.accountID = parseInt(newData.accountID);
        dispatch(addSubscription(newData));
    }

    const editData = newData => {
        newData.firstBillingDate = dateStringToISO(newData.firstBillingDate);
        newData.amount = parseFloat(newData.amount);
        newData.accountID = parseInt(newData.accountID);
        dispatch(editSubscription(newData.subscriptionID, newData));
    }

    const deleteData = oldData => {
        dispatch(deleteSubscription(oldData.subscriptionID));
    }

    const monthlyExpenses = calcMonthlySubscriptions(subscriptions);
    const yearlyExpenses = calcYearlySubscriptions(subscriptions);

    
    // Apply styles
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Table
                title="Subscriptions"
                columns={columns}
                data={subscriptions}
                addData={addData}
                editData={editData}
                deleteData={deleteData}
            />
            <TableFooter 
                data={[
                    {
                        label: "Remaining expenses (this month)",
                        value: monthlyExpenses.remainingExpenses.toFixed(2),
                        color: "error"
                    },
                    {
                        label: "Total expenses (this month)",
                        value: monthlyExpenses.totalExpenses.toFixed(2),
                        color: "error"
                    },
                    {
                        label: "Remaining expenses (this year)",
                        value: yearlyExpenses.remainingExpenses.toFixed(2),
                        color: "textPrimary"
                    },
                    {
                        label: "Total expenses (this year)",
                        value: yearlyExpenses.totalExpenses.toFixed(2),
                        color: "textPrimary"
                    },
                ]}
            />
        </div>
    );
};

export { Subscriptions };