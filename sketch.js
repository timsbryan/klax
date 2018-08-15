'use strict';

let p5 = require('p5');

new p5;

let s = function (sketch) {
    let belt = require('./belt.js');
    let bin = require('./bin.js');

    sketch.setup = function () {
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