/* eslint-env p5js */
/// <reference path="../node_modules/@types/p5/global.d.ts" />
/// <reference path="../node_modules/@types/p5/index.d.ts" />
/// <reference path="../node_modules/@types/p5/literals.d.ts" />
/// <reference path="../node_modules/@types/p5/constants.d.ts" />
/* exported setup draw keyPressed preload */
'use strict';

import 'p5';
import Belt from './belt';
import Paddle from './paddle';
import Bin from './bin';
import Score from './score';
import Tile from './tile';
import Sprite from './sprite';

let belt;
let bin;
let paddle;
let score;
let lives;
const klaxSpriteSheet = new URL('../assets/klax-spritesheet-96x161.png', import.meta.url);
let spritesheets = {};

/**
 * Global config options for the game
 * @typedef {object} config
 * @property {Number} canvasWidth
 * @property {Number} lanes
 * @property {Number} beltSteps
 * @property {Number} speed
 * @property {object} tileColours
 * @property {Boolean} debug
 * @property {Number} tileSize
 * @property {Number} lives
 * @property {Number} maxTilesOnPaddle
 */
let config;

window.preload = function () {
    spritesheets.tiles = loadImage(klaxSpriteSheet.toString());
};

window.setup = function () {
    // frameRate(1);
    config = {
        canvasWidth: 600,
        lanes: 5,
        beltSteps: 5,
        speed: 500,
        tileColours: {
            "blue": { "firstTileYPos": 0 },
            "green": { "firstTileYPos": 161 },
            "orange": { "firstTileYPos": 322 },
            "pink": { "firstTileYPos":  483 },
            "red": { "firstTileYPos": 644 },
            "yellow": { "firstTileYPos": 805 }
        },
        debug: true,
        tileSize: null,
        lives: 3,
        maxTilesOnPaddle: 5
    };

    config.tileSize = config.canvasWidth / config.lanes;

    createCanvas(config.canvasWidth, config.canvasWidth);
    background(51);

    lives = config.lives;
    belt = new Belt(config, spritesheets.tiles);
    paddle = new Paddle(config);
    bin = new Bin(config);
    score = new Score();
};

window.draw = function () {
    background(51);

    if (lives < 0) {
        window.noLoop();

        push();
        fill(255);
        textSize(32);
        text('Game Over', width / 2, height / 2);
        pop();
    } else {
        bin.draw();
        belt.draw();
        paddle.draw();
        score.draw();

        let tilesOffBelt = belt.step();

        if (tilesOffBelt.length !== 0) {
            tilesOffBelt.forEach((el) => {
                let droppedTile = paddle.pushToPaddle(el.tile, el.col);
                if (droppedTile !== undefined) {
                    lives--;
                }
            });
        }
    }
};

window.keyPressed = function () {
    switch (keyCode) {
        //left arrow
        case 37:
            paddle.left();
            break;

        //up arrow
        case 38: {
            let tile = paddle.removeTopTile();

            if (tile) {
                belt.pushTileToTop(tile.tile, tile.col);
            }

            break;
        }

        //right arrow
        case 39:
            paddle.right();
            break;

        //down arrow
        case 40: {
            /**
             * TODO This needs to cater for three actions:
             * 1. There's no room in the lane so do nothing
             * 2. There's room in the lane so push the tile to it
             * 3. There's room in the lane so push the tile and it forms a klax; increment score
             */
            let tile = paddle.removeTopTile();

            if (tile) {
                let klaxes = bin.pushToBin(tile.tile, tile.col);

                klaxes.forEach((obj) => {
                    if (obj.type === 'vertical') {
                        score.addVerticalKlax(obj.tiles);
                    } else if (obj.type === 'horizontal') {
                        score.addHorizontalKlax(obj.tiles);
                    } else if (obj.type === 'diagonal') {
                        score.addDiagonalKlax(obj.tiles);
                    }

                    bin.clearBinPositions(klaxes);
                    bin.dropTiles();
                });

                if (klaxes) {
                    let allKlaxes = bin.checkAllForKlax();

                    allKlaxes.forEach((obj) => {
                        if (obj.type === 'vertical') {
                            score.addVerticalKlax(obj.tiles);
                        } else if (obj.type === 'horizontal') {
                            score.addHorizontalKlax(obj.tiles);
                        } else if (obj.type === 'diagonal') {
                            score.addDiagonalKlax(obj.tiles);
                        }
                    });

                    bin.clearBinPositions(allKlaxes);
                    bin.dropTiles();
                }
            }
            break;
        }

        //a
        case 65:
            if (config.debug) {
                belt.addNewPurpleTile();
            }
            break;

        //s
        case 83:
            if (config.debug) {
                belt.addNewGreenTile();
            }
            break;

        //q
        case 81:
            if (config.debug) {
                frameRate(5);
                console.log('Framerate now 5fps');
            }
            break;
        //t
        case 84:
            if (config.debug) {
                let pinkTile = new Tile(config, 1, 'pink', spritesheets.tiles);
                let greenTile = new Tile(config, 1, 'green', spritesheets.tiles);
                bin.bin = [
                    [-1, pinkTile, pinkTile, greenTile, pinkTile],
                    [-1, pinkTile, pinkTile, greenTile, pinkTile],
                    [-1, -1, -1, -1, greenTile],
                    [-1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1]
                ];
            }
            break;
        //u
        case 85:
            if (config.debug) {
                let pinkTile = new Tile(config, 1, 'pink', spritesheets.tiles);
                let greenTile = new Tile(config, 1, 'green', spritesheets.tiles);
                let redTile = new Tile(config, 1, 'red', spritesheets.tiles);
                bin.bin = [
                    [redTile, pinkTile, greenTile, pinkTile, greenTile],
                    [-1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1]
                ];
            }
        // o
        case 79:
            if (config.debug) {
                lives = 0;
            }
    }
};
