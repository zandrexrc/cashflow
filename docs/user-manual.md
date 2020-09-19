# User manual
- [Transactions](#transactions)
- [Subscriptions](#subscriptions)
- [Accounts](#accounts)
- [Statistics](#statistics)
- [Settings](#settings)


# Transactions

## Adding a new transaction
To add a new transaction, go to the Transactions page and click the ![add-icon-img][add-icon] button in the upper right corner. Then fill up the form with the transaction details:

| Field        | Description                                          |
| ------------ | ---------------------------------------------------- |
| Date*        | The date of the transaction                          |
| Description* | A short description of the transaction               |
| Account**    | The account used for the transaction                 |
| Category     | A label for categorizing the transaction             |
| Amount***    | The transaction amount (can be positive or negative) |
> *Required fields
> ** If the account you want to choose is not in the menu, you have to create it first in the accounts page.
> *** If the amount is negative, use a minus sign (e.g. -99.99). If it is positive, there is no need to use the plus sign.

After filling up the form, press enter or click the check sign on the left to send it.   
Adding a new transaction will automatically update the account balance.

## Editing a transaction
Click the ![edit-icon-img][edit-icon] button on the transaction you want to edit, then change the details you want to change. Press enter or click the check sign on the left to save the changes.   
Editing a transaction will also automatically update the account balance.

## Deleting a transaction
Click the ![delete-icon-img][delete-icon] button on the transaction you want to delete, then click the check button to confirm the deletion.   
The account balance is updated accordingly.

## Filtering transactions
Click the ![filter-icon-img][filter-icon] button on the upper right corner and then choose which filters to use.   
The statistics on the bottom of the page will change based on the filtered transactions.

## Exporting transactions
To export the table data as CSV or PDF, click on the ![export-icon-img][export-icon] button on the upper right corner.
Only the visible, filtered transactions will be exported.


# Subscriptions

## Adding a new subscription
Go to the Subscriptions page, click the ![add-icon-img][add-icon] button in the upper right corner and fill up the form with the subscription details:

| Field               | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Name*               | The name of the subscription                              |
| First billing date* | The first billing date of the subscription                |
| Cycle*              | The billing cycle of the subscription (monthly or yearly) |
| Account**           | The account used for the subscription                     |
| Category            | A label for categorizing the subscription                 |
| Amount***           | The subscription amount (can be positive or negative)     |
> *Required fields
> ** If the account you want to choose is not in the menu, you have to create it first in the accounts page.
> *** If the amount is negative, use a minus sign (e.g. -99.99). If it is positive, there is no need to use the plus sign.

After filling up the form, press enter or click the check sign on the left to send it.   
The next billing date of the subscription is anchored based on the first billing date and the billing cycle. For example, if the first billing date is March 30 and the cycle is monthly, the next billing date will be April 30.    
If the next billing date falls beyond the scope of the month (e.g. there is no April 31), the date will be set on the last day of the month instead (April 30).

## Editing a subscription
Click the ![edit-icon-img][edit-icon] button on the subscription you want to edit, then change the details you want to change. Press enter or click the check sign on the left to save the changes.

## Deleting a subscription
Click the ![delete-icon-img][delete-icon] button on the subscription you want to delete, then click the check button to confirm the deletion.

## Exporting subscriptions
To save the table data into a CSV or PDF file, click on the ![export-icon-img][export-icon] button on the upper right corner.

## Additional notes
Unlike transactions, the account balance will **not** be automatically updated whenever a subscription approaches its billing date. You will have to create a transaction upon successful payment of a subscription to register it in the system.


# Accounts

## Adding a new account
To add a new account, click the ![add-icon-img][add-icon] button in the upper right corner of the Accounts page, then fill up the form with the account details:

| Field    | Description                                               |
| -------- | --------------------------------------------------------- |
| Name*    | The name of the account                                   |
| Type     | The account type (e.g. checking, savings)                 |
| Amount** | The initial account balance (can be positive or negative) |
> *Required fields
> ** If the amount is negative, use a minus sign (e.g. -99.99). If it is positive, there is no need to use the plus sign.

After filling up the form, press enter or click the check sign on the left to send it.

## Editing an account
Click the ![edit-icon-img][edit-icon] button on the account you want to edit, then change the details you want to change. Press enter or click the check sign on the left to save the changes.

## Deleting an account
Click the ![delete-icon-img][delete-icon] button on the account you want to delete, then click the check button to confirm the deletion.

## Exporting accounts
To export the table data as CSV or PDF, click on the ![export-icon-img][export-icon] button on the upper right corner.


# Statistics

## Charts
There are two charts to help you visualize your transactions:
The **categories chart** shows the number of transactions within each category.   
The **activities chart** shows the income and expenses for each day of the month.

## Choosing the displayed data
On the Statistics page, click the ![filter-icon-img][filter-icon] button on the upper right corner to filter the transactions. The charts and statistics will change based on the filtered transactions.


# Settings

## Changing the settings
Here are the different settings you can customize:
| Setting     | Description                                             |
| ----------- | ------------------------------------------------------- |
| Currency*   | The currency code used in the transactions              |
| Date format | The format in which the dates are displayed             |
| Theme       | Determines the color palette of the app (light or dark) |

**Must be a three-letter ISO currency code (e.g. USD, EUR, NOK).*
Make sure to click on the **apply changes** button to apply and save your preferences.


[add-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAMklEQVRIiWNgGAWjAA38h2KiARONHDJqwSCygBGHOEkpBZ95NPcBqWA0H4xaMApGJAAAJnYFFD1KWWEAAAAASUVORK5CYII=
[edit-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAf0lEQVRIie2TQQqAIBBFX5cLF93BzuGiK7jvjNFWWkRtFERKAidX8+GDIL43ixE0HWKAHfDAIA0fgQBcsau0xGXwVC8BNoCN56UQbBLwAJzAXEhCvG+Gp2lziZOG5xJbefcp5bbkPYBJ4QrvA6cCb/6hKb9N/iYQhZcCcbjmMTdlMWxawdtBpgAAAABJRU5ErkJggg==
[delete-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAcElEQVRIie3VMQ4CIRSE4W+N57DwNHr/2kL0HthYsQvLEkks3iQvJATmZ6aB0A90wQO5mCeue5eXyn4efMzK7zRo9D+qVcTxmja9pld07jjTSslO0ukJAhCAALQB7+9a/gPlwGsEfkfqACTcRgAh8AFeJh0lsree7QAAAABJRU5ErkJggg==
[export-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAnklEQVRIie2UTQ6DIBBGX9zDERrS09STeo1uPEZDar0HLqSRElqwo27kSyYhzM8bCANUbSznrVjNTo1UQAUsMkAHqIRPeZ+RNHBnfvc9oFnmQPs952OKFQ+SAWwAcdHa8nmC7CCmAi7AI/C97QlcC/KLAmJIqrgIEEK+FRcDYL5vI8hf/1vm8g8ftDHqZK0BvH4BW2AQAAbg9sdBz6wJngBWewJRgI8AAAAASUVORK5CYII=
[filter-icon]: https://img.shields.io/badge/%20-%20-white?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEUAAAAAAAD///+D3c/SAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAsSURBVAjXY2DAARgd4BRjaKhjqAOMQpVDYQOVOIaCVYIpVDk0bagq0ZViAADxfgwTOL5V8AAAAABJRU5ErkJggg==