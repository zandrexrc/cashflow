const connection = require("../database/connection");

const subscriptionsQueries = {
    getSubscriptions(res) {
        try {
            connection.query(async (db) => {
                const stmt = `SELECT subscriptionId, name, firstBillingDate, 
                                cycle, accountId, category, amount 
                                FROM subscriptions`;
                const result = await db.all(stmt, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(200).json(result);
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
                
                const result = await db.run(stmt, params, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(201).json({
                    "subscriptionId": result.lastID,
                    "name": req.body.name,
                    "firstBillingDate": req.body.firstBillingDate,
                    "cycle": req.body.cycle,
                    "accountId": parseInt(req.body.accountId),
                    "category": req.body.category,
                    "amount": parseFloat(req.body.amount)
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
                
                await db.run(stmt, params, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                const result = await db.get(
                    `SELECT * FROM subscriptions WHERE subscriptionId = ?`, 
                    [req.params.id]
                );
                res.status(201).json(result);
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
                const stmt = `DELETE FROM subscriptions WHERE subscriptionId = ?`;
                    
                await db.run(stmt, [req.params.id], function (err) {
                    if (err) {
                        throw (err);
                    }
                });
                res.status(200).json({
                    "subscriptionId": parseInt(req.params.id),
                    "deleted": true
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to delete the subscription."
            });
        }
    },

    addMultipleSubscriptions(req, res) {
        try {
            connection.query(async (db) => {
                let query = `INSERT INTO subscriptions (name, firstBillingDate, 
                                cycle, accountId, category, amount) 
                                VALUES (?, ?, ?, ?, ?, ?)`;
                let stmt = await db.prepare(query);

                let addedSubscriptions = [];
                for (let i = 0; i < req.body.length; i++) {
                    let subscription = req.body[i];
                    let params = [
                        subscription.name,
                        subscription.firstBillingDate,
                        subscription.cycle,
                        subscription.accountId,
                        subscription.category,
                        subscription.amount
                    ];
                    let result = await stmt.run(params, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    addedSubscriptions.push({
                        "subscriptionId": result.lastID,
                        "name": subscription.name,
                        "firstBillingDate": subscription.firstBillingDate,
                        "cycle": subscription.cycle,
                        "accountId": parseInt(subscription.accountId),
                        "category": subscription.category,
                        "amount": parseFloat(subscription.amount)
                    });
                }
                await stmt.finalize();
                res.status(201).json(addedSubscriptions);
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to create a new subscription."
            });
        }
    },
}

module.exports = subscriptionsQueries;