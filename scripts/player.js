class Player extends GameObject {

    constructor(pos, vel, img, size, life, tag) {
        super(pos, vel, img, size, life, tag);
        this.fireRate = 10;
        this.damage = 20;
        this.bulletSpeed = 15;
    }


    fireBullet(bulletImg) {
        return (frameCount % this.fireRate === 0) ? new GameObject(
            createVector(this.pos.x, this.pos.y - (this.size.y / 2)),
            createVector(0, -this.bulletSpeed),
            bulletImg,
            createVector(5, 12),
            100,
            'bullet'
        ): null;
    }

}