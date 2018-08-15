'use strict';

class Bin {
    constructor() {
        let gameBoard = [];
    }

    draw() {
        fill(0);
        push();
        translate(0, height/2);
        rect(0, 0, width, height/2);
        pop();
    }
};