const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const connection = {

  async openDb(filename) {
    return open({
      filename,
      driver: sqlite3.Database
    });
  },

  async query(callback) {
    const dbPath = path.resolve(__dirname, 'cashflow.db');
    const db = await this.openDb(dbPath);

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
