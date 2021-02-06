# Transactions
Transactions are records of financial expenses or revenues. 

- [The transaction object](#the-transaction-object)
- [Create a transaction](#create-a-transaction)
- [Update a transaction](#update-a-transaction)
- [Delete a transaction](#delete-a-transaction)
- [Retrieve all transactions](#retrieve-all-transactions)
- [Create multiple tranasctions](#create-multiple-transactions)

Below is a list of all relevant endpoints:
| Method | URI                     | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | /api/transactions       | Retrieve all transactions    |
| POST   | /api/transactions       | Create a transaction         |
| PUT    | /api/transactions/:id   | Update a transaction         |
| DELETE | /api/transactions/:id   | Delete a transaction         |
| POST   | /api/transactions-group | Create multiple transactions |


## The transaction object
A transaction is represented as a JavaScript object with the following properties:

| Property      | Type   | Null | Description                            |
| ------------- | ------ | ---- | -------------------------------------- |
| transactionId | number | No   | unique identifier for the transaction  |
| date          | string | No   | the transaction date in ISO format     |
| description   | string | No   | a short description of the transaction |
| accountId     | number | No   | the account used for the transaction   |
| category      | string | Yes  | a label used for grouping transactions |
| amount        | number | No   | the amount of money gained or lost     |

> If a transaction is a financial expense, the amount is a negative number (e.g. -123.45).
> If it is a financial revenue, the amount is positive (e.g. 123.45)


## Create a transaction
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/transactions',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: '2020-07-11',
            description: 'Groceries',
            accountID: 2,
            category: 'Food',
            amount: -246.80
        })
    }
);
```

Response:
```javascript
{
    "transactionId": 1,
    "date": "2020-07-11",
    "description": "Groceries",
    "accountId": 2,
    "category": "Food",
    "amount": -246.8
}
```


## Update a transaction
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/transactions/1',
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: '2020-07-11',
            description: 'Groceries',
            accountId: 2,
            category: null,
            amount: -100.00
        })
    }
);
```

Response:
```javascript
{
    "transactionId": 1,
    "date": "2020-07-11",
    "description": "Groceries",
    "accountId": 2,
    "category": "",
    "amount": -100
}
```

## Delete a transaction
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/transactions/1',
    { method: 'DELETE' }
);
```

Response:
```javascript
{
    "transactionId": 1,
    "deleted": true
}
```


## Retrieve all transactions
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch('/api/transactions');
```

Response:
```javascript
[
    {
        "transactionId": 2,
        "date": "2020-07-10",
        "description": "Sneakers",
        "accountId": 2,
        "category": "Clothing",
        "amount": -799.99
    },
    {
        "transactionId": 3,
        "date": "2020-07-10",
        "description": "PS4 DualShock controller",
        "accountId": 2,
        "category": "Gaming",
        "amount": -599.99
    },
    {
        "transactionId": 4,
        "date": "2020-07-11",
        "description": "Ramen for next weekend",
        "accountId": 4,
        "category": "Food",
        "amount": 100
    }
]
```


## Create multiple transactions
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/transactions-group',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify([
            {
                date: '2020-07-12',
                description: 'Lunch',
                accountID: 1,
                category: 'Food',
                amount: -79.9
            },
            {
                date: '2020-07-12',
                description: 'Dinner',
                accountID: 1,
                category: 'Food',
                amount: -149.9
            },
        ])
    }
);
```

Response:
```javascript
[
    {
        "transactionId": 5,
        "date": "2020-07-12",
        "description": "Lunch",
        "accountId": 1,
        "category": "Food",
        "amount": -79.9
    },
    {
        "transactionId": 6,
        "date": "2020-07-12",
        "description": "Dinner",
        "accountId": 1,
        "category": "Food",
        "amount": -149.9
    }
]
```


[fetch-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
