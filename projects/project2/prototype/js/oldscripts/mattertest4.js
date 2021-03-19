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
      default: "matter",
      matter: {},
      debug: true,
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
  this.matter.add.image(720, 670, "ground", null, {
    isStatic: true,
  });

  this.matter.add
    .image(400, 100, "block")
    .setScale(0.25)
    .setBody({
      type: "rectangle",
      width: 340(0.25),
      height: 300(0.25),
    });

  // ground
  //  .setBody({
  //    type: "rectangle",
  //    isStatic: true,
  //    width: 1000,
  //    height: 180,
  //  })
  //  .setIgnoreGravity(true);
}

function update() {}
