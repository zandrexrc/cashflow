import moment from 'moment';


/**
 * Format a date into "YYYY-MM-DD" format before being saved in the database.
 * @param {string} dateString: a string representation of a Date object
 * @return {string}: a string in the format "YYYY-MM-DD"
 */
function dateStringToISO(dateString) {
    return moment(dateString).format("YYYY-MM-DD").substring(0, 10);
}


/**
 * Returns a string representation of a date in the specified format.
 * @param {Date} date: a Date object
 * @param {string} format: the date format 
 * @return {string}: a string in the format "MMMM YYYY"
 */
function printDate(date, format) {
    return moment(date).format(format);
}


/**
 * Returns a string in the format 'MMMM YYYY' (e.g. 'August 2020').
 * @param {Date} date: a Date object
 * @return {string}: a string in the format "MMMM YYYY"
 */
function printMonthName(date) {
    return `${moment(date).format("MMMM")} ${date.getFullYear()}`
}


/**
 * Checks whether a string is a valid float to be used as a currency amount.
 * @param {string} string: a string to be tested
 * @return {boolean}: true if the string is a valid amount, false otherwise
 */
function isValidCurrencyAmount(string) {
    return /^[+-]?[1-9]\d*(\.\d+)?$/.test(string);
}


/**
 * Tests if a string is a valid currency code.
 * @param {string} string: a string to be checked
 * @return {boolean}: true if the string is a valid code, false otherwise
 */
function isValidCurrencyCode(code) {
    return code.length === 3 && 
        !/[\d\s~`!@#$%^&*+=\-[\]\\';,/{}|\\":<>?()._]/g.test(code);
}


export {
    dateStringToISO,
    printDate,
    printMonthName,
    isValidCurrencyAmount,
    isValidCurrencyCode
};