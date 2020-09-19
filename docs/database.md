# Database
- [ER Diagram](#er-diagram)
- [Tables](#tables)
  - [accounts](#accounts)
  - [transactions](#transactions)
  - [subscriptions](#subscriptions)
  - [settings](#settings)


# ER Diagram
![er-diagram][er-diagram]


# Tables

## accounts
| Field     | Type          | Null | Default | Key | Extra          |
| --------- | ------------- | ---- | ------- | --- | -------------- |
| accountID | int           | NO   | NULL    | PRI | auto_increment |
| name      | varchar(255)  | NO   | NULL    |     |                |
| type      | varchar(255)  | YES  | NULL    |     |                |
| balance   | decimal(10,2) | NO   | NULL    |     |                |

## transactions
| Field         | Type          | Null | Default | Key | Extra          |
| ------------- | ------------- | ---- | ------- | --- | -------------- |
| transactionID | int           | NO   | NULL    | PRI | auto_increment |
| date          | date          | NO   | NULL    |     |                |
| description   | text          | NO   | NULL    |     |                |
| accountID     | int           | NO   | NULL    | MUL |                |
| category      | varchar(255)  | YES  | NULL    |     |                |
| amount        | decimal(10,2) | NO   | NULL    |     |                |

## subscriptions
| Field            | Type          | Null | Default | Key | Extra          |
| ---------------- | ------------- | ---- | ------- | --- | -------------- |
| subscriptionID   | int           | NO   | NULL    | PRI | auto_increment |
| name             | varchar(255)  | NO   | NULL    |     |                |
| firstBillingDate | date          | NO   | NULL    |     |                |
| cycle            | varchar(255)  | NO   | NULL    |     |                |
| accountID        | int           | NO   | NULL    | MUL |                |
| category         | varchar(255)  | YES  | NULL    |     |                |
| amount           | decimal(10,2) | NO   | NULL    |     |                |

## settings
| Field        | Type | Null | Default | Key | Extra          |
| ------------ | ---- | ---- | ------- | --- | -------------- |
| userID       | int  | NO   | NULL    | PRI | auto_increment |
| userSettings | text | NO   | NULL    |     |                |

**userSettings is a stringified JSON object:*
```javascript
'{"currency":"NOK","dateFormat":"DD.MM.YYYY","appTheme":"light"}'
```


[er-diagram]: https://i.imgur.com/Oy6yMng.png