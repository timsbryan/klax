'use strict';

const Belt = require('../belt').Belt;
const p5 = require('p5');
const belt = new Belt;

beforeEach(() => {
    var p5.random = (num) => 1;
});

test('Creating a 2D array', () => {
    expect(belt.make2DArray(2,2)).toEqual([[undefined, undefined],[undefined, undefined]]);
});

test('Add another tile to the conveyor belt when required', () => {
    expect(belt.addNewTile()).toBe(new Tile(1, 'red'));
});
