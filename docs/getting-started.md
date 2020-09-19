# Getting started
- [Requirements](#requirements)
- [Installation guide](#installation-guide)
- [Using the app for the first time](#using-the-app-for-the-first-time)
- [Uninstallation guide](#uninstallation-guide)


## Requirements
- NodeJS
- MySQL


## Installation guide
1. Download or clone the repo.

2. Log in to MySQL and create the database for the app:
```sql
CREATE SCHEMA cashflow;
```
> In this example, we named the database as 'cashflow'. You can name it whatever you want, but remember to use the name you chose when doing the rest of the tutorial.

3. Create the tables by running the *tables.sql* file located in the *src/server* directory.   
If you are using the MySQL command line client, you can use the commands:
```sql
USE cashflow;
source C:/PATH_TO/cashflow/src/server/tables.sql;
```

4. Create a *config.js* file in the *server* directory to set up your database configurations. Copy and follow the template used in *config-template.js*.   
*config.js* example:
```javascript
const config = {
    db: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'cashflow'
    },
    port: 8080
};

module.exports = config;
```

5. Change the proxy in *packages.json* located in the root directory of the app to match your port:
```javascript
...
"proxy": "http://localhost:8080",
...
```

6. Navigate to the root directory of the app and install all dependencies by running `npm install`.

7. Run the app with `npm start`.


## Using the app for the first time
When running the app for the first time, you will be greeted with the Overview page:
![app-screenshot](https://i.imgur.com/hB7qeqJ.png)
> If you're not seeing this, something must have gone wrong when installing the app. 
> [Uninstall](#uninstallation-guide) the app and repeat the installation process.

### Set up an account
The first thing you'll need to do is add an account. 
Go to the Accounts page and click the + icon in the upper right corner to add a new account.   
![add-account](https://i.imgur.com/duBridY.png)

Fill out the form with the [account name, type and current balance](https://github.com/zandrexrc/cashflow/blob/master/docs/user-manual.md#accounts). Press enter or click the check button on the left to submit the form.
Now you can [add transactions and subscriptions](https://github.com/zandrexrc/cashflow/blob/master/docs/user-manual.md#transactions) using the account you've just made.

### Change the settings
In the Settings page, you can [customize the app settings](https://github.com/zandrexrc/cashflow/blob/master/docs/user-manual.md#settings) to suit your own preferences.


## Uninstallation guide
1. Delete the database by logging into MySQL and running the command:
```sql
DROP SCHEMA cashflow ;
```
2. Delete the root folder of the app.
