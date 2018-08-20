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
            if (this.bin[col][i + 1] !== -1) {
                //TODO fix bug here when too many tiles in column
                return i;
            }
        }
    }

    pushToBin(tile, col) {
        let row = this.getLowestEmptyRow(col);

        this.bin[col][row] = tile;

        this.checkForKlax(col, row);
    }

    checkForKlax(col, row) {
        let horArr;
        let verticalArr;
        let diagArr;

        if (col !== undefined || row !== undefined) {
            horArr = this.checkHorizontalKlax(col, row);
            verticalArr = this.checkVerticalKlax(col, row);
            diagArr = this.checkDiagonalKlax(col, row);
        } else {
            this.bin.forEach((tile, i) => {
                this.bin[i].forEach((tile, j) => {
                    //TODO Not firing when expected
                    horArr = this.checkHorizontalKlax(i, j);
                    verticalArr = this.checkVerticalKlax(i, j);
                    diagArr = this.checkDiagonalKlax(i, j);
                });
            });
        }

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
                this.clearBinPositions(newArr);

                this.dropTiles();
            }
        }
    }

    checkHorizontalKlax(col, row) {
        //TODO Refactor to include all possible tiles not just three, use for loop etc.
        let horArr = [[col, row]];
        let tileColour = this.bin[col][row].colour;

        if (this.bin[col + 1] !== undefined &&
            this.bin[col + 1][row].colour === tileColour) {
            horArr.push([col + 1, row]);

            if (this.bin[col + 2] !== undefined &&
                this.bin[col + 2][row].colour === tileColour) {
                horArr.push([col + 2, row]);
            }
        }

        if (this.bin[col - 1] !== undefined &&
            this.bin[col - 1][row].colour === tileColour) {
            horArr.push([col - 1, row]);

            if (this.bin[col - 2] !== undefined &&
                this.bin[col - 2][row].colour === tileColour) {
                horArr.push([col - 2, row]);
            }
        }

        if (horArr.length >= 3) {
            return horArr;
        }
    }

    checkVerticalKlax(col, row) {
        let vertArr = [[col, row]];
        let tileColour = this.bin[col][row].colour;

        if (this.bin[col] !== undefined &&
            this.bin[col][row + 1] !== undefined &&
            this.bin[col][row + 1].colour === tileColour) {
            vertArr.push([col, row + 1]);

            if (this.bin[col] !== undefined &&
                this.bin[col][row + 2] !== undefined &&
                this.bin[col][row + 2].colour === tileColour) {
                vertArr.push([col, row + 2]);
            }
        }

        if (this.bin[col] !== undefined &&
            this.bin[col][row - 1] !== undefined &&
            this.bin[col][row - 1].colour === tileColour) {
            vertArr.push([col, row - 1]);

            if (this.bin[col] !== undefined &&
                this.bin[col][row - 2] !== undefined &&
                this.bin[col][row - 2].colour === tileColour) {
                vertArr.push([col, row - 2]);
            }
        }

        if (vertArr.length >= 3) {
            return vertArr;
        }
    }

    checkDiagonalKlax(col, row) {
        let diag1Arr = [[col, row]];
        let diag2Arr = [[col, row]];
        let tileColour = this.bin[col][row].colour;

        //Right and down *1 and *2
        if (this.bin[col + 1] !== undefined &&
            this.bin[col + 1][row + 1] !== undefined &&
            this.bin[col + 1][row + 1].colour === tileColour) {
            diag1Arr.push([col + 1, row + 1]);

            if (this.bin[col + 2] !== undefined &&
                this.bin[col + 2][row + 2] !== undefined &&
                this.bin[col + 2][row + 2].colour === tileColour) {
                diag1Arr.push([col + 2, row + 2]);
            }
        }
        //Left and up *1 and *2
        if (this.bin[col - 1] !== undefined &&
            this.bin[col - 1][row - 1] !== undefined &&
            this.bin[col - 1][row - 1].colour === tileColour) {
            diag1Arr.push([col - 1, row - 1]);

            if (this.bin[col - 2] !== undefined &&
                this.bin[col - 2][row - 2] !== undefined &&
                this.bin[col - 2][row - 2].colour === tileColour) {
                diag1Arr.push([col - 2, row - 2]);
            }
        }

        //Right and down *1 and *2
        if (this.bin[col + 1] !== undefined &&
            this.bin[col + 1][row - 1] !== undefined &&
            this.bin[col + 1][row - 1].colour === tileColour) {
            diag2Arr.push([col + 1, row - 1]);

            if (this.bin[col + 2] !== undefined &&
                this.bin[col + 2][row - 2] !== undefined &&
                this.bin[col + 2][row - 2].colour === tileColour) {
                diag2Arr.push([col + 2, row - 2]);
            }
        }
        //Left and down *1 and *2
        if (this.bin[col - 1] !== undefined &&
            this.bin[col - 1][row + 1] !== undefined &&
            this.bin[col - 1][row + 1].colour === tileColour) {
            diag2Arr.push([col - 1, row + 1]);

            if (this.bin[col - 2] !== undefined &&
                this.bin[col - 2][row + 2] !== undefined &&
                this.bin[col - 2][row + 2].colour === tileColour) {
                diag2Arr.push([col - 2, row + 2]);
            }
        }

        if (diag1Arr.length >= 3) {
            if (diag2Arr.length >= 3) {
                return diag1Arr.concat(diag2Arr);
            } else {
                return diag1Arr;
            }
        } else if (diag2Arr.length >= 3) {
            return diag2Arr;
        }
    }

    dropTiles() {
        this.bin.forEach((tile, i) => {
            this.bin[i].forEach((tile, j) => {
                if (this.bin[i][j] !== -1 &&
                    this.bin[i][j + 1] !== undefined &&
                    this.bin[i][j + 1] === -1) {

                    this.bin[i][j + 1] = tile;
                    this.bin[i][j] = -1;
                    this.dropTiles();
                }
            });
        });
        this.checkForKlax();
    }

    clearBinPositions(tileArr) {
        tileArr.forEach((tilePos) => {
            this.bin[tilePos[0]][tilePos[1]] = -1;
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