'use strict';

let config;
let belt;
let bin;

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

    config.klaxSize = (config.canvasWidth / config.lanes) / 2;

    createCanvas(config.canvasWidth, config.canvasWidth);
    background(51);

    belt = new Belt();
    bin = new Bin();
}

function draw() {
    background(51);

    belt.draw();
    // bin.draw();
}