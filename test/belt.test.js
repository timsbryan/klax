'use strict';

const Belt = require('../belt');
const belt = new Belt;
const P5 = require('p5');
let myP5;


class mockTile {
    constructor(position, colour) {
        this.position = position;
        this.colour = colour;
    }
}

beforeEach(() => {
    new P5(function(p) {
        p.setup = function() {
            myP5 = p;
        };
    });
});

afterEach(() => {
    myP5.remove();
});

let tile = new mockTile(1.3721783156506717, 'red');

test('Creating a 2D array', () => {
    expect(belt.make2DArray(2,2)).toEqual([[undefined, undefined],[undefined, undefined]]);
});

test('Add another tile to the conveyor belt when required', () => {
    myP5.randomSeed(99);

    expect(belt.addNewTile()).toEqual(tile);
});
