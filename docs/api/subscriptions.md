# Subscriptions
Subscriptions are financial expenses billed at a regular time interval. 

- [The subscription object](#the-subscription-object)
- [Create a subscription](#create-a-subscription)
- [Update a subscription](#update-a-subscription)
- [Delete a subscription](#delete-a-subscription)
- [Retrieve all subscriptions](#retrieve-all-subscriptions)

Below is a list of all relevant endpoints:
| Method | URI                    | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | /api/subscriptions     | Retrieve all subscriptions |
| POST   | /api/subscriptions     | Create a subscription      |
| PUT    | /api/subscriptions/:id | Update a subscription      |
| DELETE | /api/subscriptions/:id | Delete a subscription      |


# The subscription object
A subscription is represented as a JavaScript object with the following properties:

| Property         | Type   | Null | Description                                        |
| ---------------- | ------ | ---- | -------------------------------------------------- |
| subscriptionID   | number | No   | unique identifier for the subscription             |
| name             | string | No   | the name of the subscription                       |
| firstBillingDate | string | No   | the date the subscription was first billed         |
| cycle            | string | No   | how often the subscription recurs (monthly/yearly) |
| accountID        | number | No   | the account used for the subscription              |
| category         | string | Yes  | a label used for grouping subscriptions            |
| amount           | number | No   | the amount of money charged                        |


# Create a subscription
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/subscriptions',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Rent',
            firstBillingDate: '2020-07-01',
            cycle: 'monthly',
            accountID: 2,
            category: 'necessities',
            amount: -1000.00
        })
    }
);
```

Response:
```javascript
{
    "subscriptionID": 1,
    "name": "Rent",
    "firstBillingDate": "2020-06-30T22:00:00.000Z",
    "cycle": "monthly",
    "accountID": 2,
    "category": "Necessities",
    "amount": -1000
}
```


# Update a subscription
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/subscriptions/1',
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Rent',
            firstBillingDate: '2020-07-07',
            cycle: 'monthly',
            accountID: 2,
            category: 'necessities',
            amount: -5555.55
        })
    }
);
```

Response:
```javascript
{
    "subscriptionID": 1,
    "name": "Rent",
    "firstBillingDate": "2020-07-06T22:00:00.000Z",
    "cycle": "monthly",
    "accountID": 2,
    "category": "Necessities",
    "amount": -5555.55
}
```

# Delete a subscription
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/subscriptions/1',
    { method: 'DELETE' }
);
```

Response:
```javascript
{
    "subscriptionID": 1,
    "deleted": true
}
```


# Retrieve all subscriptions
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch('/api/subscriptions');
```

Response:
```javascript
[
    {
        "subscriptionID": 2,
        "name": "Netflix",
        "firstBillingDate": "2020-07-07T22:00:00.000Z",
        "cycle": "monthly",
        "accountID": 2,
        "category": "Entertainment",
        "amount": -109
    },
    {
        "subscriptionID": 3,
        "name": "Spotify",
        "firstBillingDate": "2020-07-07T22:00:00.000Z",
        "cycle": "monthly",
        "accountID": 2,
        "category": "Entertainment",
        "amount": -89
    }
]
```


[fetch-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
