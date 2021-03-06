import React from 'react';

import {IconButton, Paper, Slide, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import {getAccountName, printDate} from '../../utils';


const useStyles = makeStyles((theme) => ({
  root: {
    'width': '50%',
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
        padding: '10px',
        border: `1px solid ${theme.palette.text.secondary}`,
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
      '& .icon': {
        marginRight: '10px',
      },
      '& .tags': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: `1px solid ${theme.palette.text.secondary}`,
      },
    },
  },
}));


const TransactionDetails = (props) => {
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
          props.transaction &&
          <div className="details">
            <Typography variant="body1" align="right" color="textSecondary">
              {printDate(props.transaction.date, props.dateFormat)}
            </Typography>
            <Typography variant="h5">
              {props.transaction.description}
            </Typography>
            <Typography
              variant="h3"
              className={props.transaction.amount < 0 ? 'neg' : 'pos'}
            >
              {
                props.transaction.amount < 0 ?
                `- ${props.currency} 
                  ${Math.abs(props.transaction.amount).toFixed(2)}` :
                `${props.currency} ${props.transaction.amount.toFixed(2)}`
              }
            </Typography>
            <div className="tags">
              <div className="tag">
                <Typography variant="body2" color="textSecondary">
                  Category
                </Typography>
                <Typography variant="h6">
                  {
                    props.transaction.category ?
                    props.transaction.category :
                    'Uncategorized'
                  }
                </Typography>
              </div>
              <div className="tag">
                <Typography variant="body2" align="right" color="textSecondary">
                  Account
                </Typography>
                <Typography variant="h6" align="right">
                  {getAccountName(props.transaction.accountId)}
                </Typography>
              </div>
            </div>
          </div>
        }
      </Paper>
    </Slide>
  );
};

TransactionDetails.propTypes = {
  /** Function to close the component */
  close: PropTypes.func.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** A valid date-fns format for displaying the date */
  dateFormat: PropTypes.string.isRequired,
  /** Function called when deleting the Transaction */
  deleteItem: PropTypes.func.isRequired,
  /** If true, the component is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to open the corresponding Form for editing the Transaction */
  openFormTab: PropTypes.func.isRequired,
  /** The Transasction to be displayed */
  transaction: PropTypes.object,
};

export {TransactionDetails};
