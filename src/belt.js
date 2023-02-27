/* eslint-env p5js */
/* exported Belt */
'use strict';

import Tile from './tile';
import { make2DArray } from './utils';

/** Class that represents a conveyor belt. */
export default class Belt {
    /**
     * Create a belt.
     * @param {import('./sketch').config} config
     * @param {import('p5').Image} spritesheet a spritesheet for tiles.
     */
    constructor(config, spritesheet) {
        this.config = config;
        this.spritesheet = spritesheet;

        this.cols = config.lanes;
        this.rows = config.lanes;
        this.tileHeight = (config.tileSize / 4) * 3;
        this.tileWidth = config.tileSize;

        this.belt = make2DArray(this.cols, this.rows);
    }

    /**
     * Checks to see if the next space in the column is empty.
     * @param {number} col 
     * @param {number} row 
     * @returns {boolean} returns true if the next space in the column is empty, otherwise false.
     */
    nextSpaceEmpty(col, row) {
        if (this.belt[row + 1][col] === -1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Adds a new tile to a random lane.
     */
    addNewTile() {
        //TODO eventually use getRandomLane method to do this to make it safer
        let randomLane = random(this.config.lanes);

        this.newTile = this.createNewTile(randomLane);

        this.belt[randomLane][0] = this.newTile;
    }


    /**
     * @param {Number} lane Which lane the tile is in.
     * @returns {Object} a new tile of a random colour.
     */
    createNewTile(lane) {
        return new Tile(
            this.config,
            lane,
            Object.keys(this.config.tileColours)[
            random(Object.keys(this.config.tileColours).length)
            ],
            this.spritesheet
        );
    }

    /**
     * Pushes a tile back to the top of the tile.
     * @param {number} tile 
     * @param {number} col 
     */
    pushTileToTop(tile, col) {
        this.belt[0][col] = tile;
    }

    /**
     * @todo This can probably be deleted.
     */
    getRandomEmptyLane() {
        const indices = [];

        this.belt[0].forEach((el, i) => {
            if (el === -1) {
                indices.push(i);
            }
        });

        if (indices.length) {
            return random(indices.length);
        } else return null;
    }

    /**
     * @todo Remove once finished testing or add to debug.
     */
    addNewGreenTile() {
        let lane = Math.floor(random(this.config.lanes));
        this.newTile = this.createNewGreenTile(lane);
        this.belt[lane][0] = this.newTile;
    }

    /**
     * @todo Remove once finished testing or add to debug.
     */
    createNewGreenTile(lane) {
        return new Tile(
            this.config,
            lane,
            this.config.tileColours.green,
            this.spritesheet
            );
    }

    /**
     * @todo Remove once finished testing or add to debug.
     */
    addNewPurpleTile() {
        let lane = Math.floor(random(this.config.lanes));
        this.newTile = this.createNewPurpleTile(lane);

        this.belt[lane][0] = this.newTile;
    }

    /**
     * @todo Remove once finished testing or add to debug.
     */
    createNewPurpleTile(lane) {
        return new Tile(
            this.config,
            lane,
            this.config.tileColours.pink,
            this.spritesheet
            );
    }
    /**
     * @typedef {Array} droppedTiles
     * @property {number}
     */
    /**
     * Calls all tiles to find out if they should move one space lower.
     * @returns {{tile: object, col: number}[]} All tiles that should drop off the belt.
     */
    step() {
        let droppedTiles = [];

        for (let i = this.cols - 1; i >= 0; --i) {
            for (let j = this.rows - 1; j >= 0; --j) {
                if (typeof this.belt[i][j] === 'object') {
                    let thisTile = this.belt[i][j];

                    if (thisTile.step(j)) {
                        this.belt[i][j] = -1;

                        if (j + 1 >= this.belt[i].length) {
                            droppedTiles.push({
                                'tile': thisTile,
                                'col': i
                            });
                        } else {
                            this.belt[i][j + 1] = thisTile;
                        }
                    }
                }
            }
        }

        return droppedTiles;
    }

    /**
     * Draws all tiles to the screen.
     */
    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                push();

                stroke(255);
                strokeWeight(1);
                fill(51);

                rect(
                    i * this.tileWidth,
                    j * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight
                );

                pop();
            }
        }

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.belt[i][j] !== -1) {
                    this.belt[i][j].draw(i);
                }
            }
        }
    }
}
