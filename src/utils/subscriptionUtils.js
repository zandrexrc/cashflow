import moment from 'moment';


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

    // Log each subscription into the correct category (monthly / yearly)
    for (let i = 0; i < subscriptions.length; i++) {
        let date = new Date(subscriptions[i].firstBillingDate);
        if (subscriptions[i].cycle === "yearly") {
            yearlyExpenses += subscriptions[i].amount;
            if (date > today) {
                remainingExpenses += subscriptions[i].amount;
            }
        }
        if (subscriptions[i].cycle === "monthly") {
            monthlyExpenses += subscriptions[i].amount;
        }
    }

    // Calculate the remaining and total expenses in the current year
    let remainingMonthsInYear = 11 - today.getMonth();
    remainingExpenses += monthlyExpenses * remainingMonthsInYear;
    totalExpenses = (monthlyExpenses * 12) + yearlyExpenses;

    // Convert expenses into positive values
    totalExpenses = Math.abs(totalExpenses);
    remainingExpenses = Math.abs(remainingExpenses);
    return { totalExpenses, remainingExpenses };
}


/**
 * Calculate the next billing date of a subscription.
 * @param {Date} firstBillingDate: the first date the subscription was billed
 * @param {string} cycle: the billing cycle ('monthly', 'yearly')
 * @return {Date}: the next billing date of the subscription
 */
function calcNextBillingDate(firstBillingDate, cycle) {
    let today = new Date();
    let daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let nextBillingDate;

    if (cycle === "monthly") {
        if (firstBillingDate.getDate() > daysInCurrentMonth) {
            nextBillingDate = new Date(today.getFullYear(), today.getMonth(), daysInCurrentMonth);
        } else {
            nextBillingDate = new Date(today.getFullYear(), today.getMonth(), firstBillingDate.getDate());
        }

        if (nextBillingDate < today) {
            nextBillingDate = new Date(today.getFullYear(), today.getMonth() + 1, firstBillingDate.getDate());
        }
    } else {
        nextBillingDate = new Date(today.getFullYear(), firstBillingDate.getMonth(), firstBillingDate.getDate());
        if (nextBillingDate < today) {
            nextBillingDate = new Date(today.getFullYear() + 1, firstBillingDate.getMonth(), firstBillingDate.getDate());
        }
    }
    return nextBillingDate;
}


/**
 * Returns a string describing the time left until the next billing date 
 * of a subscription (e.g. 'today', 'tomorrow', '3 days').
 * @param {Date} firstBillingDate: the first date the subscription was billed
 * @param {string} cycle: the billing cycle ('monthly', 'yearly')
 * @return {string}: when the next billing date is due
 */
function printNextBillingDate(firstBillingDate, cycle) {
    let today = moment();
    let billingDate = moment(calcNextBillingDate(firstBillingDate, cycle));
    let daysFromToday = billingDate.diff(today, "days");
    
    if (daysFromToday === 0) {
        return "Today";
    } else if (daysFromToday === 1) {
        return "Tomorrow";
    } else if (daysFromToday < 7) {
        return `${daysFromToday} days`;
    } else if (daysFromToday < 30) {
        let weeks = Math.floor(daysFromToday / 7);
        return weeks === 1 ? "1 week" : `${weeks} weeks`;
    } else if (daysFromToday < 330) {
        let months = Math.floor(daysFromToday / 30);
        return months === 1 ? "1 month" : `${months} months`;
    } else {
        return "1 year";
    }
}


/**
 * Sorts two subscriptions based on their next billing dates
 * @param {Subscription} a: a subscription object
 * @param {Subscription} b: another subscription object
 * @return {number}: the difference between the next billing dates of a and b
 */
function sortNextBillingDates(a, b) {
    let date1 = calcNextBillingDate(new Date(a.firstBillingDate), a.cycle);
    let date2 = calcNextBillingDate(new Date(b.firstBillingDate), b.cycle);
    return date1 - date2;
}


export {
    calcMonthlySubscriptions,
    calcYearlySubscriptions,
    printNextBillingDate,
    sortNextBillingDates
};