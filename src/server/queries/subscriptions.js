const connection = require("../database/connection");

const subscriptionsQueries = {
    getSubscriptions(res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `SELECT subscriptionId, name, firstBillingDate, 
                                    cycle, accountId, category, amount 
                                    FROM subscriptions`;
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
                "error": "Failed to retrieve all subscriptions."
            });
        }
    },

    addSubscription(req, res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `INSERT INTO subscriptions (name, firstBillingDate, 
                                    cycle, accountId, category, amount) 
                                    VALUES (?, ?, ?, ?, ?, ?)`;
                    const params = [
                        req.body.name,
                        req.body.firstBillingDate,
                        req.body.cycle,
                        req.body.accountId,
                        req.body.category,
                        req.body.amount
                    ];
                    
                    db.run(stmt, params, function (err) {
                        if (err) {
                            throw err;
                        }
                        res.status(201).json({
                            "subscriptionId": this.lastID,
                            "name": req.body.name,
                            "firstBillingDate": req.body.firstBillingDate,
                            "cycle": req.body.cycle,
                            "accountId": parseInt(req.body.accountId),
                            "category": req.body.category,
                            "amount": parseFloat(req.body.amount)
                        });
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to create a new subscription."
            });
        }
    },
    
    editSubscription(req, res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `UPDATE subscriptions 
                                    SET name = ?, firstBillingDate = ?, cycle = ?, 
                                    accountId = ?, category = ?, amount = ? 
                                    WHERE subscriptionId = ?`;
                    const params = [
                        req.body.name,
                        req.body.firstBillingDate,
                        req.body.cycle,
                        req.body.accountId,
                        req.body.category,
                        req.body.amount,
                        req.params.id
                    ];
                    
                    db.run(stmt, params, function (err) {
                        if (err) {
                            throw err;
                        }
                    }).get(`SELECT * FROM subscriptions WHERE subscriptionId = ?`, 
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
                "error": "Failed to edit the subscription."
            });
        }
    },

    deleteSubscription(req, res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `DELETE FROM subscriptions WHERE subscriptionId = ?`;
                    
                    db.run(stmt, req.params.id, function (err) {
                        if (err) {
                            throw (err);
                        }
                        res.status(200).json({
                            "subscriptionId": parseInt(req.params.id),
                            "deleted": true
                        });
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to delete the subscription."
            });
        }
    }
}

module.exports = subscriptionsQueries;