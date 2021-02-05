import papa from 'papaparse';

import {getAccountNames, getAccountIds, validateAccount} from './accountUtils';
import {validateSubscription} from './subscriptionUtils';
import {validateTransaction} from './transactionUtils';


/**
 * Generates a csv file from an array of objects.
 * @param {Array<Transaction|Subscription|Account>} data: an array of objects
 * @return {string}: a csv file
 */
function generateSampleCsv(data) {
  const csv = papa.unparse(data);
  const blob = new Blob([csv]);
  return URL.createObjectURL(blob, {type: 'text/csv'});
}


/**
 * Exports a csv string into a file
 * @param {string} csv: A csv string
 * @param {string} title: The title of the file
 */
function exportCsv(csv, title) {
  // Convert string into a blob
  const blob = new Blob([csv]);

  // Create a download link
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob, {type: 'text/csv'});
  a.download = title;

  // Programatically click the link to start download
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


/**
 * Processes a list of accounts into a CSV string.
 * @param {Array<Account>} accounts: a list of account objects
 */
function accountsToCsv(accounts) {
  // Remove the accountId
  const preProcessedAccounts = [];
  for (let i = 0; i < accounts.length; i++) {
    preProcessedAccounts.push({
      name: accounts[i].name,
      type: accounts[i].type,
      balance: accounts[i].balance,
    });
  }

  // Convert pre-processed accounts to csv
  const csv = papa.unparse(preProcessedAccounts);
  exportCsv(csv, 'accounts.csv');
}


/**
 * Processes a list of subscriptions into a CSV string.
 * @param {Array<Subscription>} subscriptions: a list of subscription objects
 */
function subscriptionsToCsv(subscriptions) {
  const accountNames = getAccountNames();

  // Remove the subscriptionId and replace the accountId with account name
  const preProcessedSubscriptions = [];
  for (let i = 0; i < subscriptions.length; i++) {
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
 */
function transactionsToCsv(transactions) {
  const accountNames = getAccountNames();

  // Remove the transactionId and replace the accountId with account name
  const preProcessedTransactions = [];
  for (let i = 0; i < transactions.length; i++) {
    preProcessedTransactions.push({
      date: transactions[i].date,
      description: transactions[i].description,
      account: accountNames[transactions[i].accountId],
      category: transactions[i].category,
      amount: transactions[i].amount,
    });
  }

  // Convert pre-processed transactions to csv
  const csv = papa.unparse(preProcessedTransactions);
  exportCsv(csv, 'transactions.csv');
}


/**
 * Parses account objects from a csv file.
 * @param {File} csv: the csv file to parse
 * @param {function} submitData: callback function for submitting parsed data
 */
function csvToAccounts(csv, submitData) {
  const accountIds = getAccountIds();

  // Parse file
  let rowCount = 1;
  const parsedAccounts = [];
  let error;
  papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    worker: true,
    step: function(result, parser) {
      rowCount += 1;
      const account = result.data;

      // Abort early if there are parsing errors
      if (result.errors.length > 0) {
        error = 'Parsing error.';
        parser.abort();
        return;
      }

      // Validate data
      if (account.name && accountIds[account.name]) {
        error = 'An account with the same name already exists.';
        parser.abort();
        return;
      }

      const isValid = validateAccount(account);
      if (isValid) {
        parsedAccounts.push(account);
      } else {
        error = 'Invalid account details.';
        parser.abort();
        return;
      }
    },
    complete: function() {
      const fullErrorMessage = error ?
        `An error occured while parsing the file. (Row ${rowCount}: ${error})` :
        '';
      submitData(fullErrorMessage, parsedAccounts);
    },
  });
}


/**
 * Parses subscription objects from a csv file.
 * @param {File} csv: the csv file to parse
 * @param {function} submitData: callback function for submitting parsed data
 */
function csvToSubscriptions(csv, submitData) {
  const accountIds = getAccountIds();

  // Parse file
  let rowCount = 1;
  const parsedSubscriptions = [];
  let error;
  papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    worker: true,
    step: function(result, parser) {
      rowCount += 1;
      const subscription = result.data;

      // Abort early if there are parsing errors
      if (result.errors.length > 0) {
        error = 'Parsing error.';
        parser.abort();
        return;
      }

      // Validate data
      if (accountIds[subscription.account]) {
        subscription.accountId = accountIds[subscription.account];
      } else {
        error = 'Invalid account name.';
        parser.abort();
        return;
      }

      const isValid = validateSubscription(subscription);
      if (isValid) {
        parsedSubscriptions.push(subscription);
      } else {
        error = 'Invalid subscription details.';
        parser.abort();
        return;
      }
    },
    complete: function() {
      const fullErrorMessage = error ?
        `An error occured while parsing the file. (Row ${rowCount}: ${error})` :
        '';
      submitData(fullErrorMessage, parsedSubscriptions);
    },
  });
}


/**
 * Parses transaction objects from a csv file.
 * @param {File} csv: the csv file to parse
 * @param {function} submitData: callback function for submitting parsed data
 */
function csvToTransactions(csv, submitData) {
  const accountIds = getAccountIds();

  // Parse file
  let rowCount = 1;
  const parsedTransactions = [];
  let error = '';
  papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    worker: true,
    step: function(result, parser) {
      rowCount += 1;
      const transaction = result.data;

      // Abort early if there are parsing errors
      if (result.errors.length > 0) {
        error = 'Parsing error.';
        parser.abort();
        return;
      }

      // Validate data
      if (accountIds[transaction.account]) {
        transaction.accountId = accountIds[transaction.account];
      } else {
        error = 'Invalid account name.';
        parser.abort();
        return;
      }

      const isValid = validateTransaction(transaction);
      if (isValid) {
        parsedTransactions.push(transaction);
      } else {
        error = 'Invalid transaction details.';
        parser.abort();
        return;
      }
    },
    complete: function() {
      const fullErrorMessage = error ?
        `An error occured while parsing the file. (Row ${rowCount}: ${error})` :
        '';
      submitData(fullErrorMessage, parsedTransactions);
    },
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
