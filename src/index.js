import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';

import {App} from './App';
import {getAccounts} from './redux/actions/accounts';
import {getSettings} from './redux/actions/settings';
import {getSubscriptions} from './redux/actions/subscriptions';
import {getTransactions} from './redux/actions/transactions';
import {setDataIsLoaded} from './redux/actions/ui';
import {store} from './redux/store';
import * as serviceWorker from './serviceWorker';


// Fetch data from the database
async function loadData() {
  await store.dispatch(getSettings());
  await store.dispatch(getAccounts());
  await store.dispatch(getTransactions());
  await store.dispatch(getSubscriptions());
  await store.dispatch(setDataIsLoaded());
}
loadData();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
