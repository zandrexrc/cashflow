-- Sample data

INSERT INTO accounts (name, type, balance) VALUES
('Main', 'checking', 420.00),
('Savings', 'savings', 6969.69);
 
INSERT INTO transactions (date, description, accountId, category, amount) VALUES
('2020-08-01', 'Never gonna give you up', 1, 'Personal', -77.7),
('2020-08-02', 'Never gonna let you down', 2, 'Savings', 1500.00),
('2020-08-05', 'Never gonna run around', 1, 'Food', -99.99),
('2020-08-08', 'And desert you', 2, 'Savings', 500.00),
('2020-08-08', 'Never gonna make you cry', 1, 'Personal', -299.99),
('2020-08-14', 'Never gonna say goodbye', 1, 'Food', -14.99),
('2020-08-19', 'Never gonna tell a lie', 1, NULL, -1200.00),
('2020-08-22', 'Or hurt you', 1, NULL, -500.00),
('2020-08-25', "We've known each other for so long", 1, 'Entertainment', -45.00),
('2020-08-25', "Your heart's been aching", 2, 'Savings', 1000.00),
('2020-08-26', "But you're too shy to say it", 1, 'Entertainment', -459.00),
('2020-08-28', "Inside we both know what's been going on", 1, NULL, -10.00),
('2020-08-31', "We know the game and we're gonna play it", 2, 'Savings', 200.00);
 
INSERT INTO subscriptions (name, firstBillingDate, cycle, accountId, category, amount) VALUES
('Netflix', '2020-07-07', 'monthly', 1, 'Entertainment', -109.00),
('Spotify', '2020-07-09', 'monthly', 1, 'Entertainment', -89.00),
('Telenor', '2020-07-01', 'monthly', 1, 'Necessities', -229.00),
('Ruter', '2020-08-11', 'yearly', 1, 'Necessities', -7700.00);