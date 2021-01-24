const connection = require("../database/connection");

const accountsQueries = {
    getAccounts(res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `SELECT accountId, name, type, balance
                                    FROM accounts`;
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
                "error": "Failed to retrieve all accounts."
            });
        }
    },

    addAccount(req, res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `INSERT INTO accounts (name, type, balance) 
                                    VALUES (?, ?, ?)`;
                    const params = [
                        req.body.name,
                        req.body.type,
                        req.body.balance
                    ];
                    
                    db.run(stmt, params, function (err) {
                        if (err) {
                            throw err;
                        }
                        res.status(201).json({
                            "accountId": this.lastID,
                            "name": req.body.name,
                            "type": req.body.type,
                            "balance": req.body.balance
                        });
                    });
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
                db.serialize(() => {
                    const stmt = `UPDATE accounts 
                                    SET name = ?, type = ?, balance = ? 
                                    WHERE accountID = ?`;
                    const params = [
                        req.body.name,
                        req.body.type,
                        req.body.balance,
                        req.params.id
                    ];
                    
                    db.run(stmt, params, function (err) {
                        if (err) {
                            throw err;
                        }
                    }).get(`SELECT * FROM accounts WHERE accountID = ?`, 
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
                "error": "Failed to edit the account."
            });
        }
    },

    deleteAccount(req, res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `DELETE FROM accounts WHERE accountId = ?`;
                    
                    db.run(stmt, req.params.id, function (err) {
                        if (err) {
                            throw (err);
                        }
                        res.status(200).json({
                            "accountId": parseInt(req.params.id),
                            "deleted": true
                        });
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to delete the account."
            });
        }
    }
};

module.exports = accountsQueries;