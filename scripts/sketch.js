var gameManager = new GameManager();

function preload() {
   gameManager.preload();
}

function setup() {
   createCanvas(450, window.innerHeight);     
   gameManager.init();
}

function draw() {
    background(0);
    gameManager.update();
}