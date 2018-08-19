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
        let row = this.getLowestEmptyRow(col);

        this.bin[col][row] = tile;

        let klaxTiles = this.checkForKlax(col, row);

        if (Array.isArray(klaxTiles)) {
            this.clearBinPositions(klaxTiles);
        }
    }

    checkForKlax(col, row) {
        let horArr = this.checkHorizontalKlax(col, row);
        let verticalArr = this.checkVerticalKlax(col, row);
        let diagArr = this.checkDiagonalKlax(col, row);

        if (Array.isArray(horArr) || Array.isArray(verticalArr) || Array.isArray(diagArr)) {
            let newArr = [];
            if (Array.isArray(horArr)) {
                newArr = newArr.concat(horArr);
            }

            if (Array.isArray(verticalArr)) {
                newArr = newArr.concat(verticalArr);
            }

            if (Array.isArray(diagArr)) {
                newArr = newArr.concat(diagArr);
            }

            if (newArr.length > 0) {
                return newArr;
            }
         }
    }

    checkHorizontalKlax(col, row) {
        let horArr = [[col, row]];
        let tileColour = this.bin[col][row].colour;
        
        if (this.bin[col+1][row].colour === tileColour) {
            horArr.push([col+1, row]);
        }

        if (this.bin[col-1][row].colour === tileColour) {
            horArr.push([col-1, row]);
        }

        if (horArr.length >= 3) {
            return horArr;
        }
   }

    checkVerticalKlax() {

    }

    checkDiagonalKlax() {

    }

    clearBinPositions(tileArr) {
        console.log('tileArr', tileArr);

        tileArr.forEach((tilePos) => {
            console.log('tilePos', tilePos);
            this.bin[tilePos[0], tilePos[1]] = -1;
        });

    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                push();

                //TODO Translate better
                translate(0, (config.tileSize / 4 * 3) * 5);

                stroke(255);
                strokeWeight(1);
                fill(0);

                rect(
                    i * this.tileWidth,
                    j * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight
                );


                if (this.bin[i][j] !== -1) {
                    console.log('i,j: ', i, j);
                    console.log('tile', this.bin[i][j]);
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