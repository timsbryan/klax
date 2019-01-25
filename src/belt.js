/* eslint-env p5js */
/* exported Belt */
'use strict';

import Tile from './tile';

export default class Belt {
    constructor(config) {
        this.config = config;

        this.cols = config.lanes;
        this.rows = config.lanes;
        this.tileHeight = (config.tileSize / 4) * 3;
        this.tileWidth = config.tileSize;

        this.belt = this.make2DArray(this.cols, this.rows);
    }

    make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                arr[i][j] = -1;
            }
        }
        return arr;
    }

    nextSpaceEmpty(col, row) {
        if (this.belt[row + 1][col] === -1) {
            return true;
        } else {
            return false;
        }
    }

    addNewTile() {
        //TODO another recursive function do better checking
        //eventually use getRandomLane method to do this to make it safer
        let randomLane = random(this.config.lanes);

        // let unchecked = [this.belt[0]];

        // if (this.nextSpaceEmpty(randomLane, 0)) {
            this.newTile = this.createNewTile();

            this.belt[parseInt(randomLane)][0] = this.newTile;
        // } else {
        //     this.addNewTile();
        // }
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

    getRandomLane() {
    //TODO refactor to make recursion of function safer
    //Possibly use an array of unchecked lanes for recursion and exit if there are no lanes left
        const randomLane = random(this.config.lanes);

        if (this.belt[parseInt(randomLane)][0] === -1) {
            return randomLane;
        } else {
            this.getRandomLane();
        }
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
        for (let i = this.cols - 1; i >= 0; --i) {
            for (let j = this.rows - 1; j >= 0; --j) {
                if (typeof this.belt[i][j] === 'object') {
                    let thisTile = this.belt[i][j];

                    if (thisTile.step()) {
                        if (j + 1 >= this.belt[i].length) {
                            //Refactor repetition of this line with else statement below
                            this.belt[i][j] = -1;

                            return {
                                'tile': thisTile,
                                'col': i
                            };
                        } else {
                            this.belt[i][j + 1] = thisTile;
                            //Refactor repetition of this line with if statement above
                            this.belt[i][j] = -1;

                            return null;
                        }
                    } else return null;
                } else return null;
            }
        }
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
