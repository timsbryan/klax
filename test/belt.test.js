/* eslint-env jest */
'use strict';

const Belt = require('../belt');
const config = { 'lanes': 1, 'tileSize': 4 };
const tileImage = 'image';
let belt;

beforeEach(() => {
    belt = new Belt(tileImage, config);
});

// let tile = new mockTile(1.3721783156506717, 'red');

describe('The belt should', () => {

    test('be setup with some default', () => {
        expect(belt).toEqual({
            'belt': [[-1]],
            'cols': 1,
            'rows': 1,
            'tileHeight': 3,
            'tileImage': 'image',
            'tileWidth': 4
        });
    });

    test('create a 2D array board with all empty spaces', () => {
        expect(belt.make2DArray(2, 2)).toEqual([[-1, -1], [-1, -1]]);
    });

    test.skip('Add another tile to the conveyor belt when required', () => {
        expect(belt.addNewTile()).toEqual(tile);
    });
});

