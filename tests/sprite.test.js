/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
'use strict';

import Sprite from '../src/sprite';
import p5 from 'p5';

jest.mock('p5');

window.millis = () => 500;
window.image = jest.fn();
const Image = (w, h) => null;
const createImage = (width, height) => Image;
const img = createImage(1, 1);

describe('The sprite should', () => {
  let sprite;

  beforeEach(() => {
    sprite = new Sprite(img, 1, 2, 3, 4, 3, 6);
    p5.mockClear();
  });

  test('be setup with some default', () => {
    expect(sprite).toEqual({
      'image': img,
      'x': 1,
      'y': 2,
      'cellWidth': 3,
      'cellHeight': 4,
      'numCells': 3,
      'speed': 6,
      'index': 0,
      'posY': 0,
      'lastUpdate': 500,
      'loopNum': 1
    });
  });

  test('show the image with the correct parameters', () => {
    sprite.show(42);

    expect(window.image).toHaveBeenCalledWith(img, 42, 0, 3, 4, 0, 2, 3, 4);
  });

  test('update time last updated when the correct amount of time has elapsed', () => {
    const millisSpy = jest.spyOn(window, 'millis').mockImplementation(() => {
      return 502;
    });

    sprite.animate();

    expect(millisSpy).toHaveBeenCalledTimes(2);
    expect(sprite.lastUpdate).toBe(502);
    expect(sprite.index).toBe(1);

    millisSpy.mockRestore();
  });

  test('report the current frame number', () => {
    sprite.index = 3;
    expect(sprite.getFrameNumber()).toBe(3);
  });

  test('not to update time last updated when the correct amount of time hasn\'t elapsed', () => {
    const millisSpy = jest.spyOn(window, 'millis').mockImplementation(() => {
      return 501;
    });

    sprite.animate();

    expect(millisSpy).toHaveBeenCalledTimes(1);
    expect(sprite.lastUpdate).toBe(500);
    expect(sprite.index).toBe(0);

    millisSpy.mockRestore();
  });

  test('return true when the animation has looped', () => {
    const millisSpy = jest.spyOn(window, 'millis').mockImplementation(() => {
      return 502;
    });
    sprite.index = 3;
    sprite.loopNum = 2;

    expect(sprite.animate()).toBeTruthy();

    millisSpy.mockRestore();
  });

  test('should show a specific frame when showFrame is called', () => {
    sprite.showFrame();

    expect(window.image).toHaveBeenCalled();
  });
});