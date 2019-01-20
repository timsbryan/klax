/* eslint-env jest */
'use strict';

window.random = (min) => 0.5;
import Belt from '../src/belt.js';
const config = { 'lanes': 1, 'tileSize': 4 };
const tileImage = 'image';

import Tile from '../src/tile';
jest.mock('../src/tile');

let tile = new Tile(1.3721783156506717, 'red');

describe('The belt should', () => {
    let belt;

    beforeEach(() => {
        belt = new Belt(config, tileImage);
    });

    test('be setup with some default', () => {
        expect(belt).toEqual({
            'belt': [[-1]],
            'cols': 1,
            'config': {'lanes': 1, 'tileSize': 4},
            'rows': 1,
            'tileHeight': 3,
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

