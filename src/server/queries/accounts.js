const connection = require("../connection");

const accountsQueries = {
    async getAccounts(res) {
        try {
            connection.dbQuery(async (db) => {
                let accounts = [];
            
                let queryString = "SELECT accountID, name, type, balance FROM accounts";
                let queryRows = await db.query(queryString);
                queryRows.forEach((account) => {
                    accounts.push({
                        "accountID": account.accountID,
                        "name": account.name,
                        "type": account.type,
                        "balance": account.balance
                    });
                });
            
                res.status(200).json(accounts);
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to retrieve all accounts."
            });
        }
    },
    
    
    async addAccount(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let queryString = "INSERT INTO accounts(name, type, balance) " +
                                "VALUES (?, ?, ?)";
                await db.query(
                    queryString,
                    [
                        req.body.name,
                        req.body.type,
                        req.body.balance
                    ]
                );
        
                // Get created account
                queryString = "SELECT * FROM accounts WHERE accountID = " +
                            "(SELECT MAX(accountID) FROM accounts)";
                let queryRes = await db.query(queryString);
                let account = queryRes[0];
        
                res.status(200).json({
                    "accountID": account.accountID,
                    "name": account.name,
                    "type": account.type,
                    "balance": account.balance
                });
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to create a new account."
            });
        }
    },
    
    
    async editAccount(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let queryString = "UPDATE accounts " +
                                "SET name = ?, type = ?, balance = ? " +
                                "WHERE accountID = ?";
                await db.query(
                    queryString,
                    [
                        req.body.name,
                        req.body.type,
                        req.body.balance,
                        req.params.id
                    ]
                );
        
                // Get edited account
                queryString = "SELECT * FROM accounts WHERE accountID = ?";
                let queryRes = await db.query(queryString, [req.params.id]);
                let account = queryRes[0];
        
                res.status(200).json({
                    "accountID": account.accountID,
                    "name": account.name,
                    "type": account.type,
                    "balance": account.balance
                });
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to edit the account."
            });
        }
    },
    
    
    async deleteAccount(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let accountID = req.params.id;

                // Throw error if account to be deleted does not exist
                let queryString = "SELECT * FROM accounts WHERE accountID = ?";
                let queryRes = await db.query(queryString, [accountID]);
                if (queryRes.length === 0) {
                    throw (queryRes);
                }
        
                // Delete related transactions
                queryString = "DELETE FROM transactions WHERE accountID = ?";
                await db.query(queryString, [accountID]);
        
                // Delete related subscriptions
                queryString = "DELETE FROM subscriptions WHERE accountID = ?";
                await db.query(queryString, [accountID]);
        
                // Delete account
                queryString = "DELETE FROM accounts WHERE accountID = ?";
                await db.query(queryString, [accountID]);
        
                res.status(200).json({
                    "accountID": parseInt(accountID),
                    "deleted": true
                });
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to delete the account."
            });
        }
    }
};

module.exports = accountsQueries;