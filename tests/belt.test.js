/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
'use strict';

import Belt from '../src/belt.js';
import Tile from '../src/tile';

window.random = (min) => 1;
window.color = (r, g, b) => 1;
window.millis = () => null;
window.push = () => null;
window.stroke = () => null;
window.noStroke = () => null;
window.strokeWeight = () => null;
window.translate = () => null;
window.fill = () => null;
window.rect = () => null;
window.pop = () => null;

const config = {
    'speed': 2,
    'lanes': 5,
    'tileSize': 4,
    'tileColours': {
        'blue': color(0, 0, 255),
        'green': color(0, 255, 0)
    }
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
            'belt': [
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1]
            ],
            'cols': 5,
            'config': {
                'speed': 2,
                'lanes': 5,
                'tileColours': {
                    'blue': 1,
                    'green': 1
                },
                'tileSize': 4
            },
            'rows': 5,
            'tileHeight': 3,
            'tileWidth': 4
        });
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

    test('return a random empty lane from the belt', () => {
        belt.belt = [
            [-1, tile, tile, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(belt.getRandomEmptyLane()).toBe(1);
    });

    test('return null from the belt if there are no empty lanes', () => {
        belt.belt = [
            [tile, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1]
        ];

        expect(belt.getRandomEmptyLane()).toBe(null);
    });

    test('belt should move all tiles one row lower when ready', () => {
        const tile1 = new Tile(config, 'red');
        const tile2 = new Tile(config, 'green');
        tile1.lastUpdate = 1;
        tile2.lastUpdate = 1;

        window.millis = () => 5;

        belt.belt = [
            [tile1, -1, tile2, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBelt = [
            [-1, tile1, -1, tile2, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(belt.step()).toEqual([]);
        expect(belt.belt).toEqual(newBelt);
    });

    test('belt should return any tiles on the bottom row when they\'re ready to move', () => {
        const tile3 = new Tile(config, 'red');
        const tile4 = new Tile(config, 'green');
        const tile5 = new Tile(config, 'blue');
        tile3.lastUpdate = 1;
        tile4.lastUpdate = 1;
        tile5.lastUpdate = 3;

        window.millis = () => 5;

        belt.belt = [
            [tile3, -1, -1, -1, -1],
            [-1, -1, -1, -1, tile5],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, tile4],
            [-1, -1, -1, -1, -1]
        ];

        const newBelt = [
            [-1, tile3, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(belt.step()).toEqual(
            [{'tile': tile4, 'col': 3},
             {'tile': tile5, 'col': 1}]
        );
        expect(belt.belt).toEqual(newBelt);
    });

    test('belt should not move tiles one row lower when not ready', () => {
        const tile6 = new Tile(config, 'purple');
        const tile7 = new Tile(config, 'orange');
        tile6.lastUpdate = 1;
        tile7.lastUpdate = 1;

        window.millis = () => 2.9999;

        belt.belt = [
            [tile6, -1, -1, -1, -1],
            [-1, -1, -1, -1, tile7],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        
        const newBelt = [
            [tile6, -1, -1, -1, -1],
            [-1, -1, -1, -1, tile7],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        belt.step();
        expect(belt.belt).toEqual(newBelt);
    });

    test('belt', () => {
        const spy = jest.spyOn(tile, 'update');

        belt.belt = [
            [tile, -1, -1, -1, -1],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        belt.draw();
        expect(spy).toHaveBeenCalledTimes(2);

        spy.mockRestore();
    });
});
