/* eslint-env p5js */
/* exported Paddle */
'use strict';

export default class Paddle {
    constructor(sketch, config) {
        this.sketch = sketch;
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

    up() {
        //TODO push tile top paddle tile to top of belt
        console.log('TODO');
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
        this.sketch.push();

        this.sketch.fill(128);
        this.sketch.rectMode(this.sketch.CENTER);
        this.sketch.translate(
            (this.paddleLane + 1) * this.config.tileSize - (this.config.tileSize / 2),
            (this.sketch.height / 4 * 3) + (this.paddleTiles.length * (this.paddleHeight))
        );

        this.sketch.rect(0, 0, this.config.tileSize, this.paddleHeight);

        this.sketch.push();
        this.paddleTiles.forEach((tile, i) => {
            this.sketch.translate(0, this.paddleHeight * -1);
            tile.draw(0, 0, this.config.tileSize, this.paddleHeight);
        });
        this.sketch.pop();

        this.sketch.pop();
    }
}