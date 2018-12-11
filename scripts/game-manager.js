class GameManager {
    
    constructor() {
        this.assetManager = new AssetManager();
        this.bullets = [];
        this.enemies = [];
        this.stars = [];
        this.particleSystems = [];
        this.enemyGenerateSpeed = 200;
        this.enemySpeed = 2;
        this.score = 0;
    }

    preload() {
        this.assetManager.preload();
    }

    init() {
        this.player = new Player(
            createVector(width / 2, height - 100),
            createVector(),
            this.assetManager.playerImg,
            createVector(75, 75),
            100,
            'player'
        );
    }

    update() {
        this.renderPlayer();
        this.renderBullets();
        this.renderEnemies();
        this.renderStars();
        this.generateEnemy();
        this.renderBackground();
        this.renderParticleSystems();
    }

    renderPlayer() {
        this.player.pos.x = constrain(mouseX, this.player.size.x / 2, width - (this.player.size.x / 2));        
        this.player.update();
        this.player.show();
        let bullet = this.player.fireBullet(this.assetManager.bulletImg);
        if(bullet) {
            this.bullets.push(bullet);
        }
    }

    renderBullets() {
        this.bullets.forEach(b => {
            b.update();
            b.show();
        });

        this.bullets = this.bullets.filter(b => {
           let isCollided = false;
            this.enemies = this.enemies.map(e => {
                if (!isCollided && b.isCollided(e.pos, e.size)) {
                    e.life -= this.player.damage;
                    this.particleSystems.push(new ParticleSystem(b.pos.copy(), 10));
                    isCollided = true;
                }
                return e;
            });
            
           return !(b.pos.y <  -(b.size.y / 2) || isCollided);
        });
    }

    generateEnemy() {
        if(frameCount % this.enemyGenerateSpeed === 0) {
            const enemyCount = random(2, 6);
            let posX = [0,1,2,3,4,5];
            Array.from(Array(parseInt(enemyCount)).keys()).forEach(a => {
                let xIndex = posX.splice(parseInt(random(0, posX.length - 1)), 1)[0];
               
                this.enemies.push(new GameObject(
                    createVector((xIndex * 75) + 37.5, 0 - 75),
                    createVector(0, this.enemySpeed),
                    random(this.assetManager.enemiesImg),
                    createVector(70, 70),
                    60,
                    'enemy'
                ));
            })

        }
    }

    renderBackground() {
        push();
        translate(10,10);
        image(this.assetManager.starImg,0,0,30,30);
        fill(255);
        textSize(30);
        text(`: ${this.score}`,40,28);
        
        pop();
    }

    renderEnemies() {
        this.enemies.forEach(e => {
            e.update();
            e.show();
        });
        
        this.enemies = this.enemies.filter(e => {
            let isDead = e.life < 0;
            if (isDead) {
                this.stars.push(new GameObject(
                    e.pos,
                    createVector(random(-1,1), random(3,6)),
                    this.assetManager.starImg,
                    createVector(25, 25),
                    60,
                    'star'
                ))
            }
            return !isDead;
        });
    }

    renderStars() {
        this.stars.forEach(s => {
            s.update();
            s.show();
        });

        this.stars = this.stars.filter(s => {
            const isCollided = s.isCollided(this.player.pos, this.player.size);
            this.score += (isCollided) ? 1 : 0;
            return !isCollided;
        });
    }

    renderParticleSystems() {
        this.particleSystems.forEach(pS => {
            pS.renderParticles();
            pS.update();
        });

        this.particleSystems = this.particleSystems.filter(pS => pS.life > 0);
    }
}