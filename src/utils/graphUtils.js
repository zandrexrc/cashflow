import {format} from 'date-fns';

import {
  calcMonthlySubscriptions,
  calcYearlySubscriptions,
} from './subscriptionUtils';
import {calcCategoryAmounts, calcNetIncome} from './transactionUtils';

/**
 * Creates the datasets required in making an ActivityGraph.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @param {number} month: the month corresponding to the transactions (0-11)
 *                         or -1, which is equivalent to the 'all months' option
 * @param {number} year: the year corresponding to the transactions
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createActivityGraphData(transactions, month, year) {
  const income = {};
  const expenses = {};
  const labels = [];

  if (month === -1) {
    // Initialize entries for each month
    for (let i = 0; i < 12; i++) {
      labels.push(format(new Date(year, i, 1), 'MMM'));
      income[i.toString()] = 0;
      expenses[i.toString()] = 0;
    }
    // Log each transaction into its respective month
    for (let j = 0; j < transactions.length; j++) {
      const amount = transactions[j].amount;
      const month = new Date(transactions[j].date).getMonth().toString();
      amount < 0 ?
        expenses[month] += Math.abs(amount) :
        income[month] += amount;
    }
  } else {
    // Initialize entries for each day of the month
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      labels.push(`${format(new Date(year, month, 1), 'MMM')} ${i.toString()}`);
      income[i.toString()] = 0;
      expenses[i.toString()] = 0;
    }
    // Log each transaction to its respective day/entry
    for (let j = 0; j < transactions.length; j++) {
      const amount = transactions[j].amount;
      const date = new Date(transactions[j].date).getDate().toString();
      amount < 0 ? expenses[date] += Math.abs(amount) : income[date] += amount;
    }
  }

  return {
    datasets: [
      {
        label: 'income',
        data: Object.values(income),
        backgroundColor: '#43a047',
        borderColor: '#43a047',
        fill: false,
      },
      {
        label: 'expenses',
        data: Object.values(expenses),
        backgroundColor: '#f44336',
        borderColor: '#f44336',
        fill: false,
      },
    ],
    labels: labels,
  };
}


/**
 * Creates the datasets required in making a CategoryGraph.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createCategoryGraphData(transactions) {
  // Log the occurences of each category
  const categoriesCount = calcCategoryAmounts(transactions);

  // Determine the color of each category
  const colors = [];
  for (let j = 0; j < Object.keys(categoriesCount).length; j++) {
    colors.push(`hsl(${(j * 55) % 359}, 100%, 70%)`);
  }

  // Sort by amount
  const sortedCategories = Object.entries(categoriesCount)
    .sort(([,a],[,b]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  return {
    datasets: [
      {
        data: Object.values(sortedCategories),
        backgroundColor: colors,
      },
    ],
    labels: Object.keys(sortedCategories),
  };
}


/**
 * Creates the datasets for making the bar graph in the Transactions page.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createTransactionsGraphData(transactions) {
  // Calculate total income and expenses
  const {totalIncome, totalExpenses} = calcNetIncome(transactions);

  return {
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#43a047', '#f44336'],
        maxBarThickness: 50,
      },
    ],
    labels: ['income', 'expenses'],
  };
}


/**
 * Creates the datasets for making the pie graph in the Subscriptions page.
 * @param {Array<Subscription>} subscriptions: a list of subscriptions
 * @param {string} scope: the scope of the data ('monthly' or 'yearly')
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createSubscriptionsGraphData(subscriptions, scope) {
  const {totalExpenses, remainingExpenses} = scope === 'monthly' ?
        calcMonthlySubscriptions(subscriptions) :
        calcYearlySubscriptions(subscriptions);
  const paidExpenses = totalExpenses - remainingExpenses;

  return {
    datasets: [
      {
        data: [paidExpenses, remainingExpenses],
        backgroundColor: ['#43a047', '#f44336'],
        borderWidth: 1,
      },
    ],
    labels: ['paid', 'remaining'],
  };
}


/**
 * Creates the datasets for making the bar graph in the Accounts page.
 * @param {Array<Account>} accounts: a list of accounts
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createAccountsGraphData(accounts) {
  const data = [];
  const colors = [];
  const labels = [];

  for (let i = 0; i < accounts.length; i++) {
    data.push(accounts[i].balance.toFixed(2));
    labels.push(accounts[i].name);
    colors.push(`hsl(${(i * 55) % 359}, 100%, 70%)`);
  }

  return {
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        maxBarThickness: 50,
      },
    ],
    labels: labels,
  };
}


export {
  createActivityGraphData,
  createCategoryGraphData,
  createTransactionsGraphData,
  createSubscriptionsGraphData,
  createAccountsGraphData,
};
