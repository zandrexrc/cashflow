const connection = require("../connection");

const settingsQueries = {
    async getSettings(res) {
        try {
            connection.dbQuery(async (db) => {
                let queryString = "SELECT userSettings FROM settings";
                let queryRes = await db.query(queryString);
            
                res.status(200).json(JSON.parse(queryRes[0].userSettings));
            });
        } catch (err) {
            res.status(400).json({
                "error": "Failed to retrieve settings."
            });
        }
    },
    
    async editSettings(req, res) {
        try {
            await connection.dbQuery(async (db) => {
                let settingsString = JSON.stringify({
                    currency: req.body.currency,
                    dateFormat: req.body.dateFormat,
                    appTheme: req.body.appTheme,
                });
        
                let queryString = "UPDATE settings SET userSettings = ? WHERE userID = ?";
                await db.query(queryString, [settingsString, 1]);

                // Get edited settings
                queryString = "SELECT userSettings FROM settings";
                let queryRes = await db.query(queryString, [req.params.id]);
        
                res.status(200).json(JSON.parse(queryRes[0].userSettings));
            })
        } catch (err) {
            res.status(400).json({
                "error": "Failed to edit settings."
            });
        }
    }
}

module.exports = settingsQueries;