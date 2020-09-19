import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Divider,
    Typography,
    Toolbar,
    IconButton,
} from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { ActivityGraph } from '../components/ActivityGraph';
import { CategoriesGraph } from '../components/CategoriesGraph';
import { TableFooter } from '../components/TableFooter';
import { FilterDialog } from '../components/FilterDialog';
import { 
    printMonthName,
    getTransactionYears,
    getCategories,
    getFilteredTransactions,
    calcNetIncome,
    createCategoryGraphData,
    createActivityGraphData,
 } from '../utils';


 // Styles
 const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
    },
    toolbar: {
        maxWidth: '100%',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        borderBottom: `solid 1px ${theme.palette.divider}`
    },
    title: {
        flexGrow: 1
    },
    flexContainer: {
        maxWidth: 'calc(100% - 40px)',
        margin: 20
    }
}));


const Statistics = () => {
    const today = new Date();

    // Fetch items from Redux store
    const transactions = useSelector(state => state.transactions);
    const accounts = useSelector(state => state.accounts);
    const currency = useSelector(state => state.settings.currency);
    const initialFilters = {
        account: 'All',
        category: 'All',
        date: {
            month: today.getMonth()+1,
            year: today.getFullYear(),
        }
    };

    // Local state
    const [state, setState] = React.useState({
        filterDialogIsOpen: false,
        filters: initialFilters,
    });

    const toggleFilterDialog = status => 
        setState({ ...state, filterDialogIsOpen: status });

    const setFilters = filters => {
        setState({
            filters: filters,
            filterDialogIsOpen: false, 
        });
    };

    // Charts values
    const categories = getCategories(transactions);
    const transactionYears = getTransactionYears(transactions);
    const filteredTransactions = getFilteredTransactions(transactions, state.filters);
    const categoryData = createCategoryGraphData(filteredTransactions);
    const activityData = createActivityGraphData(filteredTransactions, state.filters.date.month, state.filters.date.year);
    const totals = calcNetIncome(filteredTransactions);
    const monthName = printMonthName(new Date(state.filters.date.year, state.filters.date.month, 0));

    // Apply styles
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title}>
                    Statistics
                </Typography>
                <IconButton onClick={() => toggleFilterDialog(true)}>
                    <TuneIcon />
                </IconButton>
            </Toolbar>
            <Grid container item xs={12} alignItems="flex-start" spacing={1} className={classes.flexContainer}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                Categories
                                <Divider />
                            </Typography>
                            <CategoriesGraph
                                width={"100"}
                                height={"100"}
                                data={categoryData}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                Activity
                                <Divider />
                            </Typography>
                            <ActivityGraph 
                                width={"auto"}
                                height={"auto"}
                                data={activityData}
                                xAxisLabel={`Date (${monthName})`}
                                yAxisLabel={`Amount (${currency})`}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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
                filters={state.filters}
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
            />
        </div>
    );
};

export { Statistics };