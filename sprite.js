class Sprite {
    constructor(animation, x, y, speed) {
        this.x = x;
        this.y = y;
        this.animation = animation;
        this.w = animation[0].width;
        this.len = animation.length;
        this.speed = speed;
        this.index = 0;
    }

    show() {
        let index = Math.floor(this.index) % this.len;

        image(this.animation[index], this.x, this.y);
    }

    animate() {
        this.index += this.speed;
    }
}

module.exports = Sprite;