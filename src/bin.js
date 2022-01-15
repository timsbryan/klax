/* eslint-env p5js */
/* exported Bin */
'use strict';

export default class Bin {
    constructor(config) {
        this.config = config;

        this.cols = this.config.lanes;
        this.rows = this.config.lanes;
        //TODO calc tile height without magic number, using sketch height or whatever
        this.tileHeight = 30;
        this.tileWidth = this.config.tileSize;

        this.bin = this.make2DArray(this.cols, this.rows);
    }

    //TODO move into utility class
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

    getLowestEmptyPosition(col) {
        for (let i = 0; i < this.bin[col].length; i++) {
            if (this.bin[col].some((x) => x === -1)) {
                if (this.bin[col][i + 1] !== -1) {
                    /*TODO fix bug here when too many tiles in column
                    (this might be caught by if statement above) */
                    return i;
                }
            } else return null;
        }
    }

    // TODO see if this should be -1 or null (or undefined)
    pushToBin(tile, col) {
        let row = this.getLowestEmptyPosition(col);
        if (row !== null) {
            this.bin[col][row] = tile;
            return this.checkForKlax(col, row);
        } else return new Object;
    }

    /* TODO depending on performance maybe remove this function and just check for Klax at
     * every position, always.
     */
    checkForKlax(col, row) {
        /* TODO for these check functions, could point along the line and stop at first tile that
           isn't the same colour */
        let horArr = this.checkHorizontalKlax(col, row);
        let verticalArr = this.checkVerticalKlax(col, row);
        let diagArr = this.checkDiagonalKlax(col, row);

        // TODO Refactor
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

            return newArr;
        }
    }

    checkAllForKlax() {
        this.bin.forEach((_col, i) => {
            this.bin[i].forEach((_tile, j) => {
                let horArr = this.checkHorizontalKlax(i, j);
                let verticalArr = this.checkVerticalKlax(i, j);
                let diagArr = this.checkDiagonalKlax(i, j);

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
            });
        });
    }

    checkHorizontalKlax(col, row) {
        //TODO Maybe refactor to include all possible tiles not just three. Use for loop etc.
        let horArr = [{'col': col, 'row': row}];
        let tileColour;
        // TODO refactor to include if statement around whole function.
        //Throw error when if statement fails
        // Not sure this if statement is needed. Compare with vertical klax
        if (this.bin[col][row] !== undefined && this.bin[col][row] !== -1) {
            tileColour = this.bin[col][row].colour;
        }

        if (this.bin[col + 1] !== undefined &&
            this.bin[col + 1][row] !== undefined &&
            this.bin[col + 1][row] !== -1 &&
            this.bin[col + 1][row].colour === tileColour) {
            horArr.push({'col': col + 1, 'row': row});

            if (this.bin[col + 2] !== undefined &&
                this.bin[col + 2][row] !== -1 &&
                this.bin[col + 2][row].colour === tileColour) {
                horArr.push({'col': col + 2, 'row': row});
            }
        }

        if (this.bin[col - 1] !== undefined &&
            this.bin[col - 1][row] !== -1 &&
            this.bin[col - 1][row].colour === tileColour) {
            horArr.push({'col': col - 1, 'row': row});

            if (this.bin[col - 2] !== undefined &&
                this.bin[col - 2][row] !== -1 &&
                this.bin[col - 2][row].colour === tileColour) {
                horArr.push({'col': col - 2, 'row': row});
            }
        }

        if (horArr.length >= 3) {
            return horArr;
        }
    }

    checkVerticalKlax(col, row) {
        let vertArr = [{'col': col, 'row': row}];
        let tileColour = this.bin[col][row].colour;

        if (this.bin[col] !== undefined &&
            this.bin[col][row + 1] !== undefined &&
            this.bin[col][row + 1] !== -1 &&
            this.bin[col][row + 1].colour === tileColour) {
            vertArr.push({'col': col, 'row': row + 1});

            if (this.bin[col] !== undefined &&
                this.bin[col][row + 2] !== undefined &&
                this.bin[col][row + 2] !== -1 &&
                this.bin[col][row + 2].colour === tileColour) {
                vertArr.push({'col': col, 'row': row + 2});
            }
        }

        if (this.bin[col] !== undefined &&
            this.bin[col][row - 1] !== undefined &&
            this.bin[col][row - 1] !== -1 &&
            this.bin[col][row - 1].colour === tileColour) {
            vertArr.push({'col': col, 'row': row - 1});

            if (this.bin[col] !== undefined &&
                this.bin[col][row - 2] !== undefined &&
                this.bin[col][row - 2] !== -1 &&
                this.bin[col][row - 2].colour === tileColour) {
                vertArr.push({'col': col, 'row': row - 2});
            }
        }

        if (vertArr.length >= 3) {
            return vertArr;
        }
    }

    checkDiagonalKlax(col, row) {
        let diag1Arr = [{'col': col, 'row': row}];
        let diag2Arr = [{'col': col, 'row': row}];
        let tileColour = this.bin[col][row].colour;

        //Right and down *1 and *2
        if (this.bin[col + 1] !== undefined &&
            this.bin[col + 1][row + 1] !== undefined &&
            this.bin[col + 1][row + 1] !== -1 &&
            this.bin[col + 1][row + 1].colour === tileColour) {
            diag1Arr.push({'col': col + 1, 'row': row + 1});

            if (this.bin[col + 2] !== undefined &&
                this.bin[col + 2][row + 2] !== undefined &&
                this.bin[col + 2][row + 2] !== -1 &&
                this.bin[col + 2][row + 2].colour === tileColour) {
                diag1Arr.push({'col': col + 2, 'row': row + 2});
            }
        }

        //Left and up *1 and *2
        if (this.bin[col - 1] !== undefined &&
            this.bin[col - 1][row - 1] !== undefined &&
            this.bin[col - 1][row - 1] !== -1 &&
            this.bin[col - 1][row - 1].colour === tileColour) {
            diag1Arr.push({'col': col - 1, 'row': row - 1});

            if (this.bin[col - 2] !== undefined &&
                this.bin[col - 2][row - 2] !== undefined &&
                this.bin[col - 2][row - 2] !== -1 &&
                this.bin[col - 2][row - 2].colour === tileColour) {
                diag1Arr.push({'col': col - 2, 'row': row - 2});
            }
        }

        //Right and down *1 and *2
        if (this.bin[col + 1] !== undefined &&
            this.bin[col + 1][row - 1] !== undefined &&
            this.bin[col + 1][row - 1] !== -1 &&
            this.bin[col + 1][row - 1].colour === tileColour) {
            diag2Arr.push({'col': col + 1, 'row': row - 1});

            if (this.bin[col + 2] !== undefined &&
                this.bin[col + 2][row - 2] !== undefined &&
                this.bin[col + 2][row - 2] !== -1 &&
                this.bin[col + 2][row - 2].colour === tileColour) {
                diag2Arr.push({'col': col + 2, 'row': row - 2});
            }
        }
        //Left and down *1 and *2
        if (this.bin[col - 1] !== undefined &&
            this.bin[col - 1][row + 1] !== undefined &&
            this.bin[col - 1][row + 1] !== -1 &&
            this.bin[col - 1][row + 1].colour === tileColour) {
            diag2Arr.push({'col': col - 1, 'row': row + 1});

            if (this.bin[col - 2] !== undefined &&
                this.bin[col - 2][row + 2] !== undefined &&
                this.bin[col - 2][row + 2] !== -1 &&
                this.bin[col - 2][row + 2].colour === tileColour) {
                diag2Arr.push({'col': col - 2, 'row': row + 2});
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
        this.bin.forEach((_tile, i) => {
            this.bin[i].forEach((tile, j) => {
                if (this.bin[i][j] !== -1 &&
                    this.bin[i][j + 1] !== undefined &&
                    this.bin[i][j + 1] === -1) {

                    this.bin[i][j + 1] = tile;
                    this.bin[i][j] = -1;
                    this.dropTiles();

                    this.checkAllForKlax();
                }
            });
        });
    }

    clearBinPositions(tileArr) {
        tileArr.forEach((tilePos) => {
            this.bin[tilePos.col][tilePos.row] = -1;
        });
    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                push();

                //TODO Translate better (can't remember what this meant. Magic numbers maybe?)
                translate(0, (this.config.tileSize / 4 * 3) * 5);

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