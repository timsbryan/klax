'use strict';

const p5 = require('p5');
const Belt = require('./belt');
const bin = require('./bin.js');

let belt;
let config;

new p5;

let s = function (sketch) {
    sketch.setup = function () {
        config = {
            'canvasWidth': 300,
            'lanes': 5,
            'verticalSteps': 5,
            'tileColours': {
                'red': color(255, 0, 0),
                'green': color(0, 255, 0),
                'blue': color(0, 0, 255),
                'yellow': color(255, 255, 0),
                'purple': color(255, 0, 255)
            }
        };

        config['klaxSize'] = width / this.lanes;
        createCanvas(600, 600);
        background(51);

        belt = new Belt();
        bin = new Bin();
    };

    sketch.draw = function () {
        background(51);

        belt.draw();
        bin.draw();
    };
};

var myP5 = new p5(s);