// Accounts
export const EmptyAccount = Object.freeze({
    name: '',
    type: '',
    balance: 0,
});
export const SampleAccount = Object.freeze({
    name: 'Personal',
    type: 'Checking',
    balance: 4200.42,
});

// Subscriptions
export const EmptySubscription = Object.freeze({
    name: '',
    firstBillingDate: '',
    cycle: 'monthly',
    accountId: null,
    category: '',
    amount: 0,
});
export const SampleSubscription = Object.freeze({
    name: 'Netflix',
    firstBillingDate: '2020-07-11',
    cycle: 'monthly',
    account: 'Personal',
    category: 'Entertainment',
    amount: -89,
});

// Transactions
export const EmptyTransaction = Object.freeze({
    date: '',
    description: '',
    accountId: null,
    category: '',
    amount: 0,
});
export const SampleTransaction = Object.freeze({
    date: '2020-07-11',
    description: 'Lunch with Alice and Bob',
    account: 'Personal',
    category: 'Food',
    amount: -99.99,
});

// Settings
export const InitialSettings = Object.freeze({
    currency: 'NOK',
    dateFormat: 'dd.MM.yyyy',
    appTheme: 'light',
});