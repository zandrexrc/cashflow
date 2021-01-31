import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { getTransactionYears } from '../../utils';
import { MonthNames } from '../../constants';


const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        '& .MuiFormControl-root': {
            margin: '0 5px 20px 5px'
        }
    }
});


const MonthYearSelector = props => {
    const transactions = useSelector(state => state.transactions);
    const transactionYears = getTransactionYears(transactions);
    const currentYear = new Date().getFullYear();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl>
                <Select
                    labelId="month-filter-label"
                    id="month-filter"
                    value={props.selectedDate.month}
                    onChange={event => props.setMonth(event.target.value)}
                >
                    {
                        props.enableSelectAll &&
                        <MenuItem value={-1}>All-year</MenuItem>
                    }
                    {
                        MonthNames.map((month, index) => (
                            <MenuItem key={index} value={index}>{month}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl>
                <Select
                    labelId="year-filter-label"
                    id="year-filter"
                    value={props.selectedDate.year}
                    onChange={event => props.setYear(event.target.value)}
                >
                    {
                        !transactionYears.includes(currentYear) &&
                        <MenuItem value={currentYear}>
                            {currentYear}
                        </MenuItem>
                    }
                    {transactionYears.map((year, index) => (
                        <MenuItem key={index} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

// PropTypes
MonthYearSelector.propTypes = {
    enableSelectAll: PropTypes.bool,
    selectedDate: PropTypes.object.isRequired,
    setMonth: PropTypes.func.isRequired,
    setYear: PropTypes.func.isRequired,
};

export { MonthYearSelector };