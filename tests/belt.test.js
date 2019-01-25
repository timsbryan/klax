/* eslint-env jest */
'use strict';

import Belt from '../src/belt.js';
import Tile from '../src/tile';
// jest.mock('../src/tile');

window.random = (min) => 1;
window.color = (r,g,b) => 1;
window.millis = () => null;
const config = { 'lanes': 1, 'tileSize': 4, 'tileColours': {
    'blue': color(0, 0, 255),
    'green': color(0, 255, 0) }
};

describe('The belt should', () => {
    let tile;
    let belt;

    beforeEach(() => {
        tile = new Tile(config, 'green');
        belt = new Belt(config);
    });

    test('be setup with some default', () => {
        expect(belt).toEqual({
            'belt': [[-1]],
            'cols': 1,
            'config': {'lanes': 1, 'tileColours': { 'blue': 1, 'green': 1 }, 'tileSize': 4},
            'rows': 1,
            'tileHeight': 3,
            'tileWidth': 4
        });
    });

    test('create a 2D array board with all empty spaces', () => {
        expect(belt.make2DArray(2, 2)).toEqual([[-1, -1], [-1, -1]]);
    });

    test('return true if the next space in the belt is empty', () => {
        belt.belt = [
            [tile, tile, tile, tile, tile],
            [tile, tile, tile, -1, tile],
            [tile, tile, tile, tile, tile],
            [tile, tile, tile, tile, tile],
            [tile, tile, tile, tile, tile]
        ];

        expect(belt.nextSpaceEmpty(3, 0)).toBe(true);
    });

    test('return false if the next space in the belt has a tile in it', () => {
        belt.belt = [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, tile, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(belt.nextSpaceEmpty(3, 0)).toBe(false);
    });

    test('add another tile to the conveyor belt when required', () => {
        belt.belt = [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const changedBelt = [
            [-1, -1, -1, -1, -1],
            [tile, -1, -1, -1, -1]
        ];

        belt.addNewTile();
        expect(belt.belt).toEqual(changedBelt);
    });

    test('add a tile to the top of belt at the correct column', () => {
        belt.belt = [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        let newBelt = [
            [-1, -1, tile, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        belt.pushTileToTop(tile, 2);

        expect(belt.belt).toEqual(newBelt);
    });
});

