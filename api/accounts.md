---
title: api/accounts
layout: page
---

# Accounts
Transactions and subscriptions are billed to accounts. 
The user is required to have at least one account in order to register 
transactions and subscriptions.

- [The account object](#the-account-object)
- [Create an account](#create-an-account)
- [Update an account](#update-an-account)
- [Delete an account](#delete-an-account)
- [Retrieve all accounts](#retrieve-all-accounts)
- [Create multiple accounts](#create-multiple-accounts)

Below is a list of all relevant endpoints:
| Method | URI                 | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | /api/accounts       | Retrieve all accounts    |
| POST   | /api/accounts       | Create an account        |
| PUT    | /api/accounts/:id   | Update an account        |
| DELETE | /api/accounts/:id   | Delete an account        |
| POST   | /api/accounts-group | Create multiple accounts |


## The account object
An account is represented as a JavaScript object with the following properties:

| Property  | Type   | Null | Description                           |
| --------- | ------ | ---- | ------------------------------------- |
| accountId | number | No   | unique identifier for the account     |
| name      | string | No   | the name of the account               |
| type      | string | Yes  | account type (e.g. checking, savings) |
| balance   | number | No   | the amount of money in the account    |


## Create an account
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/accounts',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Main',
            type: 'Checking',
            balance: 9999.99
        })
    }
);
```

Response:
```javascript
{
    "accountId": 1,
    "name": "Main",
    "type": "Checking",
    "balance": 9999.99
}
```


## Update an account
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/accounts/1',
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Main',
            type: 'Checking',
            balance: 7777.00
        })
    }
);
```

Response:
```javascript
{
    "accountId": 1,
    "name": "Main",
    "type": "Checking",
    "balance": 7777
}
```

## Delete an account
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/accounts/1',
    { method: 'DELETE' }
);
```

Response:
```javascript
{
    "accountId": 1,
    "deleted": true
}
```


## Retrieve all accounts
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch('/api/accounts');
```

Response:
```javascript
[
    {
        "accountId": 2,
        "name": "Personal",
        "type": "Checking",
        "balance": -420.42
    },
    {
        "accountId": 3,
        "name": "Savings",
        "type": "Savings",
        "balance": 10000
    },
    {
        "accountId": 4,
        "name": "Ramen fund",
        "type": "Savings",
        "balance": 5555.55
    }
]
```


## Create multiple accounts
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/accounts-group',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify([
            {
                name: 'Main',
                type: 'Checking',
                balance: 9999.99
            },
            {
                name: 'Work',
                type: 'Checking',
                balance: 77777.77
            },
        ])
    }
);
```

Response:
```javascript
[
    {
        "accountId": 5,
        "name": "Main",
        "type": "Checking",
        "balance": 9999.99
    },
    {
        "accountId": 6,
        "name": "Work",
        "type": "Checking",
        "balance": 77777.77
    }
]
```


[fetch-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
