class GameObject {
    
    constructor(pos, vel, img, size, life, tag) {
        this.pos = pos;
        this.vel = vel;
        this.img = img;
        this.size = size;
        this.life = life;
        this.tag = tag;
    }

    show() {
        push();
        imageMode(CENTER);        
        translate(this.pos.x, this.pos.y);
        image(this.img,0,0,this.size.x, this.size.y);
        pop();
    }

    update() {
        this.pos.add(this.vel);
    }

    isCollided(gameObjPos, gameObjSize) {
        return (gameObjSize.y + this.size.x) > (this.pos.dist(gameObjPos));
    }


}