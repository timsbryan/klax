/* eslint-env p5js */
/* exported Belt */
'use strict';

class Belt {
    constructor() {
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
        this.newTile = this.createNewTile();

        return this.belt[parseInt(random(config.lanes))][0] = this.newTile;
    }

    createNewTile() {
        return new Tile(Object.keys(config.tileColours)[
            parseInt(random(Object.keys(config.tileColours).length))
        ]);
    }

    //TODO Remove
    addNewGreenTile() {
        this.newTile = this.createNewGreenTile();

        return this.belt[parseInt(random(config.lanes))][0] = this.newTile;
    }
    createNewGreenTile() {
        return new Tile('green');
    }
    addNewPurpleTile() {
        this.newTile = this.createNewPurpleTile();

        return this.belt[parseInt(random(config.lanes))][0] = this.newTile;
    }
    createNewPurpleTile() {
        return new Tile('purple');
    }

    step() {
        for (let i = this.cols - 1; i >= 0; --i) {
            for (let j = this.rows - 1; j >= 0; --j) {
                if (typeof this.belt[i][j] === 'object') {
                    let thisTile = this.belt[i][j];

                    this.belt[i][j] = -1;

                    if (j + 1 >= this.belt[i].length) {
                        return {
                            'tile': thisTile,
                            'col': i
                        };
                    } else {
                        this.belt[i][j + 1] = thisTile;

                        return undefined;
                    }
                }
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
                    this.belt[i][j].draw(
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
