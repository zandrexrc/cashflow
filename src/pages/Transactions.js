import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, editTransaction, deleteTransaction } from '../redux/actions/transactions';
import { editAccount } from '../redux/actions/accounts';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '../components/Table';
import { TableFooter } from '../components/TableFooter';
import { FilterDialog } from '../components/FilterDialog';
import { 
    dateStringToISO,
    printDate,
    isValidCurrencyAmount,
    getAccountNames,
    getTransactionYears,
    getCategories,
    filterByAccount,
    filterByCategory,
    filterByDate,
    getFilteredTransactions,
    calcNetIncome
 } from '../utils';


 // Styles
 const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        maxWidth: '100%',
    }
});


const Transactions = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions);
    const accounts = useSelector(state => state.accounts);
    const settings = useSelector(state => state.settings);

    // Local state
    const initialFilters = {
        account: 'All',
        category: 'All',
        date: {
            month: 'All',
            year: new Date().getFullYear(),
        }
    };
    
    const [state, setState] = React.useState({
        filterDialogIsOpen: false,
        filters: initialFilters,
    });

    const toggleFilterDialog = status => 
        setState({ ...state, filterDialogIsOpen: status });

    const setFilters = filters => {
        setState({ 
            ...state, 
            filters: filters, 
            filterDialogIsOpen: false 
        });
    };

    // Table params
    const columns = [
        { 
            title: 'Date', 
            field: 'date', 
            type: 'date',
            render: (rowData => printDate(rowData.date, settings.dateFormat)),
            defaultSort: 'desc',
            defaultFilter: state.filters.date,
            customFilterAndSearch: (term, rowData) => filterByDate(term, rowData),
            validate: rowData => rowData.date === undefined ? 'Required' : ''
        },
        { 
            title: 'Description', 
            field: 'description',
            validate: rowData => rowData.description === undefined ? 'Required' : ''
        },
        { 
            title: 'Account', 
            field: 'accountID',
            lookup: getAccountNames(accounts),
            defaultFilter: state.filters.account,
            customFilterAndSearch: (term, rowData) => filterByAccount(term, rowData),
            validate: rowData => rowData.accountID === undefined ? 'Required' : ''
        },
        { 
            title: 'Category', 
            field: 'category',
            defaultFilter: state.filters.category,
            customFilterAndSearch: (term, rowData) => filterByCategory(term, rowData),
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

    const addData = async (newData) => {
        newData.date = dateStringToISO(newData.date);
        newData.amount = parseFloat(newData.amount);
        newData.accountID = parseInt(newData.accountID);
        await dispatch(addTransaction(newData));
        // Update account balance
        let account = accounts.find(a => a.accountID === newData.accountID);
        account.balance += newData.amount;
        dispatch(editAccount(account.accountID, account));
        // Reset table filters
        setState({ ...state, filters: initialFilters });
    }

    const editData = async (newData, oldData) => {
        newData.date = dateStringToISO(newData.date);
        newData.amount = parseFloat(newData.amount);
        newData.accountID = parseInt(newData.accountID);
        await dispatch(editTransaction(newData.transactionID, newData));
        // Update account balance
        let account = accounts.find(a => a.accountID === newData.accountID);
        account.balance += (newData.amount - oldData.amount);
        dispatch(editAccount(account.accountID, account));
    }

    const deleteData = async (oldData) => {
        await dispatch(deleteTransaction(oldData.transactionID));
        // Update account balance
        let account = accounts.find(a => a.accountID === oldData.accountID);
        account.balance -= oldData.amount;
        dispatch(editAccount(account.accountID, account));
    }

    // TableFooter values
    const categories = getCategories(transactions);
    const transactionYears = getTransactionYears(transactions);
    const displayedTransactions = getFilteredTransactions(transactions, state.filters);
    const totals = calcNetIncome(displayedTransactions);

    // Apply styles
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Table
                title="Transactions"
                columns={columns}
                data={transactions}
                addData={addData}
                editData={editData}
                deleteData={deleteData}
                additionalActions={[
                    {
                        icon: 'tune',
                        tooltip: 'Filter',
                        isFreeAction: true,
                        onClick: () => toggleFilterDialog(true)
                    }
                ]}
            />
            <TableFooter 
                data={[
                    {
                        label: "Total income",
                        value: totals.totalIncome.toFixed(2),
                        color: "primary"
                    },
                    {
                        label: "Total expenses",
                        value: totals.totalExpenses.toFixed(2),
                        color: "error"
                    },
                    {
                        label: "Net income",
                        value: totals.netIncome.toFixed(2),
                        color: "textPrimary"
                    }
                ]}
                filters={state.filters ? state.filters : initialFilters}
                accounts={accounts}
            />
            <FilterDialog
                isOpen={state.filterDialogIsOpen}
                closeDialog={() => toggleFilterDialog(false)}
                filters={initialFilters}
                setFilters={setFilters}
                accounts={accounts}
                categories={categories}
                transactionYears={transactionYears}
                enableYearLongDateRange={true}
            />
        </div>
    );
};

export { Transactions };