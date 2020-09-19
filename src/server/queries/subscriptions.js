const connection = require("../connection");

const subscriptionsQueries = {
    async getSubscriptions(res) {
        try {
            connection.dbQuery(async (db) => {
                let subscriptions = [];
            
                let queryString = "SELECT subscriptionID, name, firstBillingDate, " +
                                "cycle, accountID, category, amount FROM subscriptions";
                let queryRows = await db.query(queryString);
                queryRows.forEach((subscription) => {
                    subscriptions.push({
                        "subscriptionID": subscription.subscriptionID,
                        "name": subscription.name,
                        "firstBillingDate": subscription.firstBillingDate,
                        "cycle": subscription.cycle,
                        "accountID": subscription.accountID,
                        "category": subscription.category,
                        "amount": subscription.amount
                    });
                });
            
                res.status(200).json(subscriptions);
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to retrieve all subscriptions."
            });
        }
    },
    
    
    async addSubscription(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let queryString = "INSERT INTO subscriptions(name, firstBillingDate, " +
                                "cycle, accountID, category, amount) " +
                                "VALUES (?, ?, ?, ?, ?, ?)";
                await db.query(
                    queryString,
                    [
                        req.body.name,
                        req.body.firstBillingDate,
                        req.body.cycle,
                        req.body.accountID,
                        req.body.category,
                        req.body.amount
                    ]
                );
        
                // Get created subscription
                queryString = "SELECT * FROM subscriptions WHERE subscriptionID = " +
                            "(SELECT MAX(subscriptionID) FROM subscriptions)";
                let queryRes = await db.query(queryString);
                let subscription = queryRes[0];
        
                res.status(200).json({
                    "subscriptionID": subscription.subscriptionID,
                    "name": subscription.name,
                    "firstBillingDate": subscription.firstBillingDate,
                    "cycle": subscription.cycle,
                    "accountID": subscription.accountID,
                    "category": subscription.category,
                    "amount": subscription.amount
                });
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to create a new subscription."
            });
        }
    },
    
    
    async editSubscription(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let queryString = "UPDATE subscriptions " +
                                "SET name = ?, firstBillingDate = ?, cycle = ?, " +
                                "accountID = ?, category = ?, amount = ? " +
                                "WHERE subscriptionID = ?";
                await db.query(
                    queryString,
                    [
                        req.body.name,
                        req.body.firstBillingDate,
                        req.body.cycle,
                        req.body.accountID,
                        req.body.category,
                        req.body.amount,
                        req.params.id
                    ]
                );
        
                // Get edited subscription
                queryString = "SELECT * FROM subscriptions WHERE subscriptionID = ?";
                let queryRes = await db.query(queryString, [req.params.id]);
                let subscription = queryRes[0];
        
                res.status(200).json({
                    "subscriptionID": subscription.subscriptionID,
                    "name": subscription.name,
                    "firstBillingDate": subscription.firstBillingDate,
                    "cycle": subscription.cycle,
                    "accountID": subscription.accountID,
                    "category": subscription.category,
                    "amount": subscription.amount
                });
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to edit the subscription."
            });
        }
    },
    
    
    async deleteSubscription(req, res) {
        try {
            await connection.dbQuery(async (db) => {

                // Throw error if subscription to be deleted does not exist
                let queryString = "SELECT * FROM subscriptions WHERE subscriptionID = ?";
                let queryRes = await db.query(queryString, [req.params.id]);
                if (queryRes.length === 0) {
                    throw (queryRes);
                }

                // Delete the subscription
                queryString = "DELETE FROM subscriptions WHERE subscriptionID = ?";
                await db.query(queryString, [req.params.id]);
        
                res.status(200).json({
                    "subscriptionID": parseInt(req.params.id),
                    "deleted": true
                });
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to delete the subscription."
            });
        }
    }
}

module.exports = subscriptionsQueries;