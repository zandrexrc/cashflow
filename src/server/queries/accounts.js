const connection = require("../database/connection");

const accountsQueries = {
    getAccounts(res) {
        try {
            connection.query(async (db) => {
                const stmt = `SELECT accountId, name, type, balance
                                FROM accounts`;
                const result = await db.all(stmt, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(200).json(result);
            });
        } catch (err) {
            res.status(404).json({
                "error": "Failed to retrieve all accounts."
            });
        }
    },

    addAccount(req, res) {
        try {
            connection.query(async (db) => {
                const stmt = `INSERT INTO accounts (name, type, balance) 
                                VALUES (?, ?, ?)`;
                const params = [
                    req.body.name,
                    req.body.type,
                    req.body.balance
                ];
                
                const result = await db.run(stmt, params, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(201).json({
                    "accountId": result.lastID,
                    "name": req.body.name,
                    "type": req.body.type,
                    "balance": parseFloat(req.body.balance)
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to create a new account."
            });
        }
    },

    editAccount(req, res) {
        try {
            connection.query(async (db) => {
                const stmt = `UPDATE accounts 
                                SET name = ?, type = ?, balance = ? 
                                WHERE accountID = ?`;
                const params = [
                    req.body.name,
                    req.body.type,
                    req.body.balance,
                    req.params.id
                ];
                
                await db.run(stmt, params, function (err) {
                    if (err) {
                        throw err;
                    }
                })
                const result = await db.get(
                    `SELECT * FROM accounts WHERE accountID = ?`, 
                    [req.params.id]
                );
                res.status(201).json(result);
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to edit the account."
            });
        }
    },

    deleteAccount(req, res) {
        try {
            connection.query(async (db) => {
                const stmt = `DELETE FROM accounts WHERE accountId = ?`;
                    
                await db.run(stmt, [req.params.id], function (err) {
                    if (err) {
                        throw (err);
                    }
                });
                res.status(200).json({
                    "accountId": parseInt(req.params.id),
                    "deleted": true
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to delete the account."
            });
        }
    },

    addMultipleAccounts(req, res) {
        try {
            connection.query(async (db) => {
                let query = `INSERT INTO accounts (name, type, balance) 
                                VALUES (?, ?, ?)`;
                let stmt = await db.prepare(query);

                let addedAccounts = [];
                for (let i = 0; i < req.body.length; i++) {
                    let account = req.body[i];
                    let params = [
                        account.name,
                        account.type,
                        account.balance
                    ];
                    let result = await stmt.run(params, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    addedAccounts.push({
                        "accountId": result.lastID,
                        "name": account.name,
                        "type": account.type,
                        "balance": parseFloat(account.balance)
                    });
                }
                await stmt.finalize();
                res.status(201).json(addedAccounts);
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to create a new account."
            });
        }
    },
};

module.exports = accountsQueries;