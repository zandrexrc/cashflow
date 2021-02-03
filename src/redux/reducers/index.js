import { combineReducers } from 'redux';
import { accounts } from './accounts';
import { settings } from './settings';
import { subscriptions } from './subscriptions';
import { transactions } from './transactions';
import { activePage, isFetching, error, dataIsLoaded, toastState } from './ui';

const rootReducer = combineReducers({
    activePage,
    isFetching,
    dataIsLoaded,
    error,
    toastState,
    settings,
    accounts,
    transactions,
    subscriptions,
});

export { rootReducer };