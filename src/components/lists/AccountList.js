import React from 'react';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import {ListContainer} from './ListContainer';


const renderRow = (props) => {
  const {data, index, style} = props;
  const account = data.items[index];

  return (
    <div
      className="listItem"
      key={index}
      style={style}
      onClick={() => data.openDetailsTab(account)}
    >
      <Typography
        className="listItemText"
        variant="body1"
      >
        {account.name}
      </Typography>
      <Typography
        className={account.balance < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {
          account.balance < 0 ?
          `- ${data.currency} ${Math.abs(account.balance).toFixed(2)}` :
          `${data.currency} ${account.balance.toFixed(2)}`
        }
      </Typography>
    </div>
  );
};


const AccountList = (props) => {
  return (
    <ListContainer
      currency={props.currency}
      exportData={props.exportData}
      items={props.accounts}
      openDetailsTab={props.openDetailsTab}
      openFormTab={props.openFormTab}
      openImportFileDialog={props.openImportFileDialog}
    >
      {renderRow}
    </ListContainer>
  );
};

AccountList.propTypes = {
  /** An array of Accounts */
  accounts: PropTypes.array.isRequired,
  /** The currency symbol */
  currency: PropTypes.string.isRequired,
  /** Function to export the list into a CSV file */
  exportData: PropTypes.func.isRequired,
  /** Function to open the Details component for the selected account */
  openDetailsTab: PropTypes.func.isRequired,
  /** Function to open the Form component */
  openFormTab: PropTypes.func.isRequired,
  /** Function to open the component for uploading a file */
  openImportFileDialog: PropTypes.func.isRequired,
};

export {AccountList};
