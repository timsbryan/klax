/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
'use strict';

import Tile from '../src/tile.js';
import Bin from '../src/bin.js';

jest.mock('../src/sprite.js');

window.fill = () => null;
window.millis = () => null;
window.pop = () => null;
window.push = () => null;
window.rect = () => null;
window.stroke = () => null;
window.noStroke = () => null;
window.strokeWeight = () => null;
window.translate = () => null;
window.height = () => null;
const Image = (w,h) => null;
const createImage = (width, height) => Image;
const img = createImage(1, 1);

const config = {
    'speed': 2,
    'tileColours': {
        'green': { 'firstTileYPos': 0 },
        'red': { 'firstTileYPos': 0 }
    },
    'lanes': 5,
    'tileSize': 4
};

describe('The bin should', () => {
    let bin;
    let tile;

    beforeAll(() => {
        bin = new Bin(config);
        tile = new Tile(config, 1, 'green', img);
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

    test('get the lowest row in a lane that doesn\'t already have a tile', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, tile, tile, tile, tile]
        ];

        expect(bin.getLowestEmptyPosition(0)).toBe(2);
        expect(bin.getLowestEmptyPosition(1)).toBe(3);
        expect(bin.getLowestEmptyPosition(2)).toBe(0);
    });

    test('return null when the lane is full of tiles when trying to get the lowest empty row',
        () => {
            bin.bin = [
                [tile, tile, tile, tile, tile]
            ];

            expect(bin.getLowestEmptyPosition(0)).toBeNull();
        });

    test('put the tile at the lowest empty position in that column', () => {
        const tile1 = new Tile(config, 1, 'red', img);

        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
        ];

        const newBin = [
            [-1, -1, tile1, tile, tile],
            [-1, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
        ];

        bin.pushToBin(tile1, 0);

        expect(bin.bin).toEqual(newBin);
    });

    test('return an empty object if there are no empty spaces', () => {
        const tile1 = new Tile(config, 1, 'red', img);

        bin.bin = [
            [-1, -1, -1, tile, tile],
            [tile, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile, tile],
            [tile, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(bin.pushToBin(tile1, 1)).toEqual({});
        expect(bin.bin[1]).toEqual(newBin[1]);
    });

    test(`return an object with the position of tiles that form an horizontal klax
        when an horizontal klax of 3 tiles is created`, () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(bin.pushToBin(tile, 2)).toMatchObject(
            [{
                'type': 'horizontal',
                'tiles': [{ 'col': 2, 'row': 4 }, { 'col': 1, 'row': 4 }, { 'col': 0, 'row': 4 }]
            }]
        );

        expect(bin.bin).toEqual(bin.bin);
    });

    //TODO This will be moved over to Game class
    test.skip('remove tiles when it forms a vertical klax', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(1, 2);

        expect(bin.bin).toEqual(newBin);
    });

    //TODO This will be moved over to Game class
    test.skip('remove tiles when it forms a horizontal klax', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(1, 4);

        expect(bin.bin).toEqual(newBin);
    });

    //TODO This will be moved over to Game class
    test.skip('remove tiles when it forms a diagonal klax', () => {
        const tile1 = new Tile(config, 1, 'red', img);

        bin.bin = [
            [-1, -1, tile, tile1, tile1],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile1, tile1],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(0, 2);

        expect(bin.bin).toEqual(newBin);
    });

    test('don\'t remove a tile when it forms no klaxes', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(0, 3);

        expect(bin.bin).toEqual(newBin);
    });

    test('look through every tile in the bin', () => {
        const spy = jest.spyOn(bin, 'checkForKlax');

        bin.bin = [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkAllForKlax();

        expect(spy).toHaveBeenCalledTimes(25);

        spy.mockRestore();
    });


    test('return any klaxes that are found in the bin', () => {
        bin.bin = [
            [-1, -1, tile, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const expected = [
            { 'type': 'vertical', 'tiles': [
                { 'col': 0, 'row': 2 },
                { 'col': 0, 'row': 3 },
                { 'col': 0, 'row': 4 }
            ]},
            { 'type': 'horizontal', 'tiles': [
                { 'col': 0, 'row': 4 },
                { 'col': 1, 'row': 4 },
                { 'col': 2, 'row': 4 }
            ]}
        ];

        const result = bin.checkAllForKlax();


        expect(result).toHaveLength(2);

        expect(result).toMatchObject(expected);
    });

    test('draw each tile in the bin', () => {
        let tile = new Tile(config, 1, 'red', img);
        let tile1 = new Tile(config, 1, 'red', img);

        const spy1 = jest.spyOn(tile, 'drawFrame');
        const spy2 = jest.spyOn(tile1, 'drawFrame');

        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile1],
            [-1, -1, -1, -1, tile1],
            [-1, -1, -1, -1, -1]
        ];

        expect(spy1).not.toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();

        bin.draw();

        expect(spy1).toHaveBeenCalledTimes(4);
        expect(spy2).toHaveBeenCalledTimes(2);

        spy1.mockRestore();
        spy2.mockRestore();
    });
});
