/* eslint-env p5js */
/* exported Tile */
'use strict';

let pinkSpriteImg;
let pinkSpriteFrames = 36;
let pinkSpriteWidth = 180;
let pinkAnimation = [];

class Tile {
    constructor(colour, tileImages) {
        for (let i = 0; i < pinkSpriteFrames; i++) {
            let pos = i * pinkSpriteWidth;

            let img = [pos, 0, pinkSpriteWidth, pinkSpriteWidth];
            pinkAnimation.push(img);
        }

        pinkSpriteImg = new Sprite(pinkAnimation, 0, 0, 0.1);

        this.colour = colour;
    }

    draw(posX, posY, tWidth, tHeight) {
        pinkSpriteImg.show();
        pinkSpriteImg.animate();

        push();

        noStroke();
        fill(config.tileColours[this.colour]);
        translate(posX, posY);
        rect(0, 0, tWidth, tHeight);

        pop();
    }
}