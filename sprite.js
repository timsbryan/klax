export default class Sprite {
    constructor(sketch, animation, x, y, speed) {
        this.sketch = sketch;
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
        console.log(this.animation);

        this.sketch.image(this.animation[index], this.x, this.y);
    }

    animate() {
        this.index += this.speed;
    }
}