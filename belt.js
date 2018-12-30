/* eslint-env p5js */
/* exported Belt */
'use strict';

const Tile = require('./tile');

class Belt {
    constructor(sketch, config, tileImages) {
        this.sketch = sketch;
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

    addNewTile() {
        //TODO check that there is not a tile in place where tile will go
        this.newTile = this.createNewTile();

        return this.belt[parseInt(this.sketch.random(this.config.lanes))][0] = this.newTile;
    }

    createNewTile() {
        return new Tile(
            this.sketch,
            this.config,
            Object.keys(this.config.tileColours)[
            parseInt(this.sketch.random(Object.keys(this.config.tileColours).length))
            ],
            this.tileImages);
    }

    //TODO Remove once finished testing
    addNewGreenTile() {
        this.newTile = this.createNewGreenTile();

        return this.belt[parseInt(this.sketch.random(this.config.lanes))][0] = this.newTile;
    }
    createNewGreenTile() {
        return new Tile(this.sketch, this.config, this.config.tileColours.green);
    }
    addNewPurpleTile() {
        this.newTile = this.createNewPurpleTile();

        return this.belt[parseInt(this.sketch.random(this.config.lanes))][0] = this.newTile;
    }
    createNewPurpleTile() {
        return new Tile(this.sketch, this.config, this.config.tileColours.pink);
    }

    //steps each tile one space lower if needed
    /* TODO firgure out whether this logic needs to move to each tile so that the tile can tell the
     * belt if it needs to move.
     */
    step() {
        for (let i = this.cols - 1; i >= 0; --i) {
            for (let j = this.rows - 1; j >= 0; --j) {
                if (typeof this.belt[i][j] === 'object') {
                    let thisTile = this.belt[i][j];


                    if (thisTile.step()) {
                        if (j + 1 >= this.belt[i].length) {
                            this.belt[i][j] = -1;

                            return {
                                'tile': thisTile,
                                'col': i
                            };
                        } else {
                            //Refactor repetition of this line with if statement above

                            this.belt[i][j + 1] = thisTile;
                            this.belt[i][j] = -1;

                            return undefined;
                        }
                    }
                }
            }
        }
    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.sketch.push();

                this.sketch.stroke(255);
                this.sketch.strokeWeight(1);
                this.sketch.fill(51);

                this.sketch.rect(
                    i * this.tileWidth,
                    j * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight
                );

                this.sketch.pop();

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

module.exports = Belt;