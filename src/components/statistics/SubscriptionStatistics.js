import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { PieChart } from '../charts/PieChart';
import { CategorySelector } from '../inputs/CategorySelector';
import { AccountSelector } from '../inputs/AccountSelector';


const useStyles = makeStyles(theme => ({
    root: {
        width: 'calc(50% - 1px)',
        height: '100vh',
        minWidth: '500px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        "& .header": {
            width: 'calc(100% - 20px)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '20px',
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'absolute',
            top: 0
        },
        "& .contents": {
            width: '100%',
            height: 'calc(100% - 64px)',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            "& .buttons": {
                marginBottom: '20px',
            },
            "& .statsContainer": {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0',
                "& .stats": {
                    margin: '0px 10px',
                    textTransform: 'uppercase'
                },
                "& .paid": {
                    color: theme.palette.primary.main
                },
                "& .remaining": {
                    color: theme.palette.error.main
                },
                "& .total": {
                    color: theme.palette.text.primary
                }
            },
            "& .filters": {
                width: '50%',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
            },
            "& .divider": {
                height: '1px',
                width: '50%',
                backgroundColor: theme.palette.divider,
                margin: '0 auto'
            }
        }
    }
}));


const SubscriptionStatistics = props => {
    const setAccount = account => 
        props.setFilters({ ...props.filters, account: account });

    const setCategory = category => 
        props.setFilters({ ...props.filters, category: category });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="header">
                <Typography variant="h6" color="textPrimary">
                    Subscriptions
                </Typography>
            </div>
            <div className="contents">
                <div className="buttons">
                    <Button 
                        disableElevation
                        disableRipple
                        variant={props.chartScope === "monthly" ? "contained" : "outlined"}
                        onClick={() => props.setChartScope('monthly')}
                    >
                        Month
                    </Button>
                    <Button 
                        disableElevation
                        disableRipple
                        variant={props.chartScope === "yearly" ? "contained" : "outlined"}
                        onClick={() => props.setChartScope('yearly')}
                    >
                        Year
                    </Button>
                </div>
                <PieChart
                    width="auto"
                    height="auto"
                    data={props.chartData}
                    type="doughnut"
                />
                <div className="statsContainer">
                    {
                        props.chartData.datasets[0].data.map((value, index) => (
                            <div className="stats" key={index}>
                                <Typography 
                                    variant="overline" 
                                    color="textSecondary"
                                    align="center"
                                >
                                    {props.chartData.labels[index]}
                                </Typography>
                                <Typography 
                                    className={props.chartData.labels[index]}
                                    variant="body1"
                                    align="center"
                                >
                                    {value.toFixed(2)}
                                </Typography>
                            </div>
                        ))
                    }
                    <div className="stats">
                        <Typography 
                            variant="overline" 
                            color="textSecondary"
                            align="center"
                        >
                            Total
                        </Typography>
                        <Typography 
                            className="total"
                            variant="body1"
                            align="center"
                        >
                            {props.chartData.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(2)}
                        </Typography>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="filters">
                    <CategorySelector
                        type='subscriptions'
                        selectedCategory={props.filters.category}
                        setCategory={setCategory}
                        enableSelectAll
                        showUncategorized
                    />
                    <AccountSelector
                        selectedAccount={props.filters.account}
                        setAccount={setAccount}
                        enableSelectAll
                    />
                </div>
            </div>
        </div>
    )
}

// PropTypes
SubscriptionStatistics.propTypes = {
    chartData: PropTypes.object.isRequired,
    chartScope: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    setChartScope: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
};

export { SubscriptionStatistics };