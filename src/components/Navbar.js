import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    Typography,
} from '@material-ui/core';


// Set up navigation icons and labels
const nav = [
    {
      id: 0,
      name: "Overview",
      icon: <AssignmentIcon />
    },
    {
      id: 1,
      name: "Transactions",
      icon: <CreditCardIcon />
    },
    {
      id: 2,
      name: "Subscriptions",
      icon: <DateRangeIcon />
    },
    {
      id: 3,
      name: "Accounts",
      icon: <AccountBalanceIcon />
    },
    {
      id: 4,
      name: "Statistics",
      icon: <TimelineIcon />
    },
    {
      id: 5,
      name: "Settings",
      icon: <SettingsIcon />
    }
];


// Styles
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: 200,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 200,
    },
    logoWrapper: {
        width: 200,
        paddingTop: 16,
        paddingBottom: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    logoText: {
        marginLeft: 5
    },
    creds: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10
    }
}));


const Navbar = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Typography variant="h6" className={classes.logoWrapper}>
                    <img src="cashflow-logo-white.png" width="24px" alt="cashflow-logo" />
                    <span className={classes.logoText}>Cashflow</span>
                </Typography>
                <List>
                {nav.map((navObj) => (
                    <ListItem  
                        key={navObj.id}
                        button
                        selected={props.activeWindow === navObj.id}
                        onClick={() => props.setActiveWindow(navObj.id)}
                    >
                        <ListItemIcon>{navObj.icon}</ListItemIcon>
                        <ListItemText primary={navObj.name} />
                    </ListItem>
                ))}
                </List>
                <Typography variant="caption" className={classes.creds}>
                    <Link href="http://zandrexrc.me" color="primary">
                        ©2020 zandrexrc.
                    </Link>
                </Typography>
            </Drawer>
        </div>
    );
};

// PropTypes
Navbar.propTypes = {
    activeWindow: PropTypes.number.isRequired,
    setActiveWindow: PropTypes.func.isRequired,
};

export { Navbar };