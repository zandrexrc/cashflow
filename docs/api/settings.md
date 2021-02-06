# Settings
User preferences for the app. 

- [The settings object](#the-settings-object)
- [Retrieve settings](#retrieve-settings)
- [Update settings](#update-settings)

Below is a list of all relevant endpoints:
| Method | URI           | Description       |
| ------ | ------------- | ----------------- |
| GET    | /api/settings | Retrieve settings |
| PUT    | /api/settings | Update settings   |


## The settings object
The settings is represented as a JavaScript object with the following properties:

| Property   | Type   | Null | Description                                       |
| ---------- | ------ | ---- | ------------------------------------------------- |
| currency   | string | No   | a currency symbol or code (max three characters)  |
| dateFormat | string | No   | the format in which dates are displayed           |
| appTheme   | string | No   | the appearance theme of the app (light/dark)      |


## Retrieve settings
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch('/api/settings');
```

Response:
```javascript
{
    "currency": "NOK",
    "dateFormat": "dd.MM.yyyy",
    "appTheme": "light"
}
```


## Update settings
Request using [Fetch API][fetch-api-url] :
```javascript
const response = await fetch(
    '/api/settings',
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            currency: '$',
            dateFormat: 'MM-dd-yyyy',
            appTheme: 'dark'
        })
    }
);
```

Response:
```javascript
{
    "currency": "$",
    "dateFormat": "MM-dd-yyyy",
    "appTheme": "dark"
}
```


[fetch-api-url]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[iso-link]: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
