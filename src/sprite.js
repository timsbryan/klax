
/**
 * Sprite class.
 */
export default class Sprite {
    /**
     * 
     * @param {import('p5').Image} image 
     * @param {Number} x the x-coordinate of the top left corner of first cell.
     * @param {Number} y the y-coordinate of the top left corner of first cell.
     * @param {Number} cellWidth the width of a cell.
     * @param {Number} cellHeight the height of a cell.
     * @param {Number} numCells the amount of cells in a sprite animation.
     * @param {Number} speed the speed at which the animation plays. 1 being 1 animation frame each canvas refresh.
     */
    constructor(image, x, y, cellWidth, cellHeight, numCells, speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.numCells = numCells;
        this.speed = speed;
        this.index = 0;
        this.posY = 0;
    }

    show() {
        let index = Math.floor(this.index) % this.numCells;

        if(this.index >= this.numCells -1) {
            this.posY = this.cellHeight / 2;
        }

        image(this.image, 0, this.posY, this.cellWidth, this.cellHeight, this.cellWidth * (index % this.numCells), 0, this.cellWidth, this.cellHeight);
    }

    animate() {
        this.index += this.speed;
    }
}
