/* eslint-env jest */
'use strict';

import { make2DArray, uniqueValues } from '../src/utils.js';

describe('make2DArray should', () => {
  test('create a 2D array board with all empty spaces', () => {
    expect(make2DArray(2, 2)).toEqual([
      [-1, -1],
      [-1, -1]
    ]);
  });

  test('return an immutable 2D array', () => {
    var arr = make2DArray(2, 2);

    expect(() => {
      arr.push('item');
    }).toThrow('Cannot add property 2, object is not extensible');
    expect(Object.isSealed(arr)).toBeTruthy();
  });
});

describe('uniqueValues should', () => {
  test('return an array of unique klaxes', () => {
    var klaxes = [
      { type: 'horizontal', tiles: [{ col: 0, row: 3 }, { col: 1, row: 3 }, { col: 2, row: 3 }] },
      { type: 'horizontal', tiles: [{ col: 1, row: 3 }, { col: 2, row: 3 }, { col: 0, row: 3 }] },
      { type: 'horizontal', tiles: [{ col: 2, row: 3 }, { col: 1, row: 3 }, { col: 0, row: 3 }] },
      { type: 'vertical', tiles: [{ col: 0, row: 5 }, { col: 0, row: 3 }, { col: 0, row: 4 }] },
      {
        type: 'vertical',
        tiles: [{ col: 0, row: 5 }, { col: 0, row: 3 }, { col: 0, row: 4 }, { col: 0, row: 5 }]
      }
    ];

    let result = [
      { type: 'horizontal', tiles: [{ col: 0, row: 3 }, { col: 1, row: 3 }, { col: 2, row: 3 }] },
      { type: 'vertical', tiles: [{ col: 0, row: 5 }, { col: 0, row: 3 }, { col: 0, row: 4 }] },
      {
        type: 'vertical',
        tiles: [{ col: 0, row: 5 }, { col: 0, row: 3 }, { col: 0, row: 4 }, { col: 0, row: 5 }]
      }
    ];

    const uniqueKlaxes = uniqueValues(klaxes);

    expect(uniqueKlaxes).toEqual(result);
  });

  test('return all similar but not unique klaxes of a similar size', () => {
    var klaxes = [
      { type: 'horizontal', tiles: [{ col: 0, row: 3 }, { col: 1, row: 3 }, { col: 2, row: 3 }] },
      { type: 'horizontal', tiles: [{ col: 0, row: 3 }, { col: 1, row: 3 }] },
    ];

    expect(uniqueValues(klaxes)).toEqual(klaxes);
  });
});
