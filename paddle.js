/* eslint-env p5js */
/* exported Paddle */
'use strict';

export default class Paddle {
    constructor(config) {
        this.config = config;

        this.paddleTiles = [];
        this.paddleLane = Math.floor(config.lanes / 2);
        this.paddleHeight = config.tileSize / 3;
    }

    pushToStacker(tile, col) {
        if (col === this.paddleLane) {
            this.paddleTiles.push(tile);
        } //TODO else statement if player has missed the stacker
    }

    removeTopTile() {
        if (this.paddleLane.length) {
            return this.paddleTiles.pop();
        } else {
            return false;
        }
    }

    left() {
        if (this.paddleLane > 0) {
            this.paddleLane--;
        }
    }

    right() {
        if (this.paddleLane < this.config.lanes - 1) {
            this.paddleLane++;
        }
    }

    down() {
        if (this.paddleTiles.length) {
            return {
                'tile': this.paddleTiles.pop(),
                'col': this.paddleLane
            };
        }
    }

    draw() {
        push();

        fill(128);
        rectMode(CENTER);
        translate(
            (this.paddleLane + 1) * this.config.tileSize - (this.config.tileSize / 2),
            (height / 4 * 3) + (this.paddleTiles.length * (this.paddleHeight))
        );

        rect(0, 0, this.config.tileSize, this.paddleHeight);

        push();
        this.paddleTiles.forEach((tile, i) => {
            translate(0, this.paddleHeight * -1);
            tile.draw(0, 0, this.config.tileSize, this.paddleHeight);
        });
        pop();

        pop();
    }
}