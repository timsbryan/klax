/* eslint-env jest */
'use strict';

import Tile from '../src/tile.js';
const config = {
  'speed': 1
};
const colour = 'red';
const tileImage = 'tileImage';

window.millis = () => 1;
window.push = () => null;
window.noStroke = () => null;
window.fill = () => null;
window.translate = (x, y) => null;
window.rect = (x, y, w, h) => null;
window.pop = () => null;

describe('Creating a new tile should', () => {
  let tile;

  beforeEach(() => {
    tile = new Tile(config, colour, tileImage);
  });

  test('have the correct values', () => {
    expect(tile).toEqual({
      'colour': 'red',
      'config': {
        'speed': 1
      },
      'lastUpdate': 1,
      'tileImages': 'tileImage'
    });
  });

});

describe('Updating a tile should', () => {
  let tile;

  beforeEach(() => {
    tile = new Tile(config, colour, tileImage);
  });

  test('redraw the tile', () => {
    const spy = jest.spyOn(tile, 'draw');
    tile.update(1, 1, 1, 1);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('The tile should', () => {
  let tile;

  beforeEach(() => {
    tile = new Tile(config, colour, tileImage);
  });

  test('step to the next tile at the correct time', () => {
    window.millis = () => 2;

    expect(tile.step()).toBeTruthy();
  });

  test('not to step to the next tile if the correct amount of time hasn\'t passed', () => {
    window.millis = () => 1.1;

    expect(tile.step()).toBeFalsy();
  });
});
