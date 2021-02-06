import React from 'react';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import PropTypes from 'prop-types';

import {Navigation} from '../constants';


// Set up navigation icons
const navIcons = {
  'Overview': <AssignmentIcon />,
  'Transactions': <CreditCardIcon />,
  'Subscriptions': <DateRangeIcon />,
  'Accounts': <AccountBalanceIcon />,
  'Statistics': <TimelineIcon />,
  'Settings': <SettingsIcon />,
};


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 200,
    '& .logoWrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '200px',
      padding: '16px 0',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    '& .logoText': {
      marginLeft: '5px',
    },
    '& .creds': {
      position: 'absolute',
      left: -1,
      bottom: 0,
      padding: '5px 10px',
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
}));


const Navbar = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.root}
      anchor="left"
      variant="permanent"
    >
      <Typography className="logoWrapper" variant="h6">
        <img src="cashflow-logo-white.png" width="24px" alt="cashflow-logo" />
        <span className="logoText">Cashflow</span>
      </Typography>
      <List>
        {Navigation.map((nav) => (
          <ListItem
            button
            key={nav.id}
            onClick={() => props.setActivePage(nav.id)}
            selected={props.activePage === nav.id}
          >
            <ListItemIcon>{navIcons[nav.name]}</ListItemIcon>
            <ListItemText primary={nav.name} />
          </ListItem>
        ))}
      </List>
      <a href="http://zandrexrc.me" className="creds">©</a>
    </Drawer>
  );
};

Navbar.propTypes = {
  /** ID of the active page */
  activePage: PropTypes.number.isRequired,
  /** Function to change the active page */
  setActivePage: PropTypes.func.isRequired,
};

export {Navbar};
