import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { PieChart } from '../charts/PieChart';
import { MonthYearSelector } from '../inputs/MonthYearSelector';
import { AccountSelector } from '../inputs/AccountSelector';


const useStyles = makeStyles(theme => ({
    root: {
        width: 'calc(50% - 1px)',
        height: 'calc(100vh - 64px)',
        minWidth: '500px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        backgroundColor: theme.palette.background.default,
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
            "& .income": {
                color: theme.palette.primary.main
            },
            "& .expenses": {
                color: theme.palette.error.main
            },
            "& .net": {
                color: theme.palette.text.primary
            }
        },
        "& .filters": {
            width: '50%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
    }
}));


const CategoryStatistics = props => {
    const classes = useStyles();

    const setAccount = account => 
        props.setFilters({ ...props.filters, account: account });

    const setMonth = month => 
        props.setFilters({ 
            ...props.filters, 
            date: { ...props.filters.date, month: month } 
        });

    const setYear = year => 
        props.setFilters({ 
            ...props.filters, 
            date: { ...props.filters.date, year: year }
        });

    return (
        <div className={classes.root}>
            <MonthYearSelector
                selectedDate={props.filters.date}
                setMonth={setMonth}
                setYear={setYear}
                enableSelectAll
            />
            <PieChart
                width="auto"
                height="auto"
                data={props.data}
                type="pie"
            />
            <div className="statsContainer">
                {
                    props.stats.map((data, index) => (
                        <div className="stats" key={index}>
                            <Typography 
                                variant="overline" 
                                color="textSecondary"
                                align="center"
                            >
                                {data.label}
                            </Typography>
                            <Typography 
                                className={data.label}
                                variant="body1"
                                align="center"
                            >
                                {data.value.toFixed(2)}
                            </Typography>
                        </div>
                    ))
                }
            </div>
            <AccountSelector
                selectedAccount={props.filters.account}
                setAccount={setAccount}
                enableSelectAll
            />
        </div>
    )
}

// PropTypes
CategoryStatistics.propTypes = {
    data: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    stats: PropTypes.array.isRequired,
};

export { CategoryStatistics };