# User manual
- [Transactions](#transactions)
- [Subscriptions](#subscriptions)
- [Accounts](#accounts)
- [Statistics](#statistics)
- [Settings](#settings)


## Transactions

### Adding a new transaction
To add a new transaction, go to the Transactions page and click the 
![add-icon-img][add-icon] button in the upper right corner. 
Then fill up the form with the transaction details:

| Field        | Description                                          |
| ------------ | ---------------------------------------------------- |
| Date*        | The date of the transaction                          |
| Description* | A short description of the transaction               |
| Account**    | The account used for the transaction                 |
| Category     | A label for categorizing the transaction             |
| Amount***    | The transaction amount (can be positive or negative) |
> *Required fields   
> ** If the account you want to choose is not in the menu, you have to create 
> it first in the accounts page.   
> *** If the amount is negative, use a minus sign (e.g. -99.99). 
> If it is positive, there is no need to use the plus sign.

After filling up the form, press enter or click the check sign at the top to 
submit it.   
__Adding a new transaction will automatically update the account balance.__

### Editing a transaction
Click on an item on the list, then click the ![edit-icon-img][edit-icon] 
button on the upper right corner. 
Press enter or click the check sign at the top to save the changes.   
__Editing a transaction will also automatically update the account balance.__

### Deleting a transaction
Click on an item on the list, then click the ![delete-icon-img][delete-icon] 
button on the upper right corner.   
__The account balance is updated accordingly.__

### Exporting transactions
To export the list into a CSV file, click on the ![more-icon-img][more-icon] 
button at the top of the list, then choose _download as CSV_.   
__Only the transactions displayed on the list will be exported.__

### Importing transactions
To import data from a CSV file, click on the ![more-icon-img][more-icon] 
button at the top of the list, choose _import from CSV_, and upload your file.   
__Make sure that your CSV file is valid by following the displayed instructions.__


## Subscriptions

### Adding a new subscription
Go to the Subscriptions page, click the ![add-icon-img][add-icon] button in the 
upper right corner and fill up the form with the subscription details:

| Field               | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Name*               | The name of the subscription                              |
| First billing date* | The first billing date of the subscription                |
| Cycle*              | The billing cycle of the subscription (monthly or yearly) |
| Account**           | The account used for the subscription                     |
| Category            | A label for categorizing the subscription                 |
| Amount***           | The subscription amount (can be positive or negative)     |
> *Required fields   
> ** If the account you want to choose is not in the menu, you have to create 
> it first in the accounts page.   
> *** If the amount is negative, use a minus sign (e.g. -99.99). 
> If it is positive, there is no need to use the plus sign.   

After filling up the form, press enter or click the check sign at the top to 
submit it.

### Editing a subscription
Click on an item on the list, then click the ![edit-icon-img][edit-icon] 
button on the upper right corner. 
Press enter or click the check sign at the top to save the changes.

### Deleting a subscription
Click on an item on the list, then click the ![delete-icon-img][delete-icon] 
button on the upper right corner.

### Exporting subscriptions
To export the list into a CSV file, click on the ![more-icon-img][more-icon] 
button at the top of the list, then choose _download as CSV_.   
__Only the subscriptions displayed on the list will be exported.__

### Importing subscriptions
To import data from a CSV file, click on the ![more-icon-img][more-icon] 
button at the top of the list, choose _import from CSV_, and upload your file.   
__Make sure that your CSV file is valid by following the displayed instructions.__

### Additional notes
- The next billing date of the subscription is anchored based on the first 
billing date and the billing cycle. For example, if the first billing date is 
March 30 and the cycle is monthly, the next billing date will be April 30.   
If the next billing date falls beyond the scope of the month (e.g. there is no 
April 31), the date will be set on the last day of the month instead (April 30).
- Unlike transactions, the account balance will __not__ be automatically 
updated whenever a subscription approaches its billing date. You will have to 
create a transaction upon successful payment of a subscription to register it 
in the system.


## Accounts

### Adding a new account
Go to the Accounts page, click the ![add-icon-img][add-icon] button in the 
upper right corner and fill up the form with the account details:

| Field    | Description                                               |
| -------- | --------------------------------------------------------- |
| Name*    | The name of the account                                   |
| Type*    | The account type (e.g. checking, savings)                 |
| Amount** | The initial account balance (can be positive or negative) |
> *Required fields   
> ** If the amount is negative, use a minus sign (e.g. -99.99). 
> If it is positive, there is no need to use the plus sign.

After filling up the form, press enter or click the check sign at the top to 
submit it.

### Editing an account
Click on an item on the list, then click the ![edit-icon-img][edit-icon] 
button on the upper right corner. 
Press enter or click the check sign at the top to save the changes.

### Deleting an account
Click on an item on the list, then click the ![delete-icon-img][delete-icon] 
button on the upper right corner.

### Exporting accounts
To export the list into a CSV file, click on the ![more-icon-img][more-icon] 
button at the top of the list, then choose _download as CSV_.

### Importing accounts
To import data from a CSV file, click on the ![more-icon-img][more-icon] 
button at the top of the list, choose _import from CSV_, and upload your file.   
__Make sure that your CSV file is valid by following the displayed instructions.__


## Statistics

### Charts
There are two charts to help you visualize your transactions:
The __categories chart__ shows the transactions within each category.   
The __activities chart__ shows the income and expenses for each day of the 
month, or each month of the year.

### Choosing the displayed data
On the __categories__ tab, you can change the date and account filters on the 
left side of the list.   
On the __activities__ tab, the filters are on the upper right side of the chart.


## Settings

### Changing the settings
Here are the different settings you can customize:
| Setting     | Description                                             |
| ----------- | ------------------------------------------------------- |
| Currency*   | The currency symbol used in the transactions            |
| Date format | The format in which the dates are displayed             |
| Theme       | Determines the color palette of the app (light or dark) |

**Can be a symbol ($, €, kr) or a three-letter currency code (USD, EUR, NOK).*   
Make sure to click on the __apply changes__ button to save your preferences.


[add-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAMklEQVRIiWNgGAWjAA38h2KiARONHDJqwSCygBGHOEkpBZ95NPcBqWA0H4xaMApGJAAAJnYFFD1KWWEAAAAASUVORK5CYII=
[edit-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAf0lEQVRIie2TQQqAIBBFX5cLF93BzuGiK7jvjNFWWkRtFERKAidX8+GDIL43ixE0HWKAHfDAIA0fgQBcsau0xGXwVC8BNoCN56UQbBLwAJzAXEhCvG+Gp2lziZOG5xJbefcp5bbkPYBJ4QrvA6cCb/6hKb9N/iYQhZcCcbjmMTdlMWxawdtBpgAAAABJRU5ErkJggg==
[delete-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAcElEQVRIie3VMQ4CIRSE4W+N57DwNHr/2kL0HthYsQvLEkks3iQvJATmZ6aB0A90wQO5mCeue5eXyn4efMzK7zRo9D+qVcTxmja9pld07jjTSslO0ukJAhCAALQB7+9a/gPlwGsEfkfqACTcRgAh8AFeJh0lsree7QAAAABJRU5ErkJggg==
[more-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAASElEQVRIiWNgGAVDCXgxMDA8hmJPWljwmIGB4T8UPyJWExMtXEIu8GSAuPwRAwODxwC7ZZCC0VREEIymIoJgNBURBKOpaIgCAFT/GVrGxzfNAAAAAElFTkSuQmCC