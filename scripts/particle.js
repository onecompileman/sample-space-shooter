class Particle {

    constructor(pos,vel,life) {
        this.pos = pos;
        this.vel = vel;
        this.life = life;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(color(
            255, 255, 255, this.life
        ));
        stroke(color(0,100,255));
        ellipse(0,0,7 * (this.life / 255), 7 * (this.life / 255));
        pop();
    }

    update() {
        this.pos.add(this.vel);
        this.life-=7;
    }
}