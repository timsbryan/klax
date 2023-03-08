
/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
'use strict';

import Tile from '../src/tile.js';
import Sprite from '../src/sprite.js';

const config = {
  'speed': 1,
  'tileColours': {
    'red': { 'firstTileYPos': 0 },
  },
};
const colour = 'red';

window.millis = () => 1;
window.push = () => null;
window.noStroke = () => null;
window.fill = () => null;
window.translate = (x, y) => null;
window.rect = (x, y, w, h) => null;
window.pop = () => null;
const Image = (w,h) => null;
const createImage = (width, height) => Image;

describe('Creating a new tile should', () => {
  let tile;
  const img = createImage(1, 1);

  beforeEach(() => {
    tile = new Tile(config, 1, colour, img);
  });

  test('have the correct values', () => {
    expect(tile).toEqual({
      'colour': 'red',
      'config': {
        'speed': 1,
        'tileColours': {
          'red': { 'firstTileYPos': 0 },
        },
      },
      'lane': 1,
      'lastUpdate': 1,
      'loopNum': 1,
      'tileAnim': {
        'cellHeight': 161,
        'cellWidth': 96,
        'image': img,
        'index': 0,
        'lastUpdate': 1,
        'loopNum': 1,
        'numCells': 36,
        'posY': 0,
        'speed': 1,
        'x': 0,
        'y': 0
      }
    });
  });

});

describe('Updating a tile should', () => {
  let tile;
  const img = createImage(1, 1);

  beforeEach(() => {
    tile = new Tile(config, 1, colour, img);
  });

  test.skip('redraw the tile', () => {
    const spy = jest.spyOn(tile, 'draw');
    tile.update(1, 1, 1, 1);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('The tile should', () => {
  let tile;
  const img = createImage(1, 1);

  beforeEach(() => {
    tile = new Tile(config, 1, colour, img);
  });

  test('step to the next tile at the correct time', () => {
    const mockSpriteAnimate = jest.spyOn(Sprite.prototype, 'animate')
      .mockImplementation(() => true);

    const mockSpriteGetFrameNumber = jest.spyOn(Sprite.prototype, 'getFrameNumber')
      .mockImplementation(() => 1);

    expect(tile.step(2)).toBeTruthy();

    expect(mockSpriteAnimate).toHaveBeenCalled();
    expect(mockSpriteGetFrameNumber).toHaveBeenCalled();

    mockSpriteAnimate.mockRestore();
    mockSpriteGetFrameNumber.mockRestore();
  });

  test('not to step to the next tile if the correct amount of time hasn\'t passed', () => {
    const mockSpriteAnimate = jest.spyOn(Sprite.prototype, 'animate')
      .mockImplementation(() => false);

    expect(tile.step()).toBeFalsy();

    expect(mockSpriteAnimate).toHaveBeenCalled();
    mockSpriteAnimate.mockRestore();
  });
});
