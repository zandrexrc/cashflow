import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, editSubscription, deleteSubscription } from '../redux/actions/subscriptions';
import { showDialog, hideDialog } from '../redux/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import { SubscriptionDetails } from '../components/details/SubscriptionDetails';
import { SubscriptionForm } from '../components/forms/SubscriptionForm';
import { SubscriptionList } from '../components/lists/SubscriptionList';
import { SubscriptionStatistics } from '../components/statistics/SubscriptionStatistics';
import { createSubscriptionsGraphData, filterSubscriptions } from '../utils';


 // Styles
 const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        minWidth: '100%',
        maxWidth: '100%',
    }
});


const Subscriptions = () => {
    // Fetch items from Redux store
    const dispatch = useDispatch();
    const currency = useSelector(state => state.settings.currency);
    const dateFormat = useSelector(state => state.settings.dateFormat);
    const subscriptions = useSelector(state => state.subscriptions);

    // Local state
    const initialFilters = {
        account: 'All',
        category: 'All',
        date: {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        }
    };

    const [state, setState] = React.useState({
        filters: initialFilters,
        detailsTabIsOpen: false,
        formTabIsOpen: false,
        selectedSubscription: null,
        chartScope: 'monthly'
    });

    const displayedSubscriptions = filterSubscriptions(subscriptions, state.filters);
    const chartData = createSubscriptionsGraphData(displayedSubscriptions, state.chartScope);

    // Manage state
    const setFilters = newFilters => {
        setState({ ...state, filters: newFilters });
    };

    const openDetailsTab = subscription => {
        setState({ ...state, detailsTabIsOpen: true, selectedSubscription: subscription });
    };

    const closeDetailsTab = () => {
        setState({ ...state, detailsTabIsOpen: false, selectedSubscription: null });
    };

    const toggleFormTab = () => {
        setState({ ...state, formTabIsOpen: !state.formTabIsOpen });
    };

    const setChartScope = (scope) => {
        setState({ ...state, chartScope: scope });
    } 

    // Manage data
    const addData = newData => {
        dispatch(addSubscription(newData));
        setState({ ...state, filters: initialFilters, formTabIsOpen: false });
    }

    const editData = newData => {
        dispatch(editSubscription(newData.subscriptionID, newData));
        setState({ ...state, selectedSubscription: newData, formTabIsOpen: false });
    }

    const deleteData = () => {
        dispatch(deleteSubscription(state.selectedSubscription.subscriptionID));
        dispatch(hideDialog());
        closeDetailsTab();
    }

    const alertDelete = () => {
        dispatch(showDialog('Delete subscription?', deleteData));
    }
    
    // Apply styles
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <SubscriptionStatistics
                chartData={chartData}
                chartScope={state.chartScope}
                filters={state.filters}
                setChartScope={setChartScope}
                setFilters={setFilters}
            />
            <SubscriptionList
                currency={currency}
                openDetailsTab={openDetailsTab}
                openFormTab={toggleFormTab}
                subscriptions={displayedSubscriptions}
            />
            <SubscriptionDetails
                close={closeDetailsTab}
                currency={currency}
                dateFormat={dateFormat}
                deleteItem={alertDelete}
                isOpen={state.detailsTabIsOpen}
                openFormTab={toggleFormTab}
                subscription={state.selectedSubscription}
            />
            <SubscriptionForm
                close={toggleFormTab}
                isOpen={state.formTabIsOpen}
                submit={state.selectedSubscription ? editData : addData}
                subscription={state.selectedSubscription}
            />
        </div>
    );
};

export { Subscriptions };