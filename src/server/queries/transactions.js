const connection = require("../database/connection");

const transactionsQueries = {
    getTransactions(res) {
        try {
            connection.query(async (db) => {
                const stmt = `SELECT transactionId, date, description, 
                                accountId, category, amount 
                                FROM transactions`;
                const result = await db.all(stmt, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(200).json(result);
            });
        } catch (err) {
            res.status(404).json({
                "error": "Failed to retrieve all transactions."
            });
        }
    },

    addTransaction(req, res) {
        try {
            connection.query(async (db) => {
                const stmt = `INSERT INTO transactions (date, description, 
                                accountId, category, amount) 
                                VALUES (?, ?, ?, ?, ?)`;
                const params = [
                    req.body.date,
                    req.body.description,
                    req.body.accountId,
                    req.body.category,
                    req.body.amount
                ];

                const result = await db.run(stmt, params, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(201).json({
                    "transactionId": result.lastID,
                    "date": req.body.date,
                    "description": req.body.description,
                    "accountId": parseInt(req.body.accountId),
                    "category": req.body.category,
                    "amount": parseFloat(req.body.amount)
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to create a new transaction."
            });
        }
    },

    editTransaction(req, res) {
        try {
            connection.query(async (db) => {
                const stmt = `UPDATE transactions 
                                SET date = ?, description = ?, 
                                accountId = ?, category = ?, amount = ? 
                                WHERE transactionId = ?`;
                const params = [
                    req.body.date,
                    req.body.description,
                    req.body.accountId,
                    req.body.category,
                    req.body.amount,
                    req.params.id
                ];
                
                await db.run(stmt, params, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                const result = await db.get(
                    `SELECT * FROM transactions WHERE transactionId = ?`, 
                    [req.params.id]
                );
                res.status(201).json(result);
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to edit the transaction."
            });
        }
    },

    deleteTransaction(req, res) {
        try {
            connection.query(async (db) => {
                const stmt = `DELETE FROM transactions WHERE transactionId = ?`;
                
                await db.run(stmt, [req.params.id], function (err) {
                    if (err) {
                        throw (err);
                    }
                });
                res.status(200).json({
                    "transactionId": parseInt(req.params.id),
                    "deleted": true
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to delete the transaction."
            });
        }
    },

    addMultipleTransactions(req, res) {
        try {
            connection.query(async (db) => {
                let query = `INSERT INTO transactions (date, description, 
                                accountId, category, amount) 
                                VALUES (?, ?, ?, ?, ?)`;
                let stmt = await db.prepare(query);

                let addedTransactions = [];
                for (let i = 0; i < req.body.length; i++) {
                    let transaction = req.body[i];
                    let params = [
                        transaction.date,
                        transaction.description,
                        transaction.accountId,
                        transaction.category,
                        transaction.amount
                    ];
                    let result = await stmt.run(params, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    addedTransactions.push({
                        "transactionId": result.lastID,
                        "date": transaction.date,
                        "description": transaction.description,
                        "accountId": parseInt(transaction.accountId),
                        "category": transaction.category,
                        "amount": parseFloat(transaction.amount)
                    });
                }
                await stmt.finalize();
                res.status(201).json(addedTransactions);
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to create multiple transactions."
            });
        }
    },
};

module.exports = transactionsQueries;