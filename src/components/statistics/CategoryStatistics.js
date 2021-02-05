import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {PieChart} from '../charts/PieChart';
import {AccountSelector} from '../inputs/AccountSelector';
import {MonthYearSelector} from '../inputs/MonthYearSelector';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50% - 1px)',
    'height': 'calc(100vh - 64px)',
    'minWidth': '500px',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRight': `1px solid ${theme.palette.divider}`,
    'position': 'relative',
    'backgroundColor': theme.palette.background.default,
    '& .statsContainer': {
      'width': '100%',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'margin': '20px 0',
      '& .stats': {
        margin: '0px 10px',
        textTransform: 'uppercase',
      },
      '& .income': {
        color: theme.palette.primary.main,
      },
      '& .expenses': {
        color: theme.palette.error.main,
      },
      '& .net': {
        color: theme.palette.text.primary,
      },
    },
    '& .filters': {
      width: '50%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
  },
}));


const CategoryStatistics = (props) => {
  const classes = useStyles();

  const setAccount = (account) =>
    props.setFilters({...props.filters, account: account});

  const setMonth = (month) =>
    props.setFilters({
      ...props.filters,
      date: {...props.filters.date, month: month},
    });

  const setYear = (year) =>
    props.setFilters({
      ...props.filters,
      date: {...props.filters.date, year: year},
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
  );
};

CategoryStatistics.propTypes = {
  /** The data to be displayed in the chart
   * (refer to utils/graphUtils.js) */
  data: PropTypes.object.isRequired,
  /** A Filter object */
  filters: PropTypes.object.isRequired,
  /** Function to change the filters */
  setFilters: PropTypes.func.isRequired,
  /** An array of objects with the following structure:
   * { label: (string), value: (string | number) }*/
  stats: PropTypes.array.isRequired,
};

export {CategoryStatistics};
