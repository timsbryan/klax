'use strict';

function setup() {
    createCanvas(600, 600);
    background(51);

    belt = new Belt();
    bin = new Bin();
};

function draw() {
    background(51);

    belt.draw();
    bin.draw();
};