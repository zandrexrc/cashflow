const queries = require("./queries");

module.exports = function(app) {
  // API ==================================================
  // ACCOUNTS
  app.get("/api/accounts", function(req, res) {
    console.log("get accounts");
    queries.accounts.getAccounts(res);
  });

  app.post("/api/accounts", function(req, res) {
    console.log("create new account");
    queries.accounts.addAccount(req, res);
  });

  app.put("/api/accounts/:id", function(req, res) {
    console.log("edit account");
    queries.accounts.editAccount(req, res);
  });

  app.delete("/api/accounts/:id", function(req, res) {
    console.log("delete account");
    queries.accounts.deleteAccount(req, res);
  });


  // TRANSACTIONS
  app.get("/api/transactions", function(req, res) {
    console.log("get transactions");
    queries.transactions.getTransactions(res);
  });

  app.post("/api/transactions", function(req, res) {
    console.log("create new transaction");
    queries.transactions.addTransaction(req, res);
  });

  app.put("/api/transactions/:id", function(req, res) {
    console.log("edit transaction");
    queries.transactions.editTransaction(req, res);
  });

  app.delete("/api/transactions/:id", function(req, res) {
    console.log("delete transaction");
    queries.transactions.deleteTransaction(req, res);
  });


  // SUBSCRIPTIONS
  app.get("/api/subscriptions", function(req, res) {
    console.log("get subscriptions");
    queries.subscriptions.getSubscriptions(res);
  });

  app.post("/api/subscriptions", function(req, res) {
    console.log("create new subscription");
    queries.subscriptions.addSubscription(req, res);
  });

  app.put("/api/subscriptions/:id", function(req, res) {
    console.log("edit subscription");
    queries.subscriptions.editSubscription(req, res);
  });

  app.delete("/api/subscriptions/:id", function(req, res) {
    console.log("delete subscription");
    queries.subscriptions.deleteSubscription(req, res);
  });


  // SETTINGS
  app.get("/api/settings", function(req, res) {
    console.log("get settings");
    queries.settings.getSettings(res);
  });

  app.put("/api/settings", function(req, res) {
    console.log("edit settings");
    queries.settings.editSettings(req, res);
  });


  // ROOT ==================================================
  app.get("/", function(req, res) {
    res.json({
        message: "you shouldnt be here"
    });
  });
};
