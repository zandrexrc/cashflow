import { combineReducers } from 'redux';
import { accounts } from './accounts';
import { settings } from './settings';
import { subscriptions } from './subscriptions';
import { transactions } from './transactions';
import { activeWindow, isFetching, error, dataIsLoaded } from './ui';

const rootReducer = combineReducers({
    activeWindow,
    isFetching,
    dataIsLoaded,
    error,
    settings,
    accounts,
    transactions,
    subscriptions,
});

export { rootReducer };