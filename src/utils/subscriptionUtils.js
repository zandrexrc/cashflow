import { addMonths, addYears, isPast, isValid as isValidDate, setMonth, setYear } from 'date-fns';
import { isValidCurrencyAmount } from './miscUtils';


/**
 * Calculate the next billing date of a subscription.
 * @param {string} firstBillingDate: the first date the subscription was billed
 * @param {string} cycle: the billing cycle ('monthly', 'yearly')
 * @return {Date}: the next billing date of the subscription
 */
function calcNextBillingDate(firstBillingDate, cycle) {
    let today = new Date();
    let nextBillingDate = new Date(firstBillingDate);
    nextBillingDate = setYear(nextBillingDate, today.getFullYear());

    if (cycle === "monthly") {
        nextBillingDate = setMonth(nextBillingDate, today.getMonth());

        if (isPast(nextBillingDate)) {
            nextBillingDate = addMonths(nextBillingDate, 1);
        }
    } else {
        if (isPast(nextBillingDate)) {
            nextBillingDate = addYears(nextBillingDate, 1);
        }
    }
    return nextBillingDate;
}


/**
 * Calculate the monthly total and remaining subscription expenses 
 * based on current date.
 * @param {Array<subscriptions>} subscriptions: a list of subscriptions
 * @return {Object}: an object containing the total and remaining expenses
 */
function calcMonthlySubscriptions(subscriptions) {
    let today = new Date();

    // Use only the relevant subscriptions
    let currentMonthSubscriptions = subscriptions.filter(obj =>
        obj.cycle === "monthly" || 
        new Date(obj.firstBillingDate).getMonth() === today.getMonth()    
    );

    // Aggregate the total and remaining expenses from the subscriptions
    let totalExpenses = 0;
    let remainingExpenses = 0;
    for (let i = 0; i < currentMonthSubscriptions.length; i++) {
        let date = new Date(currentMonthSubscriptions[i].firstBillingDate).getDate();
        if (date > today.getDate()) {
            remainingExpenses += currentMonthSubscriptions[i].amount;
        }
        totalExpenses += currentMonthSubscriptions[i].amount;
    }

    // Convert expenses into positive values
    totalExpenses = Math.abs(totalExpenses);
    remainingExpenses = Math.abs(remainingExpenses);
    return { totalExpenses, remainingExpenses };
}


/**
 * Calculate the yearly total and remaining subscription expenses 
 * based on current date.
 * @param {Array<subscriptions>} subscriptions: a list of subscriptions
 * @return {Object}: an object containing the total and remaining expenses
 */
function calcYearlySubscriptions(subscriptions) {
    let today = new Date();
    let totalExpenses = 0;
    let remainingExpenses = 0;
    let monthlyExpenses = 0;
    let yearlyExpenses = 0;
    const currentMonthExpenses = calcMonthlySubscriptions(subscriptions);

    // Log each subscription into the correct category (monthly / yearly)
    for (let i = 0; i < subscriptions.length; i++) {
        let date = new Date(subscriptions[i].firstBillingDate);
        if (subscriptions[i].cycle === "yearly") {
            yearlyExpenses += subscriptions[i].amount;
            if (isPast(date)) {
                remainingExpenses += subscriptions[i].amount;
            }
        }
        if (subscriptions[i].cycle === "monthly") {
            monthlyExpenses += subscriptions[i].amount;
        }
    }

    // Calculate the remaining and total expenses in the current year
    let remainingMonthsInYear = 11 - today.getMonth();
    remainingExpenses += monthlyExpenses * remainingMonthsInYear - currentMonthExpenses.remainingExpenses;
    totalExpenses = (monthlyExpenses * 12) + yearlyExpenses;

    // Convert expenses into positive values
    totalExpenses = Math.abs(totalExpenses);
    remainingExpenses = Math.abs(remainingExpenses);
    return { totalExpenses, remainingExpenses };
}


/**
 * Determines if a subscription passes the account filter.
 * @param {String or number} term: the account filter ("all" or accountID)
 * @param {Subscription} subscription: a subscription object
 * @return {boolean}: true if the subscription passes the filter, false if not
 */
const filterByAccount = (term, subscription) => {
    return term === "All" || parseInt(term) === subscription.accountID;
}

/**
 * Determines if a subscription passes the category filter.
 * @param {String} term: the category filter ("all" or category name)
 * @param {Subscription} subscription: a subscription object
 * @return {boolean}: true if the subscription passes the filter, false if not
 */
const filterByCategory = (term, subscription) => {
    if (subscription.category) {
        return term === "All" || subscription.category === term;
    } else {
        return term === "All" || term === "Uncategorized";
    }
}


/**
 * Filter the subscriptions list based on a given set of filtering conditions.
 * @param {Array<Subscription>} subscriptions: a list of subscriptions
 * @param {Object} filters: the filter conditions to be used 
 * @return {Array<Subscription>}: the filtered list of subscriptions
 */
function filterSubscriptions(subscriptions, filters) {
    return subscriptions.filter(s => (
        filterByAccount(filters.account, s) 
        && filterByCategory(filters.category, s)
    )).sort((a, b) => new Date(a.nextBillingDate) - new Date(b.nextBillingDate));
}


/**
 * Checks if a subscription has valid values and attributes
 * @param {Subscription} subscription: the subscription to be validated
 * @return {boolean}: true if the subscription is valid, false otherwise
 */
function validateSubscription(subscription) {
    let isValid = false;

    const hasAllRequiredAttributes = 
        subscription.subscriptionID && subscription.name 
        && subscription.firstBillingDate && subscription.cycle 
        && subscription.amount && subscription.accountID;

    if (hasAllRequiredAttributes) {
        const dateisValid = isValidDate(new Date(subscription.firstBillingDate));
        const nameIsValid = subscription.name.trim().length > 0;
        const amountIsValid = isValidCurrencyAmount(subscription.amount);
        isValid = dateisValid && nameIsValid && amountIsValid;
    }

    return isValid;
}


export {
    calcNextBillingDate,
    calcMonthlySubscriptions,
    calcYearlySubscriptions,
    filterSubscriptions,
    validateSubscription
};