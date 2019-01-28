
/* eslint-env jest */
'use strict';

import Bin from '../src/bin.js';
import Tile from '../src/tile.js';

window.millis = () => null;

const config = {
    'speed': 2,
    'lanes': 5,
    'tileSize': 4
};

describe('The bin should', () => {
    let bin;
    let tile;

    beforeEach(() => {
        bin = new Bin(config);
        tile = new Tile(config, 'green');
    });

    test('be setup with some default', () => {
        expect(bin).toEqual({
          'bin': [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ],
        'cols': 5,
        'config': config,
        'rows': 5,
        'tileHeight': 30,
        'tileWidth': 4
        });
    });

    test('create a 2D array board with all empty spaces', () => {
        expect(bin.make2DArray(2, 2)).toEqual([
            [-1, -1],
            [-1, -1]
        ]);
    });

    test('get the lowest row in a lane that doesn\'t already have a tile', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, tile, tile, tile, tile]
        ];

        expect(bin.getLowestEmptyRow(0)).toBe(2);
        expect(bin.getLowestEmptyRow(1)).toBe(3);
        expect(bin.getLowestEmptyRow(2)).toBe(0);
    });

    test('return null when the lane is full of tiles', () => {
        bin.bin = [
            [tile, tile, tile, tile, tile]
        ];

        expect(bin.getLowestEmptyRow(0)).toBe(null);
    });
});