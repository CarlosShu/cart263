var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    preload: preload,
    create: create,
  },
};

var rt;

var game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet("invader1", "assets/images/avatar.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {
  this.invader1 = this.physics.add.staticGroup({
    key: "invader1",
    frame: 0,
    repeat: 13,
    setXY: { x: 32, y: 100, stepX: 50 },
  });

  Phaser.Actions.IncX(this.invader1.getChildren(), 100);

  Phaser.Actions.SetTint(this.invader1.getChildren(), 0xff0000);
}
