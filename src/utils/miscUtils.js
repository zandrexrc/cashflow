import { format } from 'date-fns';
import { DATE_FORMAT_ISO } from '../constants';


/**
 * Format a date into "YYYY-MM-DD" format before being saved in the database.
 * @param {string} dateString: a string representation of a Date object
 * @return {string}: a string in the format "YYYY-MM-DD"
 */
function dateStringToISO(dateString) {
    return format(new Date(dateString), DATE_FORMAT_ISO);
}


/**
 * Returns a string representation of a date in the specified pattern.
 * @param {Date | string} date: a string representation of a Date object
 * @param {string} format: the date format pattern 
 * @return {string}: a string in the given pattern
 */
function printDate(date, pattern) {
    return format(new Date(date), pattern);
}


/**
 * Checks whether a string is a valid float to be used as a currency amount.
 * @param {string} string: a string to be tested
 * @return {boolean}: true if the string is a valid amount, false otherwise
 */
function isValidCurrencyAmount(string) {
    return /^[+-]?[0-9]\d*(\.\d+)?$/.test(string);
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
    isValidCurrencyAmount,
    isValidCurrencyCode
};