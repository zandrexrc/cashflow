const connection = require("../connection");

const transactionsQueries = {
    async getTransactions(res) {
        try {
            connection.dbQuery(async (db) => {
                let transactions = [];
            
                let queryString = "SELECT transactionID, date, description, " +
                                "accountID, category, amount FROM transactions";
                let queryRows = await db.query(queryString);
                queryRows.forEach((transaction) => {
                    transactions.push({
                        "transactionID": transaction.transactionID,
                        "date": transaction.date,
                        "description": transaction.description,
                        "accountID": transaction.accountID,
                        "category": transaction.category,
                        "amount": transaction.amount
                    });
                });
            
                res.status(200).json(transactions);
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to retrieve all transactions."
            });
        }
    },
    
    
    async addTransaction(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let queryString = "INSERT INTO transactions(date, description, " +
                                "accountID, category, amount) " +
                                "VALUES (?, ?, ?, ?, ?)";
                await db.query(
                    queryString,
                    [
                        req.body.date,
                        req.body.description,
                        req.body.accountID,
                        req.body.category,
                        req.body.amount
                    ]
                );

                // Update account balance
                queryString = "UPDATE accounts SET balance = balance + ? WHERE accountID = ?";
                await db.query(queryString, [req.body.amount, req.body.accountID]);
        
                // Get created transaction
                queryString = "SELECT * FROM transactions WHERE transactionID = " +
                            "(SELECT MAX(transactionID) FROM transactions)";
                let queryRes = await db.query(queryString);
                let transaction = queryRes[0];
        
                res.status(200).json({
                    "transactionID": transaction.transactionID,
                    "date": transaction.date,
                    "description": transaction.description,
                    "accountID": transaction.accountID,
                    "category": transaction.category,
                    "amount": transaction.amount
                });
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to create a new transaction."
            });
        }
    },
    
    
    async editTransaction(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                // Get old transaction
                let queryString = "SELECT amount FROM transactions WHERE transactionID = ?";
                let queryRes = await db.query(queryString, [req.params.id]);
                let oldAmount = queryRes[0].amount;

                queryString = "UPDATE transactions " +
                            "SET date = ?, description = ?, accountID = ?, " +
                            "category = ?, amount = ? " +
                            "WHERE transactionID = ?";
                await db.query(
                    queryString,
                    [
                        req.body.date,
                        req.body.description,
                        req.body.accountID,
                        req.body.category,
                        req.body.amount,
                        req.params.id
                    ]
                );

                // Update account balance
                queryString = "UPDATE accounts SET balance = balance + ? WHERE accountID = ?";
                await db.query(queryString, [(parseFloat(req.body.amount) - parseFloat(oldAmount)), req.body.accountID]);
        
                // Get edited transaction
                queryString = "SELECT * FROM transactions WHERE transactionID = ?";
                queryRes = await db.query(queryString, [req.params.id]);
                let transaction = queryRes[0];
        
                res.status(200).json({
                    "transactionID": transaction.transactionID,
                    "date": transaction.date,
                    "description": transaction.description,
                    "accountID": transaction.accountID,
                    "category": transaction.category,
                    "amount": transaction.amount
                });
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to edit the transaction."
            });
        }
    },
    
    
    async deleteTransaction(req, res) {
        try {
            await connection.dbQuery(async (db) => {

                // Throw error if transaction to be deleted does not exist
                let queryString = "SELECT * FROM transactions WHERE transactionID = ?";
                let queryRes = await db.query(queryString, [req.params.id]);
                if (queryRes.length === 0) {
                    throw (queryRes);
                }

                // Delete transaction
                queryString = "DELETE FROM transactions WHERE transactionID = ?";
                await db.query(queryString, [req.params.id]);

                // Update account balance
                queryString = "UPDATE accounts SET balance = balance - ? WHERE accountID = ?";
                await db.query(queryString, [queryRes[0].amount, queryRes[0].accountID]);
        
                res.status(200).json({
                    "transactionID": parseInt(req.params.id),
                    "deleted": true
                });
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to delete the transaction."
            });
        }
    }
};

module.exports = transactionsQueries;