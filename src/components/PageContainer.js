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


// The pages to be loaded
const pages = [
  <Overview />,
  <Transactions />,
  <Subscriptions />,
  <Accounts />,
  <Statistics />,
  <Settings />
];


// Styles
const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 200
  },
  tabPanel: {
      maxWidth: '100%',
      minWidth: '100%',
      height: '100vh',
  },
  content: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      margin: 0,
      padding: 0
  }
}));


const PageContainer = props => {
  const classes = useStyles();
  
  return (
    props.error ?
    <div className={classes.root}>
      <div className={classes.content}>
        <Error error={props.error} />
      </div>
    </div> :
    <div className={classes.root}>
      <div className={classes.content}>
        { pages[props.activeWindow] }
      </div>
    </div>
  );
}

// PropTypes
PageContainer.propTypes = {
  activeWindow: PropTypes.number.isRequired,
  error: PropTypes.string,
};

export { PageContainer };