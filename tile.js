/* eslint-env p5js */
/* exported Tile */
'use strict';

class Tile {
    constructor(colour) {
        this.colour = colour;
    }

    draw(posX, posY, tWidth, tHeight) {
        push();

        noStroke();
        fill(config.tileColours[this.colour]);
        translate(posX, posY);
        rect(0, 0, tWidth, tHeight);

        pop();
    }
}