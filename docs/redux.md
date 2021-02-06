# Redux
If you're not familiar with Redux, you can learn about the core concepts 
[here](https://redux.js.org/introduction/core-concepts).

- [State](#state)
- [Actions](#actions)


## State
The global state in the Redux store:
| Property      | Type          | Description                                                          |
| ------------- | ------------- | -------------------------------------------------------------------- |
| activePage    | number        | ID of the currently visible page                                     |
| isFetching    | boolean       | *true* if an API fetch request is in progress                        |
| dataIsLoaded  | boolean       | *true* if the initial data are loaded                                |
| error         | string        | Description of the fetch request error (*null* if there is no error) |
| toastState    | Object        | Describes the state of the Toast component                           |
| settings      | Object        | User settings                                                        |
| accounts      | Array<Object> | A list of all accounts                                               |
| transactions  | Array<Object> | A list of all transactions                                           |
| subscriptions | Array<Object> | A list of all subscriptions                                          |

The initial state (before fetching data from the database):
```javascript
{
    activePage: 0,
    isFetching: false,
    dataIsLoaded: false,
    error: null,
    toastState: {
        isOpen: false,
        message: '',
        severity: 'success',
    },
    settings: {
        currency: 'NOK',
        dateFormat: 'dd.MM.yyyy',
        appTheme: 'light'
    },
    accounts: [],
    transactions: [],
    subscriptions: []
}
```

When the app is rendered for the first time, HTTP requests are sent to the 
server to retrieve the accounts, transactions, subscriptions and settings from 
the database. The retrieved items are then loaded into the global state. 
This happens in the *index.js* file in the *src* directory.


## Actions

### Accounts
| Type                  | Payload                                  | Description                                         |
| --------------------- | ---------------------------------------- | --------------------------------------------------- |
| GET_ACCOUNTS          | *(Array<Object>)* A list of accounts     | Dispatched after fetching all accounts              |
| ADD_ACCOUNT           | *(Object)* The newly created account     | Dispatched after creating a new account             |
| EDIT_ACCOUNT          | *(Object)* The updated account           | Dispatched after editing an account                 |
| DELETE_ACCOUNT        | *(number)* The ID of the deleted account | Dispatched after deleting an account                |
| ADD_MULTIPLE_ACCOUNTS | *(Array<Object>)* A list of accounts     | Dispatched after importing accounts from a CSV file |
   
### Settings
| Type          | Payload                         | Description                             |
| ------------- | ------------------------------- | --------------------------------------- |
| GET_SETTINGS  | *(Object)* The saved settings   | Dispatched after fetching the settings  |
| EDIT_SETTINGS | *(Object)* The updated settings | Dispatched after editing the settings   |
   
### Subscriptions
| Type                            | Payload                                       | Description                                     |
| ------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| GET_SUBSCRIPTIONS               | *(Array<Object>)* A list of subscriptions     | Dispatched after fetching all subscriptions     |
| ADD_SUBSCRIPTION                | *(Object)* The newly created subscription     | Dispatched after creating a new subscription    |
| EDIT_SUBSCRIPTION               | *(Object)* The updated subscription           | Dispatched after editing a subscription         |
| DELETE_SUBSCRIPTION             | *(number)* The ID of the deleted subscription | Dispatched after deleting a subscription        |
| DELETE_SUBSCRIPTIONS_IN_ACCOUNT | *(number)* The ID of the deleted account      | Dispatched after deleting an account            |
| ADD_MULTIPLE_SUBSCRIPTIONS      | *(Array<Object>)* A list of subscriptions     | Dispatched after importing data from a CSV file |
   
### Transactions
| Type                           | Payload                                      | Description                                             |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------------- |
| GET_TRANSACTIONS               | *(Array<Object>)* A list of transactions     | Dispatched after fetching all transactions              |
| ADD_TRANSACTION                | *(Object)* The newly created transaction     | Dispatched after creating a new transaction             |
| EDIT_TRANSACTION               | *(Object)* The updated transaction           | Dispatched after editing a transaction                  |
| DELETE_TRANSACTION             | *(number)* The ID of the deleted transaction | Dispatched after deleting a transaction                 |
| DELETE_TRANSACTIONS_IN_ACCOUNT | *(number)* The ID of the deleted account     | Dispatched after deleting an account                    |
| ADD_MULTIPLE_TRANSACTIONS      | *(Array<Object>)* A list of transactions     | Dispatched after importing transactions from a CSV file |
   
### FETCH-related actions
| Type               | Payload                                            | Description                                             |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------- |
| TOGGLE_IS_FETCHING | *(boolean)* TRUE if a fetch request is in progress | Dispatched after sending a fetch request                |
| SET_DATA_IS_LOADED | *(null)* No payload                                | Dispatched after all initial GET requests are completed |
| SET_ERROR          | *(string)* Description of the fetch request error  | Dispatched after encountering an error when fetching    |
   
### UI
| Type              | Payload                                                         | Description                |
| ----------------- | --------------------------------------------------------------- | -------------------------- |
| SET_ACTIVE_PAGE   | *(number)* The ID of the page to be displayed                   | Changes the displayed page |
| SHOW_TOAST        | *(Object)* An object with the message and severity of the Toast | Makes the Toast visible    |
| HIDE_TOAST        | *(null)* No payload                                             | Hides the Toast            |