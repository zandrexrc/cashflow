-- Create tables
CREATE TABLE "accounts" (
	"accountId" INTEGER NOT NULL,
	"name" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"balance" REAL NOT NULL,
	PRIMARY KEY("accountId" AUTOINCREMENT)
);

CREATE TABLE "transactions" (
	"transactionId" INTEGER NOT NULL,
	"date" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"category" TEXT,
	"amount" REAL NOT NULL,
	"accountId"	INTEGER NOT NULL,
	FOREIGN KEY("accountId") REFERENCES "accounts"("accountId"),
	PRIMARY KEY("transactionId" AUTOINCREMENT)
);

CREATE TABLE "subscriptions" (
	"subscriptionId" INTEGER NOT NULL,
	"name" TEXT NOT NULL,
	"firstBillingDate" TEXT NOT NULL,
	"cycle"	TEXT NOT NULL,
	"category" TEXT,
	"amount" REAL NOT NULL,
	"accountId"	INTEGER NOT NULL,
	PRIMARY KEY("subscriptionId" AUTOINCREMENT),
	FOREIGN KEY("accountId") REFERENCES "accounts"("accountId")
);

CREATE TABLE "settings" (
	"userId" INTEGER NOT NULL,
	"userSettings" TEXT NOT NULL,
	PRIMARY KEY("userId" AUTOINCREMENT)
);


-- TRIGGERS
CREATE TRIGGER update_account_after_insert
AFTER INSERT ON transactions
BEGIN 
	UPDATE accounts
	SET balance = balance + NEW.amount
	WHERE accountId = NEW.accountId;
END;

CREATE TRIGGER update_account_after_update
AFTER UPDATE ON transactions
BEGIN 
	UPDATE accounts
	SET balance = balance - OLD.amount + NEW.amount
	WHERE accountId = NEW.accountId;
END;

CREATE TRIGGER update_account_after_delete
AFTER DELETE ON transactions
BEGIN 
	UPDATE accounts
	SET balance = balance - OLD.amount
	WHERE accountId = OLD.accountId;
END;

CREATE TRIGGER delete_all_items_in_account
AFTER DELETE ON accounts
BEGIN 
	DELETE FROM transactions
	WHERE accountId = OLD.accountId;
	DELETE FROM subscriptions 
	WHERE accountId = OLD.accountId;
END;


-- Init settings
INSERT INTO settings (userSettings) VALUES
('{"currency":"NOK","dateFormat":"dd.MM.yyyy","appTheme":"light"}');