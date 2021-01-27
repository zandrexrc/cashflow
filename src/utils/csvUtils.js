import papa from 'papaparse';
import { getAccountNames, getAccountIds } from './accountUtils';


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
    a.href = URL.createObjectURL(blob, { type: 'text/plain' });
    a.download = title;

    // Programatically click the link to start download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


/**
 * Processes a list of accounts into a CSV string.
 * @param {Array<Account>} accounts: a list of account objects
 * @return {string}: the accounts in a csv format
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
 * @return {string}: the subscriptions in a csv format
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
 * @return {string}: the transactions in a csv format
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
 * Generates a sample csv file.
 * @param {string} type: the type of data ('account' | 'subscription' | 'transaction') 
 * @return {string}: a csv file
 */
function generateSampleCsv(type) {
    let data = [];

    switch (type) {
        case 'account':
            data = [{
                name: 'Personal',
                type: 'Checking',
                balance: 4200.42
            }];
            break
        case 'subscription':
            data = [{
                name: 'Netflix',
                firstBillingDate: '2020-07-11',
                cycle: 'monthly',
                account: 'Personal',
                category: 'Entertainment',
                amount: -89,
            }];
            break
        case 'transaction':
            data = [{
                date: '2020-07-11',
                description: 'Lunch with Alice and Bob',
                account: 'Personal',
                category: 'Food',
                amount: -99.99
            }];
            break
        default:
            data = [];
    }

    // Convert data to csv
    const csv = papa.unparse(data);
    const blob = new Blob([csv]);
    return URL.createObjectURL(blob, { type: 'text/csv' });
}


/**
 * Processes a list of transactions into a CSV string.
 * @param {File} csv: a list of transaction objects
 * @return {string}: the transactions in a csv format
 */
function csvToTransactions(csv) {
    const accountIds = getAccountIds();

    // Parse file
    let rowCount = 1;
    let parsedTransactions = [];
    let errors = [];
    papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        worker: true,
        step: function (result, parser) {
            rowCount += 1;
            // Validate row
            if (result.errors.length > 0) {
                parser.abort();
            }
            console.log(result.data);
            console.log(rowCount);
        },
        complete: function () {
            console.log('Parsing complete!', rowCount);
        }
    });
}


export {
    accountsToCsv,
    subscriptionsToCsv,
    transactionsToCsv,
    generateSampleCsv,
    csvToTransactions,
};