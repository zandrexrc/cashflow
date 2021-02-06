# Database
The DBMS used in the app is __sqlite__ 
([sqlite3 for Node.js](https://www.npmjs.com/package/sqlite3)). 
All data is stored in a database file named *cashflow.db* which is located in 
*src/server/database*.

- [ER Diagram](#er-diagram)
- [Tables](#tables)
  - [accounts](#accounts)
  - [subscriptions](#subscriptions)
  - [transactions](#transactions)
  - [settings](#settings)


## ER Diagram
![er-diagram][er-diagram]


## Tables

### accounts
| Field     | Type    | Null | Default | Extra         |
| --------- | ------- | ---- | ------- | ------------- |
| accountId | INTEGER | NO   | NULL    | AUTOINCREMENT |
| name      | TEXT    | NO   | NULL    |               |
| type      | TEXT    | NO   | NULL    |               |
| balance   | REAL    | NO   | NULL    |               |
PRIMARY KEY: __accountId__

### subscriptions
| Field            | Type    | Null | Default | Extra         |
| ---------------- | ------- | ---- | ------- | ------------- |
| subscriptionId   | INTEGER | NO   | NULL    | AUTOINCREMENT |
| name             | TEXT    | NO   | NULL    |               |
| firstBillingDate | TEXT    | NO   | NULL    |               |
| cycle            | TEXT    | NO   | NULL    |               |
| category         | TEXT    | YES  | NULL    |               |
| amount           | REAL    | NO   | NULL    |               |
| accountId        | INTEGER | NO   | NULL    |               |
PRIMARY KEY: __subscriptionId__   
FOREIGN KEY: __accountId__ *(references accounts.accountId)*

### transactions
| Field         | Type    | Null | Default | Extra         |
| ------------- | ------- | ---- | ------- | ------------- |
| transactionId | INTEGER | NO   | NULL    | AUTOINCREMENT |
| date          | TEXT    | NO   | NULL    |               |
| description   | TEXT    | NO   | NULL    |               |
| category      | TEXT    | YES  | NULL    |               |
| amount        | REAL    | NO   | NULL    |               |
| accountId     | INTEGER | NO   | NULL    |               |
PRIMARY KEY: __transactionId__   
FOREIGN KEY: __accountId__ *(references accounts.accountId)*

### settings
| Field        | Type    | Null | Default | Extra         |
| ------------ | ------- | ---- | ------- | ------------- |
| userId       | INTEGER | NO   | NULL    | AUTOINCREMENT |
| userSettings | TEXT    | NO   | NULL    |               |
PRIMARY KEY: __userId__   
*Notes:   
*userSettings is a stringified JSON object:*
```javascript
'{"currency":"NOK","dateFormat":"dd.MM.yyyy","appTheme":"light"}'
```


[er-diagram]: https://i.imgur.com/WUIx2iH.png