/* eslint-env p5js */

'use strict';

class Tile {
    constructor(colour) {
        this.colour = colour;
    }

    draw() {
        noStroke();
        fill(config.tileColours[this.colour]);

        rect(0, 0, config.klaxSize, config.klaxSize);
    }
}