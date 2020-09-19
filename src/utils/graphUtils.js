/**
 * Creates the datasets required in making an ActivityGraph.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @param {number} month: the month corresponding to the transactions (1-12)
 * @param {number} year: the year corresponding to the transactions
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createActivityGraphData(transactions, month, year) {
    let income = {};
    let expenses = {};
    let labels = [];

    // Initialize entries for each day of the month
    let daysInMonth = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i.toString());
        income[i.toString()] = 0;
        expenses[i.toString()] = 0;
    }

    // Log each transaction to its respective day/entry
    for (let j = 0; j < transactions.length; j++) {
        let amount = transactions[j].amount;
        let date = new Date(transactions[j].date).getDate().toString();
        amount < 0 ? expenses[date] += Math.abs(amount) : income[date] += amount;
    }

    return {
        datasets: [
            {
                label: 'income',
                data: Object.values(income),
                backgroundColor: '#43a047',
                borderColor: '#43a047',
                fill: false
            },
            {
                label: 'expenses',
                data: Object.values(expenses),
                backgroundColor: '#f44336',
                borderColor: '#f44336',
                fill: false
            }
        ],
        labels: labels
    }
}


/**
 * Creates the datasets required in making a CategoryGraph.
 * @param {Array<Transaction>} transactions: a list of transactions
 * @return {Object}: an object with the datasets and labels for the graph
 */
function createCategoryGraphData(transactions) {
    // Log the occurences of each category
    let categoriesCount = {};
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category) {
            let category = transactions[i].category.toLowerCase();
            categoriesCount[category] = categoriesCount[category] ? categoriesCount[category] + 1 : 1;
        } else {
            categoriesCount["uncategorized"] = 
                categoriesCount["uncategorized"] ?
                categoriesCount["uncategorized"] + 1 :
                1;
        }
    }

    // Determine the color of each category
    let colors = [];
    for (let j = 0; j < Object.keys(categoriesCount).length; j++) {
        colors.push(`hsl(${(j * 55) % 359}, 100%, 70%)`);
    }

    return {
        datasets: [
            {
                data: Object.values(categoriesCount),
                backgroundColor: colors
            }
        ],
        labels: Object.keys(categoriesCount)
    }
}


export {
    createActivityGraphData,
    createCategoryGraphData
}