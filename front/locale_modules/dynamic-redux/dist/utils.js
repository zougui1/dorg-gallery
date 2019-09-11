"use strict";

/**
 * remove all useless spaces within an array of strings
 * @param {String[]} array
 * @returns {String[]}
 */
var removeSpaces = function removeSpaces(array) {
  return array.map(function (str) {
    return str.trim();
  }).filter(function (str) {
    return str;
  });
};

exports.removeSpaces = removeSpaces;