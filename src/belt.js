/* eslint-env p5js */
/* exported Belt */
'use strict';

import Tile from './tile';
import { make2DArray } from './utils';

export default class Belt {
    constructor(config) {
        this.config = config;

        this.cols = config.lanes;
        this.rows = config.lanes;
        this.tileHeight = (config.tileSize / 4) * 3;
        this.tileWidth = config.tileSize;

        this.belt = make2DArray(this.cols, this.rows);
    }

    nextSpaceEmpty(col, row) {
        if (this.belt[row + 1][col] === -1) {
            return true;
        } else {
            return false;
        }
    }

    addNewTile() {
        //TODO eventually use getRandomLane method to do this to make it safer
        let randomLane = random(this.config.lanes);

        this.newTile = this.createNewTile();

        this.belt[randomLane][0] = this.newTile;
    }

    createNewTile() {
        return new Tile(
            this.config,
            Object.keys(this.config.tileColours)[
            parseInt(random(Object.keys(this.config.tileColours).length))
            ]);
    }

    pushTileToTop(tile, col) {
        this.belt[0][col] = tile;
    }

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

    //TODO Remove once finished testing
    addNewGreenTile() {
        this.newTile = this.createNewGreenTile();

        return this.belt[parseInt(random(this.config.lanes))][0] = this.newTile;
    }
    //TODO Remove once finished testing
    createNewGreenTile() {
        return new Tile(this.config, this.config.tileColours.green);
    }
    //TODO Remove once finished testing
    addNewPurpleTile() {
        this.newTile = this.createNewPurpleTile();

        return this.belt[parseInt(random(this.config.lanes))][0] = this.newTile;
    }
    //TODO Remove once finished testing
    createNewPurpleTile() {
        return new Tile(this.config, this.config.tileColours.pink);
    }

    //calls tile to find out if tile should move one space lower.
    step() {
        let droppedTiles = [];

        for (let i = this.cols - 1; i >= 0; --i) {
            for (let j = this.rows - 1; j >= 0; --j) {
                if (typeof this.belt[i][j] === 'object') {
                    let thisTile = this.belt[i][j];

                    if (thisTile.step()) {
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

                if (this.belt[i][j] !== -1) {
                    this.belt[i][j].update(
                        i * this.tileWidth,
                        j * this.tileHeight,
                        this.tileWidth,
                        this.tileHeight
                    );
                }
            }
        }
    }
}
