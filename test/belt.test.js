'use strict';

const Belt = require('../belt');
const belt = new Belt;

class mockTile {
    constructor(position, colour) {
        this.position = position;
        this.colour = colour;
    }
}

let tile = new mockTile(1.3721783156506717, 'red');

describe('The belt should', () => {
    test('', () => {
        
    });
    // test('create a 2D array', () => {
    //     expect(belt.make2DArray(2, 2)).toEqual([[undefined, undefined], [undefined, undefined]]);
    // });

    // test('Add another tile to the conveyor belt when required', () => {
    //     expect(belt.addNewTile()).toEqual(tile);
    // });
});
