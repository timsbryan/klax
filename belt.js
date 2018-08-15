/* exported Belt */
import config from './sketch.js';

class Belt {
    constructor() {
        this.belt = this.make2DArray(config.lanes, config.lanes);
    }

    make2DArray(cols, rows) {
        var arr = new Array(cols);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }

        return arr;
    }

    addNewTile() {
        return new Tile(random(config.lanes), 'red');
    }

    step() {
        setInterval(function() {
            this.tile1.step();
            this.tile2.step();
            this.tile3.step();
            this.tile4.step();
            this.tile5.step();
        }, 1000);

    }

    draw() {
        fill(128);
        rect(0, 0, width, height/2);

        this.tile1.draw();
        this.tile2.draw();
        this.tile3.draw();
        this.tile4.draw();
        this.tile5.draw();
    }
}

export { Belt };