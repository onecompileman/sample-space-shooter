class ParticleSystem {

    constructor(pos, particleCount) {
        this.pos = pos;
        this.particleCount = particleCount;
        this.life = 255;
        this.particleSpeed = 5;
      
        this.particles = Array.from(Array(particleCount).keys()).map(pC => {
            const vel = createVector(random(-1, 1), random(-1, 1));
            vel.normalize();
            vel.mult(this.particleSpeed);
            return new Particle(
                        pos.copy(), 
                        vel,
                        this.life);
        });
    }

    renderParticles() {
        this.particles.forEach(p => {
            p.update();
            p.show();
        });
    }

    update() {
        this.life-=7;        
    }

}