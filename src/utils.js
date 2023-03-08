'use strict';

/**
 * Makes a 2d array of a specified size
 * @param {number} cols - How many columns in the array
 * @param {number} rows - How many rows in the array
 * @returns {Array} - Returns a 2d array of size cols * rows
 */
export function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      arr[i][j] = -1;
    }
  }

  Object.seal(arr);

  return arr;
}

/**
 *
 * @param {{type: String, tiles: Array<{col: Number, row: Number}>}} arr1
 * @param {{type: String, tiles: Array<{col: Number, row: Number}>}} arr2
 * @returns {Boolean} - Returns true or false depending on whether the arrays contain all of the
 *     same values somewhere
 * @todo Make more generic by comparing object keys rather than specifying
 */
export function isDuplicate(arr1, arr2) {
  if (Object.keys(arr1.tiles).length !== Object.keys(arr2.tiles).length) return false;

  return arr1.tiles.map((pos1) => {
    return arr2.tiles.map((pos2) => {
      return pos1.col === pos2.col && pos1.row === pos2.row;
    }).some((v) => v === true);
  }).every((v) => v === true);
}

/**
 *
 * @param {Array<{type: String, tiles: Array<{col: Number, row: Number}>}>} a
 * @returns {Array<{type: String, tiles: Array<{col: Number, row: Number}>}>} - Returns true or
 *     false depending on whether the arrays contain all of the same the values somewhere
 */
export function uniqueValues(a) {
  return a.filter((value, index, array) => {
    return index === array.findIndex((t) => {
      return isDuplicate(value, t);
    });
  });
}
