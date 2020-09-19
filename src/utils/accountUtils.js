/**
 * Creates a map that connects account IDs to their respective account names.
 * @param {Array<Account>} accounts: a list of accounts
 * @return {Object}: a map having accountIDs as keys and account names as values 
 */
function getAccountNames(accounts) {
    let lookup = {};
    for (let i = 0; i < accounts.length; i++) {
        lookup[accounts[i].accountID] = accounts[i].name;
    }
    return lookup;
}


/**
 * Returns the two most used accounts based on the given transactions.
 * @param {Array<Account>} accounts: a list of accounts
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Array<Account>}: the two most used accounts 
 */
function calcMostUsedAccounts(accounts, transactions) {
    // Track the number of occurences of each account
    let accountsCounter = {};
    for (let i = 0; i < transactions.length; i++) {
        let id = transactions[i].accountID;
        accountsCounter[id] = accountsCounter[id] ? accountsCounter[id] + 1 : 1;
    }

    // Sort accounts by their occurences
    let sortedAccounts = Object.keys(accountsCounter).sort(function (a, b) {
        return -(accountsCounter[a] - accountsCounter[b])
    });
    let mostUsedAccounts = sortedAccounts.map(id => 
        accounts.find(a => a.id === id)
    );

    // Fallback to default order if not enough accounts
    if (mostUsedAccounts[0] === undefined || mostUsedAccounts.length < 2) {
        mostUsedAccounts = accounts;
    }
    return mostUsedAccounts.slice(0, 2);
}


export {
    getAccountNames,
    calcMostUsedAccounts
};