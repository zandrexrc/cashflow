/*!40101 SET NAMES utf8mb4 */;
/*!40101 SET character_set_client = utf8mb4 */;

-- Create tables
CREATE TABLE accounts (
    accountID int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    balance DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (accountID)
);

CREATE TABLE transactions (
    transactionID int NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    accountID int NOT NULL,
    category VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (transactionID),
    FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);

CREATE TABLE subscriptions (
    subscriptionID int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    firstBillingDate DATE NOT NULL,
    cycle VARCHAR(255) NOT NULL,
    accountID int NOT NULL,
    category VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (subscriptionID),
    FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);

CREATE TABLE settings (
    userID int NOT NULL AUTO_INCREMENT,
    userSettings TEXT NOT NULL,
    PRIMARY KEY (userID)
);

-- Init settings
INSERT INTO settings(userSettings) VALUES
('{"currency":"NOK","dateFormat":"DD.MM.YYYY","appTheme":"light"}');