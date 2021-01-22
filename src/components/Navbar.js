import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';


// Set up navigation icons and labels
const nav = [
    {
      id: 0,
      name: 'Overview',
      icon: <AssignmentIcon />
    },
    {
      id: 1,
      name: 'Transactions',
      icon: <CreditCardIcon />
    },
    {
      id: 2,
      name: 'Subscriptions',
      icon: <DateRangeIcon />
    },
    {
      id: 3,
      name: 'Accounts',
      icon: <AccountBalanceIcon />
    },
    {
      id: 4,
      name: 'Statistics',
      icon: <TimelineIcon />
    },
    {
      id: 5,
      name: 'Settings',
      icon: <SettingsIcon />
    }
];


const useStyles = makeStyles(theme => ({
    root: {
        width: 200,
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
        }
    },
}));


const Navbar = props => {
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
                {nav.map((navObj) => (
                    <ListItem  
                        button
                        key={navObj.id}
                        onClick={() => props.setActivePage(navObj.id)}
                        selected={props.activePage === navObj.id}
                    >
                        <ListItemIcon>{navObj.icon}</ListItemIcon>
                        <ListItemText primary={navObj.name} />
                    </ListItem>
                ))}
            </List>
            <a href="http://zandrexrc.me" className="creds">©</a>
        </Drawer>
    );
};

// PropTypes
Navbar.propTypes = {
    activePage: PropTypes.number.isRequired,
    setActivePage: PropTypes.func.isRequired,
};

export { Navbar };