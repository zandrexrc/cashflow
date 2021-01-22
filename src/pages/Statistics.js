import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { ActivityStatistics } from '../components/statistics/ActivityStatistics';
import { CategoryStatistics } from '../components/statistics/CategoryStatistics';
import { CategoryList } from '../components/lists/CategoryList';
import { calcNetIncome, createCategoryGraphData, createActivityGraphData, filterTransactions } from '../utils';


 // Styles
 const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '100%',
        maxWidth: '100%',
        '& .header': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'calc(100% - 40px)',
            height: '64px',
            padding: '0 20px',
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        '& .buttons': {
            position: 'absolute',
            top: '84px',
            left: '20px',
            zIndex: '999',
        },
        '& .categories, .activity': {
            display: 'flex',
            flexFlow: 'row nowrap',
            width: '100%',
            height: 'calc(100vh - 64px)',
            backgroundColor: theme.palette.background.paper,
        },
    }
}));


const Statistics = () => {
    // Fetch items from Redux store
    const transactions = useSelector(state => state.transactions);
    const currency = useSelector(state => state.settings.currency);

    // Local state
    const today = new Date();
    const initialFilters = {
        account: 'All',
        category: 'All',
        date: {
            month: today.getMonth(),
            year: today.getFullYear(),
        }
    };
    const [state, setState] = React.useState({
        filters: initialFilters,
        categoriesTabIsOpen: true
    });

    // Charts values
    const filteredTransactions = filterTransactions(transactions, state.filters);
    const activityData = createActivityGraphData(filteredTransactions, state.filters.date.month, state.filters.date.year);
    const categoriesData = createCategoryGraphData(filteredTransactions);
    const transactionsData = calcNetIncome(filteredTransactions);
    const categoriesStats = [
        { label: 'income', value: transactionsData.totalIncome },
        { label: 'expenses', value: transactionsData.totalExpenses },
        { label: 'net income', value: transactionsData.netIncome }
    ];

    const setFilters = filters => {
        setState({
            filters: filters,
            categoriesTabIsOpen: state.categoriesTabIsOpen, 
        });
    };

    const toggleCategoriesTab = status => 
        setState({ ...state, categoriesTabIsOpen: status });

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <div className="header">
                <Typography color="textPrimary" variant="h6">
                    Statistics
                </Typography>
            </div>
            <div className="buttons">
                <Button 
                    disableElevation
                    disableRipple
                    onClick={() => toggleCategoriesTab(true)}
                    size="small"
                    variant={state.categoriesTabIsOpen ? "contained" : "outlined"}
                >
                    Categories
                </Button>
                <Button 
                    disableElevation
                    disableRipple
                    onClick={() => toggleCategoriesTab(false)}
                    size="small"
                    variant={state.categoriesTabIsOpen ? "outlined": "contained"}
                >
                    Activity
                </Button>
            </div>
            {
                state.categoriesTabIsOpen && 
                <div className="categories">
                    <CategoryStatistics
                        data={categoriesData}
                        filters={state.filters}
                        setFilters={setFilters}
                        stats={categoriesStats}
                    />
                    <CategoryList
                        currency={currency}
                        transactions={filteredTransactions}
                    />
                </div>
            }
            {
                !state.categoriesTabIsOpen &&
                <ActivityStatistics
                    currency={currency}
                    data={activityData}
                    filters={state.filters}
                    setFilters={setFilters}
                />
            }
        </div>
    );
};

export { Statistics };