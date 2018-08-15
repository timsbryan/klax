/*  exported Tile */

export class Tile {
    constructor(position, colour) {
        this.colour = colour;
        this.position = position;
    }

    draw() {
        noStroke();

        if (this.colour === 'red') {
            fill(255, 0, 0);
        } else if (this.colour === 'green') {
            fill(0, 255, 0);
        } else if (this.colour === 'blue') {
            fill(0, 0, 255);
        } else if (this.colour === 'yellow') {
            fill(255, 255, 0);
        } else if (this.colour === 'purple') {
            fill(255, 0, 255);
        }

        rect((this.position.x * klaxSize) - klaxSize, this.position.y, klaxSize, klaxSize);
    }
}