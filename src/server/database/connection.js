const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const connection = {

  async query(callback) {
    const dbPath = path.resolve(__dirname, 'cashflow.db');
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE);

    try {
      await callback(db);
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

};

module.exports = connection;
