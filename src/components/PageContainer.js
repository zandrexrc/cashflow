import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Overview } from '../pages/Overview';
import { Transactions } from '../pages/Transactions';
import { Subscriptions } from '../pages/Subscriptions';
import { Accounts } from '../pages/Accounts';
import { Statistics } from '../pages/Statistics';
import { Settings } from '../pages/Settings';
import { Error } from '../pages/Error';


// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    marginLeft: '200px',
    "& .content": {
      position: 'relative',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.background.default,
    },
  },
}));


const PageContainer = props => {
  const classes = useStyles();
  
  return (
    props.error ?
    <div className={classes.root}>
      <div className="content">
        <Error error={props.error} />
      </div>
    </div> :
    <div className={classes.root}>
      <div className="content">
        {
          props.activePage === 0 &&
          <Overview />
        }
        {
          props.activePage === 1 &&
          <Transactions />
        }
        {
          props.activePage === 2 &&
          <Subscriptions />
        }
        {
          props.activePage === 3 &&
          <Accounts />
        }
        {
          props.activePage === 4 &&
          <Statistics />
        }
        {
          props.activePage === 5 &&
          <Settings />
        }
      </div>
    </div>
  );
}

// PropTypes
PageContainer.propTypes = {
  activePage: PropTypes.number.isRequired,
  error: PropTypes.string,
};

export { PageContainer };