/* eslint-env p5js */
'use strict';

class Stacker {
    constructor() {
        this.stackerTiles = [];
        this.stackerLane = Math.ceil(config.lanes / 2);
    }

    left() {
        if (this.stackerLane > 1) {
            this.stackerLane--;
        }
    }

    right() {
        if (this.stackerLane < config.lanes) {
            this.stackerLane++;
        }
    }

    draw() {
        push();

        fill(0, 255, 0);
        rectMode(CENTER);
        translate(this.stackerLane * config.klaxSize - (config.klaxSize  / 2), height / 4 * 3);
        rect(0, 0, config.klaxSize, config.klaxSize / 3);

        pop();
    }
}