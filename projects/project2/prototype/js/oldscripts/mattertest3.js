var config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 720,
  parent: "phaser-example",
  scene: {
    preload: preload,
    create: create,
    update: update,
    physics: {
      arcade: {
        debug: false,
        gravity: { y: 800 },
      },
    },
  },
};

var facing = "right";
var cursors;
var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/images/sky.png");
  this.load.image("ground", "assets/images/ground.png");
  this.load.image("block", "assets/images/block.png");
}

function create() {
  // Sky Background.
  var sky = this.add.group({
    defaultKey: "sky",
  });
  sky.create(720, 360);

  // Ground.
  var ground = this.physics.add.staticGroup({
    defaultKey: "ground",
    isStatic: true,
    collideWorldBounds: true,
  });
  ground.create(720, 670).setScale().refreshBody().setSize(1500, 180, true);

  // Block.
  var block = this.physics.add.group({
    defaultKey: "block",
    bounceY: 0.25,
    bounceX: 0.25,
    dragX: 750,
    collideWorldBounds: true,
  });
  block.create(500, 400).setScale(0.25);

  this.physics.add.collider(block, ground);
  this.physics.add.collider(block, block);
}

function update() {}
