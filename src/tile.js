/* eslint-env p5js */
/* exported Tile */
'use strict';

import Sprite from './sprite';

/** Creates a tile.  */
export default class Tile {
    /**
     * 
     * @param {import('./sketch').config} config
     * @param {Number} lane Which lane the tile is in.
     * @param {String} colour 
     * @param {import('p5').Image} spritesheet 
     */
    constructor(config, lane, colour, spritesheet) {
        this.config = config;
        this.lastUpdate = millis();
        this.colour = colour;
        this.tileWidth = config.tileSize;
        this.lane = lane;
        this.loopNum = 1;
    
        this.tileAnim = new Sprite(spritesheet, 0, 0, 96, 161, 36, this.config.speed);
    }

    /**
     * @param {Number} posX 
     * @param {Number} posY 
     * @param {Number} tWidth 
     * @param {Number} tHeight 
     */
    //TODO check this is still being used and fix
    // update(posX, posY, tWidth, tHeight) {
    //     this.tileAnim.animate();
    //     // this.draw(posX, posY, tWidth, tHeight);
    // }

    /**
     * 
     * @returns {Boolean} true if the tile should updated/moved, otherwise false.
     */
    step() {
        this.tileAnim.animate();

        return this.tileAnim.getFrameNumber() === 1;
    }

    /**
     * Displays the tile on the screen.
     * @param {Number} lane which lane to display the tile.
     */
    draw(lane) {
        push();
        this.tileAnim.show(lane * this.tileWidth);
        pop();
    }
}
