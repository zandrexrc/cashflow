import { isValid as isValidDate } from 'date-fns';
import { isValidCurrencyAmount } from './miscUtils';


/**
 * Returns a list of all the categories in the transactions.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Array<string>}: a list of categories
 */
function getCategories(transactions) {
    let categories = [];
    for (let i = 0; i < transactions.length; i++) {
        let category = transactions[i].category;
        if (category && !categories.includes(category)) {
            categories.push(category);
        }
    }
    return categories;
}


/**
 * Calculates the total amount of each category.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Object}: an object containing all categories and their total amounts
 */
function calcCategoryAmounts(transactions) {
    let categoryAmounts = {};
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category) {
            let category = transactions[i].category.toLowerCase();
            categoryAmounts[category] = categoryAmounts[category] 
                ? categoryAmounts[category] + transactions[i].amount 
                : transactions[i].amount;
        } else {
            categoryAmounts["uncategorized"] = categoryAmounts["uncategorized"] 
                ? categoryAmounts["uncategorized"] + transactions[i].amount 
                : transactions[i].amount;
        }
    }
    return categoryAmounts;
}


/**
 * Returns a list of all the years in which the transactions are logged.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Array<number>}: a list of years
 */
function getTransactionYears(transactions) {
    let years = [];
    for (let i = 0; i < transactions.length; i++) {
        let year = parseInt(transactions[i].date.substring(0, 4));
        if (!years.includes(year)) {
            years.push(year);
        }
    }
    return years;
}


/**
 * Determines if a transaction passes the account filter.
 * @param {String or number} term: the account filter ("all" or accountId)
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByAccount = (term, transaction) => {
    return term === "All" || parseInt(term) === transaction.accountId;
}

/**
 * Determines if a transaction passes the category filter.
 * @param {String} term: the category filter ("all" or category name)
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByCategory = (term, transaction) => {
    if (transaction.category) {
        return term === "All" || transaction.category === term;
    } else {
        return term === "All" || term === "Uncategorized";
    }
}

/**
 * Determines if a transaction passes the date filter.
 * @param {Object} term: the date filter with month and year fields
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByDate = (term, transaction) => {
    const date = new Date(transaction.date);
    if (term.month === -1) {
        return term.year === date.getFullYear();
    } else {
        return term.month === date.getMonth() &&
            term.year === date.getFullYear();
    }
}

/**
 * Filter the transactions list based on a given set of filtering conditions.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @param {Object} filters: the filter conditions to be used 
 * @return {Array<Transaction>}: the filtered list of transactions
 */
function filterTransactions(transactions, filters) {
    return transactions.filter(t => (
        filterByAccount(filters.account, t) &&
        filterByCategory(filters.category, t) &&
        filterByDate(filters.date, t) 
    )).sort((a, b) => new Date(b.date) - new Date(a.date));
}


/**
 * Checks if a transaction has valid values and attributes
 * @param {Transaction} transaction: the transaction to be validated
 * @return {boolean}: true if the transaction is valid, false otherwise
 */
function validateTransaction(transaction) {
    let isValid = false;

    const hasAllRequiredAttributes = 
        transaction.transactionId && transaction.date && transaction.description 
        && transaction.amount && transaction.accountId;

    if (hasAllRequiredAttributes) {
        const dateisValid = isValidDate(new Date(transaction.date));
        const descriptionIsValid = transaction.description.trim().length > 0;
        const amountIsValid = isValidCurrencyAmount(transaction.amount);
        isValid = dateisValid && descriptionIsValid && amountIsValid;
    }

    return isValid;
}


/**
 * Calculates the income, expenses, and net income from the transactions
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Object}: an object containing the income, expenses, and net income
 */
function calcNetIncome(transactions) {
    let totalIncome = 0;
    let totalExpenses = 0;

    for (let i = 0; i < transactions.length; i++) {
        let amount = transactions[i].amount;
        amount < 0 ? totalExpenses += Math.abs(amount) : totalIncome += amount;
    }

    let netIncome = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, netIncome };
}


export {
    getTransactionYears,
    getCategories,
    calcCategoryAmounts,
    filterTransactions,
    validateTransaction,
    calcNetIncome
};