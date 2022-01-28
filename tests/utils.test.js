/* eslint-env jest */
'use strict';

import { make2DArray } from '../src/utils.js';

describe('make2DArray should', () => {
  test('create a 2D array board with all empty spaces', () => {
    expect(make2DArray(2, 2)).toEqual([
      [-1, -1],
      [-1, -1]
    ]);
  });

  test('return an immutable 2D array', () => {
    var arr = make2DArray(2, 2);

    expect(() => { arr.push('item') }).toThrow('Cannot add property 2, object is not extensible')
    expect(Object.isSealed(arr)).toBeTruthy;
  });
});
