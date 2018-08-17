/* eslint-env p5js */
'use strict';

let config;
let belt;
let bin;
let stacker;

function setup() {
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

    stacker = new Stacker();
    belt = new Belt();
    bin = new Bin();
}

function draw() {
    background(51);

    belt.draw();
    bin.draw();
    stacker.draw();
}

function keyPressed() {
    switch (keyCode) {
        case 37:
            stacker.left();
            break;
        case 39:
            stacker.right();
            break;
    }
}
