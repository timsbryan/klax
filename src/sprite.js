
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
     * @param {Number} speed the speed at which the animation plays. 1 being 1 animation frame each
     *                 canvas refresh.
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
        this.lastUpdate = millis();
        this.loopNum = 1;
    }

    show(posX) {
        let index = Math.floor(this.index) % this.numCells;

        if (this.index >= this.numCells) {
            this.loopNum++;
            this.posX = posX;
            this.posY += this.cellHeight / 2;
            this.index = 0;
        }

        image(
            this.image,
            posX,
            this.posY,
            this.cellWidth,
            this.cellHeight,
            this.cellWidth * index,
            this.y,
            this.cellWidth,
            this.cellHeight
        );
    }

    /**
     * Show a specific frame in a spritesheet.
     * @param {Number} frameNumber The specific frame to show.
     * @param {Number} x The position to show the image on the x axis.
     * @param {Number} y The position to show the image on the y axis.
     */
    showFrame(frameNumber, x, y) {
        image(
            this.image,
            x,
            y,
            this.cellWidth,
            this.cellHeight,
            this.cellWidth * frameNumber,
            this.y,
            this.cellWidth,
            this.cellHeight
        );
    }

    getFrameNumber() {
        return this.index;
    }

    animate() {
        if (millis() - this.lastUpdate >= this.speed / this.numCells) {
            this.lastUpdate = millis();
            this.index++;

            return true;

        //     if (this.index === 1 && this.loopNum !== 1) {
        //         return true;
        //     } else {
        //          return false;
        //     }
        // } else {
        //     return false;
        }
    }
}
