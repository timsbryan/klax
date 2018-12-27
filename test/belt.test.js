/* eslint-env jest */
'use strict';

const Belt = require('../belt');

class mockTile {
    constructor(position, colour) {
        this.position = position;
        this.colour = colour;
    }
}



let tile = new mockTile(1.3721783156506717, 'red');

test('The belt should', () => {
    const belt = new Belt();
    expect(belt).toBe(1);
});

    // test('create a 2D array', () => {
    //     expect(belt.make2DArray(2, 2)).toEqual([[undefined, undefined], [undefined, undefined]]);
    // });

    // test('Add another tile to the conveyor belt when required', () => {
    //     expect(belt.addNewTile()).toEqual(tile);
    // });
// });
// 