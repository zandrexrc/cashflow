# Errors
HTTP response codes are used to indicate the failure or success of an API request:

- **200 - OK**: Everything worked as expected
- **400 - Bad Request**: Something was wrong with the request (e.g. missing a required parameter).

In the event of a request failure, the response also includes the following object:

| Property | Type   | Null | Description                                  |
| -------- | ------ | ---- | -------------------------------------------- |
| error    | string | No   | a short description of the error             |

# Example
An error is returned when trying to update an account using an invalid accountID in the URL:
```javascript
await fetch(
    '/api/accounts/abc',
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
    "error": "Failed to edit the account."
}
```