# Transactions
Transactions are records of financial expenses or revenues. 

- [The transaction object](#the-transaction-object)
- [Create a transaction](#create-a-transaction)
- [Update a transaction](#update-a-transaction)
- [Delete a transaction](#delete-a-transaction)
- [Retrieve all transactions](#retrieve-all-transactions)

Below is a list of all relevant endpoints:
| Method | URI                  | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | /api/transactions    | Retrieve all transactions |
| POST   | /api/transactions    | Create a transaction      |
| PUT    | /api/transactions/:id | Update a transaction      |
| DELETE | /api/transactions/:id | Delete a transaction      |


# The transaction object
A transaction is represented as a JavaScript object with the following properties:

| Property      | Type   | Null | Description                            |
| ------------- | ------ | ---- | -------------------------------------- |
| transactionID | number | No   | unique identifier for the transaction  |
| date          | string | No   | the transaction date in ISO format     |
| description   | string | No   | a short description of the transaction |
| accountID     | number | No   | the account used for the transaction   |
| category      | string | Yes  | a label used for grouping transactions |
| amount        | number | No   | the amount of money gained or lost     |

> If a transaction is a financial expense, the amount is a negative number (e.g. -123.45).
> If it is a financial revenue, the amount is positive (e.g. 123.45)


# Create a transaction
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
    "transactionID": 1,
    "date": "2020-07-10T22:00:00.000Z",
    "description": "Groceries",
    "accountID": 2,
    "category": "Food",
    "amount": -246.8
}
```


# Update a transaction
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
            accountID: 2,
            category: null,
            amount: -100.00
        })
    }
);
```

Response:
```javascript
{
    "transactionID": 1,
    "date": "2020-07-10T22:00:00.000Z",
    "description": "Groceries",
    "accountID": 2,
    "category": "",
    "amount": -100
}
```

# Delete a transaction
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
    "transactionID": 1,
    "deleted": true
}
```


# Retrieve all transactions
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch('/api/transactions');
```

Response:
```javascript
[
    {
        "transactionID": 2,
        "date": "2020-07-10T22:00:00.000Z",
        "description": "Sneakers",
        "accountID": 2,
        "category": "Clothing",
        "amount": -799.99
    },
    {
        "transactionID": 3,
        "date": "2020-07-10T22:00:00.000Z",
        "description": "PS4 DualShock controller",
        "accountID": 2,
        "category": "Gaming",
        "amount": -599.99
    },
    {
        "transactionID": 4,
        "date": "2020-07-11T22:00:00.000Z",
        "description": "Ramen for next weekend",
        "accountID": 4,
        "category": "Food",
        "amount": 100
    }
]
```


[fetch-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
