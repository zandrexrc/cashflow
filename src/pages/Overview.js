import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveWindow } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ActivityGraph } from '../components/ActivityGraph';
import { TitleCard, GraphCard, TextCard } from '../components/OverviewCards';
import { 
    printMonthName,
    calcMostUsedAccounts,
    calcNetIncome,
    calcMonthlySubscriptions,
    createActivityGraphData
 } from '../utils';


 // Styles
 const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 'calc(100% - 40px)',
        padding: '15px 20px 20px 20px',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    }
}));


const Overview = () => {
    const today = new Date();

    // Fetch items from Redux store
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const transactions = useSelector((state) => state.transactions.filter(t => {
        return (
            parseInt(t.date.substring(5, 7)) === today.getMonth()+1 &&
            parseInt(t.date.substring(0, 4)) === today.getFullYear()
        );
    }));
    const subscriptions = useSelector((state) => state.subscriptions.filter(s => 
            s.cycle === "monthly" ||
            parseInt(s.firstBillingDate.substring(5, 7)) === today.getMonth()+1
    ));
    const currency = useSelector((state) => state.settings.currency);

    // Card values
    const accountsData = calcMostUsedAccounts(accounts, transactions);
    const transactionsData = calcNetIncome(transactions);
    const subscriptionsData = calcMonthlySubscriptions(subscriptions);
    const activityData = createActivityGraphData(transactions, today.getMonth(), today.getFullYear());

    // Apply styles
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} alignItems="flex-start" spacing={1}>
                    <Grid item xs={4}>
                        {/* Title */}
                        <TitleCard
                            className={classes.titleCard}
                            title={printMonthName(today)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {/* Accounts */}
                        <TextCard
                            title={"Accounts"}
                            action={() => dispatch(setActiveWindow(3))}
                            data={accountsData.map((account) => (
                                {
                                    label: account.name,
                                    value: `${currency} ${account.balance.toFixed(2)}`
                                }
                            ))}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {/* Subscriptions */}
                        <TextCard 
                            title={"Subscriptions"}
                            action={() => dispatch(setActiveWindow(2))}
                            data={[
                                {
                                    label: "Remaining expenses for this month", 
                                    value: `${currency} ${subscriptionsData.remainingExpenses.toFixed(2)}`
                                },
                                {
                                    label: "Total expenses for this month", 
                                    value: `${currency} ${subscriptionsData.totalExpenses.toFixed(2)}`
                                }
                            ]}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} alignItems="flex-start" spacing={1}>
                    <Grid item xs={4}>
                        {/* Transactions */}
                        <TextCard 
                            title={"Transactions"}
                            action={() => dispatch(setActiveWindow(1))}
                            data={[
                                {
                                    label: "Income", 
                                    value: `${currency} ${transactionsData.totalIncome.toFixed(2)}`
                                },
                                {
                                    label: "Expenses", 
                                    value: `${currency} ${transactionsData.totalExpenses.toFixed(2)}`
                                },
                                {
                                    label: "Net income", 
                                    value: `${currency} ${transactionsData.netIncome.toFixed(2)}`
                                }
                            ]}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        {/* Activities */}
                        <GraphCard
                            title={"Activity"}
                            action={() => dispatch(setActiveWindow(4))}
                        >
                            <ActivityGraph 
                                width={"auto"} 
                                height={"100"}
                                data={activityData}
                                xAxisLabel={`Date (${printMonthName(today)})`}
                                yAxisLabel={`Amount (${currency})`} 
                            />
                        </GraphCard>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export { Overview };