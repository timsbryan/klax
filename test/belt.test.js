/* eslint-env jest */
'use strict';

const Belt = require('../belt');
const config = { 'lanes': 1, 'tileSize': 4 };

class mockTile {
    constructor(position, colour) {
        this.position = position;
        this.colour = colour;
    }
}

// let tile = new mockTile(1.3721783156506717, 'red');

describe('The belt should', () => {
    const belt = new Belt('tileImages', config);
    test('be setup with some default', () => {
        expect(belt).toEqual({
            'belt': [[-1]],
            'cols': 1,
            'rows': 1,
            'tileHeight': 3,
            'tileImage': 'tileImages',
            'tileWidth': 4
        });
    });
});

    // test('create a 2D array', () => {
    //     expect(belt.make2DArray(2, 2)).toEqual([[undefined, undefined], [undefined, undefined]]);
    // });

    // test('Add another tile to the conveyor belt when required', () => {
    //     expect(belt.addNewTile()).toEqual(tile);
    // });
// });
// 