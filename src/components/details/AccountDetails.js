import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Paper, Slide, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: 'calc(50%)',
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
            }
        },
    }
}));


const AccountDetails = props => {
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
                    props.account &&
                    <div className="details">
                        <Typography variant="body1" align="right" color="textSecondary">
                            {props.account.type}
                        </Typography>
                        <Typography variant="h5">
                            {props.account.name}
                        </Typography>
                        <Typography 
                            variant="h3"
                            className={props.account.balance < 0 ? "neg" : "pos"}
                        >
                            {
                                props.account.balance < 0
                                ? `- ${props.currency} ${Math.abs(props.account.balance).toFixed(2)}`
                                : `${props.currency} ${props.account.balance.toFixed(2)}`
                            }
                        </Typography>
                    </div>
                }
            </Paper>
        </Slide>
    )
}

// PropTypes
AccountDetails.propTypes = {
    account: PropTypes.object,
    close: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    deleteItem: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    openFormTab: PropTypes.func.isRequired,
};

export { AccountDetails };