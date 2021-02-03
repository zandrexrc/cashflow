import papa from 'papaparse';
import { getAccountNames, getAccountIds, validateAccount } from './accountUtils';
import { validateSubscription } from './subscriptionUtils';
import { validateTransaction } from './transactionUtils';


/**
 * Generates a csv file from an array of objects.
 * @param {Array<Transaction|Subscription|Account>} data: an array of objects
 * @return {string}: a csv file
 */
function generateSampleCsv(data) {
    const csv = papa.unparse(data);
    const blob = new Blob([csv]);
    return URL.createObjectURL(blob, { type: 'text/csv' });
}


/**
 * Exports a csv string into a file
 * @param {string} csv: A csv string
 * @param {string} title: The title of the file
 * @return {null}
 */
function exportCsv(csv, title) {
    // Convert string into a blob
    const blob = new Blob([csv]);

    // Create a download link
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob, { type: 'text/csv' });
    a.download = title;

    // Programatically click the link to start download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


/**
 * Processes a list of accounts into a CSV string.
 * @param {Array<Account>} accounts: a list of account objects
 * @return {null}: a csv file is automatically downloaded
 */
function accountsToCsv(accounts) {
    // Remove the accountId
    const preProcessedAccounts = [];
    for(let i = 0; i < accounts.length; i++) {
        preProcessedAccounts.push({
            name: accounts[i].name,
            type: accounts[i].type,
            balance: accounts[i].balance
        });
    }

    // Convert pre-processed accounts to csv
    const csv = papa.unparse(preProcessedAccounts);
    exportCsv(csv, 'accounts.csv');
}


/**
 * Processes a list of subscriptions into a CSV string.
 * @param {Array<Subscription>} subscriptions: a list of subscription objects
 * @return {null}: a csv file is automatically downloaded
 */
function subscriptionsToCsv(subscriptions) {
    const accountNames = getAccountNames();

    // Remove the subscriptionId and replace the accountId with account name
    const preProcessedSubscriptions = [];
    for(let i = 0; i < subscriptions.length; i++) {
        preProcessedSubscriptions.push({
            name: subscriptions[i].name,
            firstBillingDate: subscriptions[i].firstBillingDate,
            cycle: subscriptions[i].cycle,
            account: accountNames[subscriptions[i].accountId],
            category: subscriptions[i].category,
            amount: subscriptions[i].amount,
        });
    }

    // Convert pre-processed subscriptions to csv
    const csv = papa.unparse(preProcessedSubscriptions);
    exportCsv(csv, 'subscriptions.csv');
}


/**
 * Processes a list of transactions into a CSV string.
 * @param {Array<Transaction>} transactions: a list of transaction objects
 * @return {null}: a csv file is automatically downloaded
 */
function transactionsToCsv(transactions) {
    const accountNames = getAccountNames();

    // Remove the transactionId and replace the accountId with account name
    const preProcessedTransactions = [];
    for(let i = 0; i < transactions.length; i++) {
        preProcessedTransactions.push({
            date: transactions[i].date,
            description: transactions[i].description,
            account: accountNames[transactions[i].accountId],
            category: transactions[i].category,
            amount: transactions[i].amount
        });
    }

    // Convert pre-processed transactions to csv
    const csv = papa.unparse(preProcessedTransactions);
    exportCsv(csv, 'transactions.csv');
}


/**
 * Parses account objects from a csv file.
 * @param {File} csv: the csv file to parse
 * @param {function} submitData: a callback function for submitting the parsed data
 * @return {null}: results are passed in a callback function
 */
function csvToAccounts(csv, submitData) {
    const accountIds = getAccountIds();

    // Parse file
    let rowCount = 1;
    let parsedAccounts = [];
    let error;
    papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        worker: true,
        step: function (result, parser) {
            rowCount += 1;
            let account = result.data;

            // Abort early if there are parsing errors
            if (result.errors.length > 0) {
                error = `Error in row ${rowCount}: Parsing error.`;
                parser.abort();
                return;
            }

            // Validate data
            if (account.name && accountIds[account.name]) {
                error = `Error in row ${rowCount}: An account with the same name already exists.`;
                parser.abort();
                return;
            }

            const isValid = validateAccount(account);
            if (isValid) {
                parsedAccounts.push(account);
            } else {
                error = `Error in row ${rowCount}: Invalid account details.`;
                parser.abort();
                return;
            }
        },
        complete: function () {
            submitData(error, parsedAccounts);
        }
    });
}


/**
 * Parses subscription objects from a csv file.
 * @param {File} csv: the csv file to parse
 * @param {function} submitData: a callback function for submitting the parsed data
 * @return {null}: results are passed in a callback function
 */
function csvToSubscriptions(csv, submitData) {
    const accountIds = getAccountIds();

    // Parse file
    let rowCount = 1;
    let parsedSubscriptions = [];
    let error;
    papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        worker: true,
        step: function (result, parser) {
            rowCount += 1;
            let subscription = result.data;

            // Abort early if there are parsing errors
            if (result.errors.length > 0) {
                error = `Error in row ${rowCount}: Parsing error.`;
                parser.abort();
                return;
            }

            // Validate data
            if (accountIds[subscription.account]) {
                subscription.accountId = accountIds[subscription.account];
            } else {
                error = `Error in row ${rowCount}: Invalid account name.`;
                parser.abort();
                return;
            }

            const isValid = validateSubscription(subscription);
            if (isValid) {
                parsedSubscriptions.push(subscription);
            } else {
                error = `Error in row ${rowCount}: Invalid subscription details.`;
                parser.abort();
                return;
            }
        },
        complete: function () {
            submitData(error, parsedSubscriptions);
        }
    });
}


/**
 * Parses transaction objects from a csv file.
 * @param {File} csv: the csv file to parse
 * @param {function} submitData: a callback function for submitting the parsed data
 * @return {null}: results are passed in a callback function
 */
function csvToTransactions(csv, submitData) {
    const accountIds = getAccountIds();

    // Parse file
    let rowCount = 1;
    let parsedTransactions = [];
    let error = '';
    papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        worker: true,
        step: function (result, parser) {
            rowCount += 1;
            let transaction = result.data;

            // Abort early if there are parsing errors
            if (result.errors.length > 0) {
                error = `Error in row ${rowCount}: Parsing error.`;
                parser.abort();
                return;
            }

            // Validate data
            if (accountIds[transaction.account]) {
                transaction.accountId = accountIds[transaction.account];
            } else {
                error = `Error in row ${rowCount}: Invalid account name.`;
                parser.abort();
                return;
            }

            const isValid = validateTransaction(transaction);
            if (isValid) {
                parsedTransactions.push(transaction);
            } else {
                error = `Error in row ${rowCount}: Invalid transaction details.`;
                parser.abort();
                return;
            }
        },
        complete: function () {
            submitData(error, parsedTransactions);
        }
    });
}


export {
    generateSampleCsv,
    accountsToCsv,
    subscriptionsToCsv,
    transactionsToCsv,
    csvToAccounts,
    csvToSubscriptions,
    csvToTransactions,
};