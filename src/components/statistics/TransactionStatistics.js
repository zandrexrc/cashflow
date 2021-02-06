import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {BarChart} from '../charts/BarChart';
import {AccountSelector} from '../inputs/AccountSelector';
import {CategorySelector} from '../inputs/CategorySelector';
import {MonthYearSelector} from '../inputs/MonthYearSelector';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50% - 1px)',
    'height': '100vh',
    'minWidth': '500px',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRight': `1px solid ${theme.palette.divider}`,
    'position': 'relative',
    '& .header': {
      width: 'calc(100% - 20px)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'absolute',
      top: 0,
    },
    '& .contents': {
      'width': '100%',
      'height': 'calc(100% - 64px)',
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'justifyContent': 'center',
      'alignItems': 'center',
      '& .statsContainer': {
        'width': '100%',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'marginBottom': '20px',
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
      '& .divider': {
        height: '1px',
        width: '50%',
        backgroundColor: theme.palette.divider,
        margin: '0 auto',
      },
    },
  },
}));


const TransactionStatistics = (props) => {
  const classes = useStyles();
  const [income, expenses] = props.chartData.datasets[0].data;
  const netIncome = income - expenses;

  const setAccount = (account) =>
    props.setFilters({...props.filters, account: account});

  const setCategory = (category) =>
    props.setFilters({...props.filters, category: category});

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
      <div className="header">
        <Typography variant="h6" color="textPrimary">
          Transactions
        </Typography>
      </div>
      <div className="contents">
        <MonthYearSelector
          selectedDate={props.filters.date}
          setMonth={setMonth}
          setYear={setYear}
          enableSelectAll
        />
        <BarChart
          width='auto'
          height='auto'
          data={props.chartData}
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
              Net income
            </Typography>
            <Typography
              className="net"
              variant="body1"
              align="center"
            >
              {netIncome.toFixed(2)}
            </Typography>
          </div>
        </div>
        <div className="divider"></div>
        <div className="filters">
          <CategorySelector
            type='transactions'
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
  );
};

TransactionStatistics.propTypes = {
  /** The data to be displayed in the chart
   * (refer to utils/graphUtils.js) */
  chartData: PropTypes.object.isRequired,
  /** A Filter object */
  filters: PropTypes.object.isRequired,
  /** Function to change the filters */
  setFilters: PropTypes.func.isRequired,
};

export {TransactionStatistics};
