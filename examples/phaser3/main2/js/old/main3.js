var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

let game = new Phaser.Game(config);

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    this.play("run-left");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.25);
    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.setVelocity(0, -200);
  }
}

function preload() {
  this.load.spritesheet("avatar-run", "assets/images/avatar-run.png", {
    frameWidth: 200,
    frameHeight: 252,
  });
}

function create() {
  // Running left animation.
  this.anims.create({
    key: "run-left",
    frames: this.anims.generateFrameNumbers("avatar-run", {
      start: 0,
      end: 19,
    }),
    frameRate: 60,
    repeat: -1,
  });

  for (var i = 0; i < 10; i++) {
    new Player(
      this,
      Phaser.Math.Between(64, 736),
      Phaser.Math.Between(100, 500)
    );
  }

  this.physics.world.on("worldbounds", onWorldBounds);
}
