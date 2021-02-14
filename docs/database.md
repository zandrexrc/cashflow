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
- [Additional notes](#additional-notes)


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

## Additional notes
- The SQL code for initiating the tables and triggers can be found in 
*src/server/database/init.sql*.
- There is also a set of sample data for populating the tables in 
*src/server/database/sample.sql*.

### About the database files

There are two database files located in _src/database_. Initially, both of them
are empty (tables are already defined, but no rows).  
We're going to be saving data in the _cashflow.db_ database file,
while _cashflow-empty.db_ will remain empty so we can use it to reset our data 
if needed.  
It may also be helpful to add the _cashflow.db_ file to _.gitignore_ to prevent 
git from tracking it, as it can easily grow in size.


[er-diagram]: https://i.imgur.com/WUIx2iH.png