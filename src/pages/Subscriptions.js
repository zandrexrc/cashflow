import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';

import {ConfirmationDialog} from '../components/alerts/ConfirmationDialog';
import {SubscriptionDetails} from '../components/details/SubscriptionDetails';
import {SubscriptionForm} from '../components/forms/SubscriptionForm';
import {ImportFileDialog} from '../components/inputs/ImportFileDialog';
import {SubscriptionList} from '../components/lists/SubscriptionList';
import {
  SubscriptionStatistics,
} from '../components/statistics/SubscriptionStatistics';
import {SampleSubscription} from '../constants';
import {
  addSubscription,
  editSubscription,
  deleteSubscription,
  addMultipleSubscriptions,
} from '../redux/actions/subscriptions';
import {setError} from '../redux/actions/ui';
import {
  createSubscriptionsGraphData,
  csvToSubscriptions,
  filterSubscriptions,
  generateSampleCsv,
  subscriptionsToCsv,
} from '../utils';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    minWidth: '100%',
    maxWidth: '100%',
  },
});

const initialFilters = {
  account: 'All',
  category: 'All',
  date: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
};

const Subscriptions = () => {
  const classes = useStyles();

  // Local state
  const [filters, setFilters] = React.useState(initialFilters);
  const [selectedSubscription, setSelectedSubscription] = React.useState(null);
  const [ui, setUi] = React.useState({
    chartScope: 'monthly',
    confirmationDialogIsOpen: false,
    detailsTabIsOpen: false,
    formTabIsOpen: false,
    importFileDialogIsOpen: false,
  });

  // Fetch items from Redux store
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.settings.currency);
  const dateFormat = useSelector((state) => state.settings.dateFormat);
  const subscriptions = useSelector((state) => state.subscriptions);
  const displayedSubscriptions = filterSubscriptions(subscriptions, filters);
  const chartData = createSubscriptionsGraphData(
      displayedSubscriptions, ui.chartScope,
  );
  const sampleFile = generateSampleCsv(
      [SampleSubscription, SampleSubscription],
  );

  // Manage state
  const openDetailsTab = (subscription) => {
    setSelectedSubscription(subscription);
    setUi({...ui, detailsTabIsOpen: true});
  };

  const closeDetailsTab = () => {
    setSelectedSubscription(null);
    setUi({...ui, detailsTabIsOpen: false});
  };

  const toggleFormTab = () => {
    setUi({...ui, formTabIsOpen: !ui.formTabIsOpen});
  };

  const toggleConfirmationDialog = () => {
    setUi({...ui, confirmationDialogIsOpen: !ui.confirmationDialogIsOpen});
  };

  const toggleImportFileDialog = () => {
    setUi({...ui, importFileDialogIsOpen: !ui.importFileDialogIsOpen});
  };

  const setChartScope = (scope) => {
    setUi({...ui, chartScope: scope});
  };

  // Manage data
  const addData = (newData) => {
    dispatch(addSubscription(newData));
    setFilters(initialFilters);
    toggleFormTab();
  };

  const editData = (newData) => {
    dispatch(editSubscription(newData.subscriptionId, newData));
    setSelectedSubscription(newData);
    toggleFormTab();
  };

  const deleteData = () => {
    dispatch(deleteSubscription(selectedSubscription.subscriptionId));
    toggleConfirmationDialog();
    closeDetailsTab();
  };

  const exportData = () => {
    subscriptionsToCsv(displayedSubscriptions);
  };

  const importData = (file) => {
    csvToSubscriptions(file, (error, result) => {
      if (error) {
        dispatch(setError(error));
      } else {
        dispatch(addMultipleSubscriptions(result));
      }
    });
  };

  return (
    <div className={classes.root}>
      <SubscriptionStatistics
        chartData={chartData}
        chartScope={ui.chartScope}
        filters={filters}
        setChartScope={setChartScope}
        setFilters={setFilters}
      />
      <SubscriptionList
        currency={currency}
        exportData={exportData}
        openDetailsTab={openDetailsTab}
        openFormTab={toggleFormTab}
        openImportFileDialog={toggleImportFileDialog}
        subscriptions={displayedSubscriptions}
      />
      <SubscriptionDetails
        close={closeDetailsTab}
        currency={currency}
        dateFormat={dateFormat}
        deleteItem={toggleConfirmationDialog}
        isOpen={ui.detailsTabIsOpen}
        openFormTab={toggleFormTab}
        subscription={selectedSubscription}
      />
      <SubscriptionForm
        close={toggleFormTab}
        currency={currency}
        isOpen={ui.formTabIsOpen}
        submit={selectedSubscription ? editData : addData}
        subscription={selectedSubscription}
      />
      <ConfirmationDialog
        cancel={toggleConfirmationDialog}
        confirm={deleteData}
        isOpen={ui.confirmationDialogIsOpen}
        title="Delete subscription?"
      />
      <ImportFileDialog
        cancel={toggleImportFileDialog}
        importData={importData}
        isOpen={ui.importFileDialogIsOpen}
        sampleFile={sampleFile}
      />
    </div>
  );
};

export {Subscriptions};
