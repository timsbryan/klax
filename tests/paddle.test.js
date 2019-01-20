/* eslint-env jest */
'use strict';

import Paddle from '../src/paddle.js';
import Tile from '../src/tile.js';
const config = { 'lanes': 2, 'tileSize': 4 };

window.push = () => null;
window.fill = () => null;
window.rectMode = () => null;
window.CENTER = null;
window.translate = jest.fn((x,y) => null);
window.height = 200;
window.rect = () => null;
window.pop = () => null;
window.millis = () => null;
window.noStroke = () => null;

describe('The paddle should', () => {
    let paddle;

    beforeEach(() => {
        paddle = new Paddle(config);
    });

    test('be setup with defaults', () => {
        expect(paddle).toEqual({
            config,
            'paddleHeight': 1.33333333333333333,
            'paddleLane': 1,
            'paddleTiles': []
        });
    });

    test('receive a tile when the paddle is in the same column as a tile', () => {
        paddle.pushToPaddle('tile', 1);

        expect(paddle.paddleTiles).toHaveLength(1);
    });

    test('not to receive a tile when the paddle is not in the same column as a tile', () => {
        paddle.pushToPaddle('tile', 2);

        expect(paddle.paddleTiles).toHaveLength(0);
    });

    test('remove the top tile if there are tiles on the paddle', () => {
        paddle.paddleTiles = ['tile1', 'tile2', 'tile3', 'tile4'];
        expect(paddle.removeTopTile()).toEqual({'col': 1, 'tile': 'tile4'});
    });

    test('not do anything if there are no tiles to remove', () => {
        paddle.paddleTiles = [];
        expect(paddle.removeTopTile()).toBe(false);
    });

    test('move one space to the left if there is a lane to the left', () => {
        paddle.paddleLane = 1;
        paddle.left();

        expect(paddle.paddleLane).toBe(0);
    });

    test('not move to the left if there is no lane to the left', () => {
        paddle.paddleLane = 0;
        paddle.left();

        expect(paddle.paddleLane).toBe(0);
    });

    test('move one space to the right if there is a lane to the right', () => {
        paddle.paddleLane = 0;
        paddle.right();

        expect(paddle.paddleLane).toBe(1);
    });

    test('not move to the right if there is no lane to the right', () => {
        paddle.paddleLane = 4;
        paddle.right();

        expect(paddle.paddleLane).toBe(4);
    });

    test('draw each tile stacked on the paddle', () => {
        paddle.paddleLane = 2;
        const tile = new Tile();
        paddle.paddleTiles = [tile, tile, tile];
        const spy = jest.spyOn(tile, 'draw');

        paddle.draw();

        expect(window.translate.mock.calls.length).toBe(7);
        expect(window.translate.mock.calls[0][0]).toBe(10);
        expect(window.translate.mock.calls[0][1]).toBe(154);
        expect(spy).toHaveBeenCalledTimes(3);
    });
});
