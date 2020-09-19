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
 * Determines if a transaction passes the account filter.
 * @param {String or number} term: the account filter ("all" or accountID)
 * @param {Transaction} transaction: a transaction object
 * @return {boolean}: true if the transaction passes the filter, false if not
 */
const filterByAccount = (term, transaction) => {
    return term === "All" || term === transaction.accountID;
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
    if (term.month === "All") {
        return term.year === parseInt(transaction.date.substring(0, 4));
    } else {
        return term.month === parseInt(transaction.date.substring(5, 7)) &&
            term.year === parseInt(transaction.date.substring(0, 4));
    }
}

/**
 * Filter the transactions list based on a given set of filtering conditions.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @param {Object} filters: the filter conditions to be used 
 * @return {Array<Transaction>}: the filtered list of transactions
 */
const getFilteredTransactions = (transactions, filters) => {
    return transactions.filter(t => (
        filterByAccount(filters.account, t) &&
        filterByCategory(filters.category, t) &&
        filterByDate(filters.date, t) 
    ));
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
    filterByAccount,
    filterByCategory,
    filterByDate,
    getFilteredTransactions,
    calcNetIncome
};