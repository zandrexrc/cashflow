import React from 'react';

import {FormControl, Select, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {MonthNames} from '../../constants';
import {getTransactionYears} from '../../utils';


const useStyles = makeStyles({
  root: {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    'marginTop': '20px',
    '& .MuiFormControl-root': {
      margin: '0 5px 20px 5px',
    },
  },
});


const MonthYearSelector = (props) => {
  const transactions = useSelector((state) => state.transactions);
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
          onChange={(event) => props.setMonth(event.target.value)}
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
          onChange={(event) => props.setYear(event.target.value)}
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
  );
};

MonthYearSelector.propTypes = {
  /** If true, the option to select all months is enabled */
  enableSelectAll: PropTypes.bool,
  /** An object with the following structure:
   * {
   *  month: (number, 0-12),
   *  year: (number)
   * }
   */
  selectedDate: PropTypes.object.isRequired,
  /** Function to change the selected month */
  setMonth: PropTypes.func.isRequired,
  /** Function to change the selected year */
  setYear: PropTypes.func.isRequired,
};

export {MonthYearSelector};
