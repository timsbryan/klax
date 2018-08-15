'use strict';

let belt;
let bin;
let config = {
    'canvasWidth': 300,
    'lanes': 5,
    'verticalSteps': 5
};

function setup() {
    createCanvas(600, 600);
    background(51);

    config.klaxSize = config.canvasWidth / config.lanes;
    config['tileColours'] = {
        'red': color(255, 0, 0),
        'green': color(0, 255, 0),
        'blue': color(0, 0, 255),
        'yellow': color(255, 255, 0),
        'purple': color(255, 0, 255)
    };

    belt = new Belt();
    bin = new Bin();
}

function draw() {
    background(51);

    belt.draw();
    bin.draw();
}

export { config };