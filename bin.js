/* eslint-env p5js */
'use strict';

class Bin {
    constructor() {
        this.cols = config.lanes;
        this.rows = config.lanes;

        this.bin = this.make2DArray(this.cols, this.rows);
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

    draw() {
        push();

        fill(0, 0, 128);
        translate(0, height/4 * 3);
        rect(0, 0, width, height/4);

        pop();
    }
};