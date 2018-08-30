/* eslint-env p5js */
/* exported setup draw keyPressed preload */
'use strict';

let config;
let belt;
let bin;
let paddle;
let spritesheets = {};

function preload() {
    spritesheets.pink = loadImage('assets/tile-pink.png');
}

function setup() {
    // frameRate(1);
    config = {
        'canvasWidth': 600,
        'lanes': 5,
        'beltSteps': 5,
        'tileColours': {
            'red': color(255, 0, 0),
            'green': color(0, 255, 0),
            'blue': color(0, 0, 255),
            'yellow': color(255, 255, 0),
            'purple': color(255, 0, 255)
        }
    };

    config.tileSize = config.canvasWidth / config.lanes;

    createCanvas(config.canvasWidth, config.canvasWidth);
    background(51);

    belt = new Belt(spritesheets);
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
        case 39:
            paddle.right();
            break;
        case 40: {
            let droppedTile = paddle.drop();

            if (droppedTile !== undefined) {
                bin.pushToBin(droppedTile.tile, droppedTile.col);
            }
            break;
        }
        case 65:
            belt.addNewPurpleTile();
            break;
        case 83:
            belt.addNewGreenTile();
            break;
        case 81:
            frameRate(1);
            console.log('Framerate now 1fps');
            break;
    }
}
