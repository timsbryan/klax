/* eslint-env p5js */
/* exported setup draw keyPressed preload */
'use strict';

let config;
let belt;
let bin;
let paddle;
let spritesheets;

function preload() {
    spritesheets = loadImage('assets/klax-spritesheet-96x161.png');
}

function setup() {
    // frameRate(1);
    config = {
        canvasWidth: 600,
        lanes: 5,
        beltSteps: 5,
        tileColours: {
            blue: color(0, 0, 255),
            green: color(0, 255, 0),
            orange: color(255, 128, 0),
            pink: color(255, 0, 255),
            red: color(255, 0, 0),
            yellow: color(255, 255, 0)
        },
        level: 1
    };

    config.tileSize = config.canvasWidth / config.lanes;

    createCanvas(config.canvasWidth, config.canvasWidth);
    background(51);

    belt = new Belt(spritesheets, config);
    paddle = new Paddle();
    bin = new Bin();
}

function draw() {
    background(51);

    bin.draw();
    belt.draw();
    paddle.draw();

    let droppedTile = belt.step();

    if (droppedTile !== undefined) {
        paddle.pushToStacker(droppedTile.tile, droppedTile.col);
    }
}

function keyPressed() {
    switch (keyCode) {
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
}
