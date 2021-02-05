import React from 'react';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {loadingLight, loadingDark} from '../assets/images';
import {Accounts} from '../pages/Accounts';
import {ErrorPage} from '../pages/ErrorPage';
import {Overview} from '../pages/Overview';
import {Settings} from '../pages/Settings';
import {Statistics} from '../pages/Statistics';
import {Subscriptions} from '../pages/Subscriptions';
import {Transactions} from '../pages/Transactions';


const useStyles = makeStyles((theme) => ({
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


const PageContainer = (props) => {
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
        <ErrorPage error={props.error} /> :
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
};

PageContainer.propTypes = {
  /** ID of the active page */
  activePage: PropTypes.number.isRequired,
  /** Error message (if any) */
  error: PropTypes.string,
  /** true if the app is currently executing a FETCH request */
  isFetching: PropTypes.bool.isRequired,
};

export {PageContainer};
