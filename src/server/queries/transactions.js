const connection = require("../database/connection");

const transactionsQueries = {
    getTransactions(res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `SELECT transactionId, date, description, 
                                    accountId, category, amount 
                                    FROM transactions`;
                    db.all(stmt, function (err, rows) {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json(rows);
                    });
                });
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
                db.serialize(() => {
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
                    
                    db.run(stmt, params, function (err) {
                        if (err) {
                            throw err;
                        }
                        res.status(201).json({
                            "transactionId": this.lastID,
                            "date": req.body.date,
                            "description": req.body.description,
                            "accountId": parseInt(req.body.accountId),
                            "category": req.body.category,
                            "amount": parseFloat(req.body.amount)
                        });
                    });
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
                db.serialize(() => {
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
                    
                    db.run(stmt, params, function (err) {
                        if (err) {
                            throw err;
                        }
                    }).get(`SELECT * FROM transactions WHERE transactionId = ?`, 
                            [req.params.id], function (err, row) {
                        if (err) {
                            throw err;
                        }
                        res.status(201).json(row);
                    });
                });
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
                db.serialize(() => {
                    const stmt = `DELETE FROM transactions WHERE transactionId = ?`;
                    
                    db.run(stmt, req.params.id, function (err) {
                        if (err) {
                            throw (err);
                        }
                        res.status(200).json({
                            "transactionId": parseInt(req.params.id),
                            "deleted": true
                        });
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to delete the transaction."
            });
        }
    }
};

module.exports = transactionsQueries;