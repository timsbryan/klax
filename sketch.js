/* eslint-env p5js */
/* exported setup draw keyPressed preload */
'use strict';

import p5 from 'p5';
import klaxSpriteSheet from './assets/klax-spritesheet-96x161.png';
import Belt from './belt';
import Paddle from './paddle';
import Bin from './bin';

let myp5 = new p5(function (sketch) {
    let belt;
    let bin;
    let paddle;
    let spritesheets = {};
    let config;

    sketch.preload = function () {
        spritesheets.pink = sketch.loadImage(klaxSpriteSheet);
    };

    sketch.setup = function () {
        // frameRate(1);
        config = {
            canvasWidth: 600,
            lanes: 5,
            beltSteps: 5,
            tileColours: {
                blue: sketch.color(0, 0, 255),
                green: sketch.color(0, 255, 0),
                orange: sketch.color(255, 128, 0),
                pink: sketch.color(255, 0, 255),
                red: sketch.color(255, 0, 0),
                yellow: sketch.color(255, 255, 0)
            }
        };

        config.tileSize = config.canvasWidth / config.lanes;

        sketch.createCanvas(config.canvasWidth, config.canvasWidth);
        sketch.background(51);

        belt = new Belt(sketch, config, spritesheets);
        paddle = new Paddle(sketch, config);
        bin = new Bin(sketch, config);
    };

    sketch.draw = function () {
        sketch.background(51);

        bin.draw();
        belt.draw();
        paddle.draw();

        let droppedTile = belt.step();

        if (droppedTile !== undefined) {
            paddle.pushToStacker(droppedTile.tile, droppedTile.col);
        }
    };

    sketch.keyPressed = function () {
        switch (sketch.keyCode) {
            case 37:
                paddle.left();

                break;
            case 38:
                paddle.up();

                break;
            case 39:
                paddle.right();

                break;
            case 40: {
                let droppedTile = paddle.down();

                if (droppedTile !== undefined) {
                    bin.pushToBin(droppedTile.tile, droppedTile.col);
                }

                break;
            }
            case 65:
                //TODO remove for debug only
                belt.addNewPurpleTile();

                break;
            case 83:
                //TODO remove for debug only
                belt.addNewGreenTile();

                break;
            case 81:
                //TODO remove for debug only
                frameRate(1);
                console.log('Framerate now 1fps');

                break;
        }
    };
});
