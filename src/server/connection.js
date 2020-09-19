// database configuration
const mysql = require("mysql");
const config = require("./config")["db"];
const util = require("util");

var connection = {

  // establish connection
  createDBConnection() {
    const connection = mysql.createConnection(config);

    // make standard db functions return Promise objects
    return {
      query(sql, args) {
        return util.promisify(connection.query).call(connection, sql, args);
      },
      beginTransaction() {
        return util.promisify(connection.beginTransaction).call(connection);
      },
      commit() {
        return util.promisify(connection.commit).call(connection);
      },
      rollback() {
        return util.promisify(connection.rollback).call(connection);
      },
      close() {
        return util.promisify(connection.end).call(connection);
      }
    };
  },

  // function to handle async code within a transaction
  async dbQuery(callback) {
    const db = this.createDBConnection();

    try {
      await db.beginTransaction();
      await callback(db);
      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    } finally {
      await db.close();
    }
  }

};

module.exports = connection;
