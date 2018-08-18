/* eslint-env p5js */
/* exported Bin */
'use strict';

class Bin {
    constructor() {
        this.cols = config.lanes;
        this.rows = config.lanes;
        //TODO calc tile height better
        this.tileHeight = 30;
        this.tileWidth = config.tileSize;

        this.bin = this.make2DArray(this.cols, this.rows);
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

    getLowestEmptyRow(col) {
        for (let i = 0; i < this.bin[col].length; i++) {
            if (this.bin[col][i+1] !== -1) {
                //TODO fix bug here when too many tiles in column
                return i;
            }
        }
    }

    pushToBin(tile, col) {
        this.bin[col][this.getLowestEmptyRow(col)] = tile;
    }

    checkForKlax() {
        this.checkHorizontalKlax();
        this.checkVerticalKlax();
        this.checkDiagonalKlax();
    }

    checkHorizontalKlax() {

    }

    checkVerticalKlax() {

    }

    checkDiagonalKlax() {

    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                push();

                //TODO Translate better
                translate(0, (config.tileSize / 4 * 3) * 5);

                stroke(0);
                strokeWeight(1);
                fill(51);

                rect(
                    i * this.tileWidth,
                    j * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight
                );


                if (this.bin[i][j] !== -1) {
                    this.bin[i][j].draw(
                        i * this.tileWidth,
                        j * this.tileHeight,
                        this.tileWidth,
                        this.tileHeight
                    );
                }

                pop();
            }
        }
    }
}