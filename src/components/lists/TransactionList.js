import React from 'react';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import {DATE_FORMAT_SHORT_MONTH} from '../../constants';
import {printDate} from '../../utils';
import {ListContainer} from './ListContainer';


const renderRow = (props) => {
  const {data, index, style} = props;
  const transaction = data.items[index];

  return (
    <div
      className="listItem"
      key={index}
      style={style}
      onClick={() => data.openDetailsTab(transaction)}
    >
      <div className="listItemDate">
        <Typography variant="overline">
          {printDate(transaction.date, DATE_FORMAT_SHORT_MONTH)}
        </Typography>
        <Typography variant="h5">
          {new Date(transaction.date).getDate()}
        </Typography>
      </div>
      <Typography
        className="listItemText"
        variant="body1"
      >
        {transaction.description}
      </Typography>
      <Typography
        className={transaction.amount < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {
          transaction.amount < 0 ?
          `- ${data.currency} ${Math.abs(transaction.amount).toFixed(2)}` :
          `${data.currency} ${transaction.amount.toFixed(2)}`
        }
      </Typography>
    </div>
  );
};


const TransactionList = (props) => {
  return (
    <ListContainer
      currency={props.currency}
      exportData={props.exportData}
      items={props.transactions}
      openDetailsTab={props.openDetailsTab}
      openFormTab={props.openFormTab}
      openImportFileDialog={props.openImportFileDialog}
    >
      {renderRow}
    </ListContainer>
  );
};

TransactionList.propTypes = {
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function to export the list into a CSV file */
  exportData: PropTypes.func.isRequired,
  /** Function to open the Details component for the selected subscription */
  openDetailsTab: PropTypes.func.isRequired,
  /** Function to open the Form component */
  openFormTab: PropTypes.func.isRequired,
  /** Function to open the component for uploading a file */
  openImportFileDialog: PropTypes.func.isRequired,
  /** An array of Transactions */
  transactions: PropTypes.array.isRequired,
};

export {TransactionList};
