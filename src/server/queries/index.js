const accounts = require("./accounts");
const transactions = require("./transactions");
const subscriptions = require("./subscriptions");
const settings = require("./settings");

const queries = {
    accounts,
    transactions,
    subscriptions,
    settings
};

module.exports = queries;