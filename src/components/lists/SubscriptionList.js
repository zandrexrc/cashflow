import React from 'react';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import {DATE_FORMAT_SHORT_MONTH} from '../../constants';
import {printDate} from '../../utils';
import {ListContainer} from './ListContainer';


const renderRow = (props) => {
  const {data, index, style} = props;
  const subscription = data.items[index];

  return (
    <div
      className="listItem"
      key={index}
      style={style}
      onClick={() => data.openDetailsTab(subscription)}
    >
      <div className="listItemDate">
        <Typography variant="overline">
          {printDate(subscription.nextBillingDate, DATE_FORMAT_SHORT_MONTH)}
        </Typography>
        <Typography variant="h5">
          {new Date(subscription.nextBillingDate).getDate()}
        </Typography>
      </div>
      <Typography
        className="listItemText"
        variant="body1"
      >
        {subscription.name}
      </Typography>
      <Typography
        className={subscription.amount < 0 ? 'neg' : 'pos'}
        variant="body1"
        align="right"
      >
        {
          subscription.amount < 0 ?
          `- ${data.currency} ${Math.abs(subscription.amount).toFixed(2)}` :
          `${data.currency} ${subscription.amount.toFixed(2)}`
        }
      </Typography>
    </div>
  );
};


const SubscriptionList = (props) => {
  return (
    <ListContainer
      currency={props.currency}
      exportData={props.exportData}
      items={props.subscriptions}
      openDetailsTab={props.openDetailsTab}
      openFormTab={props.openFormTab}
      openImportFileDialog={props.openImportFileDialog}
    >
      {renderRow}
    </ListContainer>
  );
};

SubscriptionList.propTypes = {
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
  /** An array of Subscriptions */
  subscriptions: PropTypes.array.isRequired,
};

export {SubscriptionList};
