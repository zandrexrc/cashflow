import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { IconButton, Paper, Slide, Typography } from '@material-ui/core';
import { getAccountName, printDate } from '../../utils';


const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        height: '100vh',
        minWidth: '500px',
        maxHeight: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        position: 'absolute',
        right: '0',
        overflow: 'auto',
        "& .header": {
            width: 'calc(100% - 30px)',
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px 0 20px',
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .details": {
            width: 'calc(100% - 80px)',
            height: 'calc(100% - 64px)',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'flex-start',
            margin: '0 auto',
            "& .date": {
                display: 'flex',
                alignItems: 'center',
            },
            "& .pos": {
                color: theme.palette.success.main
            },
            "& .neg": {
                color: theme.palette.error.main
            },
            "& .MuiTypography-body1": {
                margin: '20px 0',
                padding: '10px',
                border: `1px solid ${theme.palette.text.secondary}`
            },
            "& .MuiTypography-h5": {
                minHeight: '1.4em',
                maxHeight: '50%',
                margin: '10px 0',
                overflow: 'auto',
            },
            "& .MuiTypography-h3": {
                fontWeight: 'bold',
            },
            "& .icon": {
                marginRight: '10px'
            },
            "& .tags": {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: `1px solid ${theme.palette.text.secondary}`
            },
            "& .tags:nth-of-type(2)": {
                paddingTop: '0',
                borderTop: 'none'
            }
        },
    }
}));


const SubscriptionDetails = props => {
    const classes = useStyles();

    return (
        <Slide direction="left" in={props.isOpen} mountOnEnter unmountOnExit>
            <Paper className={classes.root} square elevation={10}>
                <div className="header">
                    <IconButton onClick={props.close}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <div className="actions">
                        <IconButton onClick={props.openFormTab}>
                            <EditIcon />
                        </IconButton>
                        <IconButton 
                            onClick={props.deleteItem}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
                {
                    props.subscription &&
                    <div className="details">
                        <Typography className="date" variant="body1" color="textSecondary">
                            <ScheduleIcon className="icon" />
                            {printDate(props.subscription.nextBillingDate, props.dateFormat)}
                        </Typography>
                        <Typography variant="h5">
                            {props.subscription.name}
                        </Typography>
                        <Typography 
                            variant="h3"
                            className={props.subscription.amount < 0 ? "neg" : "pos"}
                        >
                            {
                                props.subscription.amount < 0
                                ? `- ${props.currency} ${Math.abs(props.subscription.amount).toFixed(2)}`
                                : `${props.currency} ${props.subscription.amount.toFixed(2)}`
                            }
                        </Typography>
                        <div className="tags">
                            <div className="tag">
                                <Typography variant="body2" color="textSecondary">
                                    First billing date
                                </Typography>
                                <Typography variant="h6">
                                    {printDate(props.subscription.firstBillingDate, props.dateFormat)}
                                </Typography>
                            </div>
                            <div className="tag">
                                <Typography variant="body2" color="textSecondary">
                                    Billing cycle
                                </Typography>
                                <Typography variant="h6">
                                    {props.subscription.cycle}
                                </Typography>
                            </div>
                        </div>
                        <div className="tags">
                            <div className="tag">
                                <Typography variant="body2" color="textSecondary">
                                    Category
                                </Typography>
                                <Typography variant="h6">
                                    {
                                        props.subscription.category 
                                        ? props.subscription.category 
                                        : "Uncategorized"
                                    }
                                </Typography>
                            </div>
                            <div className="tag">
                                <Typography variant="body2" align="right" color="textSecondary">
                                    Account
                                </Typography>
                                <Typography variant="h6" align="right">
                                    {getAccountName(props.subscription.accountId)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                }
            </Paper>
        </Slide>
    )
}

// PropTypes
SubscriptionDetails.propTypes = {
    close: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    dateFormat: PropTypes.string.isRequired,
    deleteItem: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    openFormTab: PropTypes.func.isRequired,
    subscription: PropTypes.object,
};

export { SubscriptionDetails };