/* eslint-env p5js */
'use strict';

class Belt {
    constructor() {
        this.cols = config.lanes;
        this.rows = config.lanes;

        this.belt = this.make2DArray(this.cols, this.rows);
    }

    make2DArray() {
        let arr = new Array(this.cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.rows);
        }

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                arr[i][j] = null;
            }
        }

        return arr;
    }

    addNewTile() {
        this.newTile = this.createNewTile();

        return this.belt[parseInt(random(config.lanes))][0] = this.newTile;
    }

    createNewTile() {
        return new Tile(Object.keys(config.tileColours)[parseInt(
            random(Object.keys(config.tileColours).length)
        )]);
    }

    step() {
        for (let i = this.cols - 1; i >= 0; i--) {
            for (let j = this.rows - 1; j >= 0; j--) {
                if (typeof this.belt[i][j] === 'object') {
                    let thisTile = this.belt[i][j];

                    this.belt[i][j] = null;
                    this.belt[i][j + 1] = thisTile;
                }
            }
        }
    }

    draw() {
        push();

        fill(128, 0, 0);
        rect(0, 0, width, height / 4 * 3);

        pop();

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.belt[i][j] !== null) {
                    push();

                    translate(i * config.tileSize, j * config.tileSize);
                    this.belt[i][j].draw();

                    pop();
                }
            }
        }
    }
}
