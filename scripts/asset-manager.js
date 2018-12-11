class AssetManager {
    
    preload() {
        this.playerImg = loadImage('assets/images/player.png');
        this.bulletImg = loadImage('assets/images/bullet.png');
        this.starImg = loadImage('assets/images/star.png');

        this.enemiesImg = Array.from(Array(20).keys()).map(a => loadImage(`assets/images/enemies/${a + 1}.png`));
        this.meteorsImg = Array.from(Array(2).keys()).map(a => loadImage(`assets/images/meteors/${a + 1}.png`));
    }

}
    