/* eslint-env p5js */
/* exported setup draw keyPressed preload */
'use strict';

import 'p5';
import klaxSpriteSheet from './assets/klax-spritesheet-96x161.png';
import Belt from './belt';
import Paddle from './paddle';
import Bin from './bin';

let belt;
let bin;
let paddle;
let spritesheets = {};
let config;

window.preload = function () {
    spritesheets.pink = loadImage(klaxSpriteSheet);
};

window.setup = function () {
    // frameRate(1);
    config = {
        canvasWidth: 600,
        lanes: 5,
        beltSteps: 5,
        speed: 3000,
        tileColours: {
            blue: color(0, 0, 255),
            green: color(0, 255, 0),
            orange: color(255, 128, 0),
            pink: color(255, 0, 255),
            red: color(255, 0, 0),
            yellow: color(255, 255, 0)
        },
        //TODO add node env parameter for debug true/false
        debug: true
    };

    config.tileSize = config.canvasWidth / config.lanes;

    createCanvas(config.canvasWidth, config.canvasWidth);
    background(51);

    belt = new Belt(config, spritesheets);
    paddle = new Paddle(config);
    bin = new Bin(config);
};

window.draw = function () {
    background(51);

    bin.draw();
    belt.draw();
    paddle.draw();

    let droppedTile = belt.step();

    if (droppedTile !== undefined) {
        paddle.pushToStacker(droppedTile.tile, droppedTile.col);
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
            belt.pushTileToTop(tile, paddle.paddleLane);

            break;
        }

        //right arrow
        case 39:
            paddle.right();
            break;

        //down arrow
        case 40: {
            let droppedTile = paddle.down();

            if (droppedTile !== undefined) {
                bin.pushToBin(droppedTile.tile, droppedTile.col);
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
    }
};
