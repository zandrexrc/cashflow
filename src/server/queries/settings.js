const connection = require("../database/connection");

const settingsQueries = {
    getSettings(res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `SELECT userSettings FROM settings`;
                    db.get(stmt, function (err, row) {
                        if (err) {
                            throw err;
                        }
                        const userSettings = JSON.parse(row.userSettings);
                        res.status(200).json(userSettings);
                    });
                });
            });
        } catch (err) {
            res.status(404).json({
                "error": "Failed to retrieve settings."
            });
        }
    },

    editSettings(req, res) {
        try {
            connection.query(async (db) => {
                db.serialize(() => {
                    const stmt = `UPDATE settings SET userSettings = ? WHERE userId = ?`;
                    const settingsString = JSON.stringify(req.body);
                    
                    db.run(stmt, [settingsString, 1], function (err) {
                        if (err) {
                            throw err;
                        }
                    }).get(`SELECT userSettings FROM settings WHERE userId = ?`, 
                            1, function (err, row) {
                        if (err) {
                            throw err;
                        }
                        const userSettings = JSON.parse(row.userSettings);
                        res.status(201).json(userSettings);
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                "error": "Failed to edit the settings."
            });
        }
    }
}

module.exports = settingsQueries;