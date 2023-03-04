/* eslint-env p5js */
'use strict';

/**
 * Create a paddle.
 * @param { import('./sketch').config } config Global config
 */
export default class Paddle {
    constructor(config) {
        this.config = config;

        this.paddleTiles = [];
        this.paddleLane = Math.floor(config.lanes / 2);
        this.paddleHeight = config.tileSize / 3;
        this.maxTiles = config.maxTilesOnPaddle;
    }

    /**
     * Push tiles onto the paddle if they are in the correct column
     * @param {object} tile
     * @param {Number} col
     * @returns {object|undefined} If the paddle has reached the maximum number of tiles or the
     *                             dropped tile is in a different tile to the paddle then the tile
     *                             is returned, otherwise the tile is pushed onto the tile.
     * @todo Not sure this is the best name for this method?
     */
    pushToPaddle(tile, col) {
        if (this.paddleTiles.length === this.maxTiles
            || col !== this.paddleLane) {
                return tile;
        } else {
            this.paddleTiles.push(tile);
        }
    }

    /**
     * Remove the tile on the top of the paddle.
     * @returns {object|boolean} If there are tiles on the paddle returns an object of the top tile
     *                           and the column the paddle is in. If there are not tiles, returns
     *                           false
     * @todo else could return undefined?
     */
    removeTopTile() {
        if (this.paddleTiles.length) {
            return {
                'tile': this.paddleTiles.pop(),
                'col': this.paddleLane
            };
        } else {
            return false;
        }
    }

    /**
     * If the paddle isn't in the first lane, moves the paddle left.
     */
    left() {
        if (this.paddleLane > 0) {
            this.paddleLane--;
        }
    }

    /**
     * If the paddle isn't in the last lane, moves the paddle right.
     */
    right() {
        if (this.paddleLane < this.config.lanes - 1) {
            this.paddleLane++;
        }
    }

    /**
     * Draws the paddle.
     */
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
            tile.drawFrame(18, -50, -(i*30) - 100);
        });
        pop();

        pop();
    }
}