import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart } from '../charts/LineChart';
import { MonthYearSelector } from '../inputs/MonthYearSelector';
import { CategorySelector } from '../inputs/CategorySelector';
import { AccountSelector } from '../inputs/AccountSelector';


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        "& .filtersContainer": {
            width: '100%',
            height: '74px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            "& .filter": {
                marginRight: '30px'
            },
            "& .filter:nth-of-type(2)": {
                minWidth: '200px'
            }
        },
        "& .chartContainer": {
            width: '80%',
            height: 'calc(100vh - 138px)',
            display: 'flex',
            alignItems: 'center',
        } 
    }
});


const ActivityStatistics = props => {
    const classes = useStyles();

    const setAccount = account => 
        props.setFilters({ ...props.filters, account: account });

    const setCategory = category => 
        props.setFilters({ ...props.filters, category: category });

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
            <div className="filtersContainer">
                <div className="filter">
                    <MonthYearSelector
                        selectedDate={props.filters.date}
                        setMonth={setMonth}
                        setYear={setYear}
                        enableSelectAll
                    />
                </div>
                <div className="filter">
                    <CategorySelector
                        type='transactions'
                        selectedCategory={props.filters.category}
                        setCategory={setCategory}
                        enableSelectAll
                        showUncategorized
                    />
                </div>
                <div className="filter">
                    <AccountSelector
                        selectedAccount={props.filters.account}
                        setAccount={setAccount}
                        enableSelectAll
                    />
                </div>
            </div>
            <div className="chartContainer">
                <LineChart
                    width="auto"
                    height="auto"
                    data={props.data}
                    xAxisLabel={`Date (${props.filters.date.year})`}
                    yAxisLabel={`Amount (${props.currency})`}
                />
            </div>
        </div>
    )
}

// PropTypes
ActivityStatistics.propTypes = {
    data: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
};

export { ActivityStatistics };