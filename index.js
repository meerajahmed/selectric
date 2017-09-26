/**
 * Created by mahme4 on 9/26/2017.
 */
'use strict';

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = function(number, locale) {
  return number.toLocaleString(locale);
};