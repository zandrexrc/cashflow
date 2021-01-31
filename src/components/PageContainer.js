import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Overview } from '../pages/Overview';
import { Transactions } from '../pages/Transactions';
import { Subscriptions } from '../pages/Subscriptions';
import { Accounts } from '../pages/Accounts';
import { Statistics } from '../pages/Statistics';
import { Settings } from '../pages/Settings';
import { Error } from '../pages/Error';
import { loadingLight, loadingDark } from '../assets/images';


// Styles
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    marginLeft: '200px',
    backgroundColor: theme.palette.background.default,
  },
}));


const PageContainer = props => {
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    props.isFetching ?
    <div className={classes.root}>
      <img 
        src={theme.palette.type === 'light' ? loadingLight : loadingDark } 
        alt="loading" 
        width="100px" 
      />
    </div> :
    <div className={classes.root}>
      {
        props.error ?
        <Error error={props.error} /> :
        <>
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
        </>
      }
    </div>
  );
}

// PropTypes
PageContainer.propTypes = {
  activePage: PropTypes.number.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

export { PageContainer };