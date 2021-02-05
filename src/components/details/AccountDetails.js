import React from 'react';

import {IconButton, Paper, Slide, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': 'calc(50%)',
    'height': '100vh',
    'minWidth': '500px',
    'maxHeight': '100vh',
    'display': 'flex',
    'flexFlow': 'column nowrap',
    'position': 'absolute',
    'right': '0',
    'overflow': 'auto',
    '& .header': {
      width: 'calc(100% - 30px)',
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 10px 0 20px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .details': {
      'width': 'calc(100% - 80px)',
      'height': 'calc(100% - 64px)',
      'display': 'flex',
      'flexFlow': 'column nowrap',
      'alignItems': 'flex-start',
      'margin': '0 auto',
      '& .pos': {
        color: theme.palette.success.main,
      },
      '& .neg': {
        color: theme.palette.error.main,
      },
      '& .MuiTypography-body1': {
        margin: '20px 0',
        padding: '5px 10px',
        border: `1px solid ${theme.palette.text.secondary}`,
        textTransform: 'uppercase',
      },
      '& .MuiTypography-h5': {
        minHeight: '1.4em',
        maxHeight: '50%',
        margin: '10px 0',
        overflow: 'auto',
      },
      '& .MuiTypography-h3': {
        fontWeight: 'bold',
      },
    },
  },
}));


const AccountDetails = (props) => {
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
              className={props.account.balance < 0 ? 'neg' : 'pos'}
            >
              {
                props.account.balance < 0 ?
                `- ${props.currency} 
                  ${Math.abs(props.account.balance).toFixed(2)}` :
                `${props.currency} ${props.account.balance.toFixed(2)}`
              }
            </Typography>
          </div>
        }
      </Paper>
    </Slide>
  );
};

AccountDetails.propTypes = {
  /** The Account to be displayed */
  account: PropTypes.object,
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function called when deleting the Account */
  deleteItem: PropTypes.func.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to open the corresponding Form for editing the Account */
  openFormTab: PropTypes.func.isRequired,
};

export {AccountDetails};
