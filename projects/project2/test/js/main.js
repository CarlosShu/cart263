var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scale: {
    parent: "game",
    width: 600,
    height: 600,
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      fps: 60,
    },
  },
  scene: {
    preload: preload,
    update: update,
    create: create,
  },
};

function preload() {
  this.load.image(
    "bg",
    "https://www.toptal.com//designers/subtlepatterns/patterns/hip-square.png"
  );
  this.load.spritesheet("player", "assets/images/avatar-idle.png", {
    frameWidth: 200,
    frameHeight: 260,
  });
  this.load.image("ladder", "assets/images/ladder.png");
}

function create() {
  this.ladder = this.add
    .tileSprite(150, 150, 300, 300, "ladder")
    .setOrigin(0, 0);
  this.player = this.add.tileSprite(49, 49, 32, 32, "player").setOrigin(0, 0);
  this.player.touchesladder = false;
  this.txt = this.add.text(300, 10, "DOES NOT TOUCH", { color: "#FF0000" });

  this.physics.add.existing(this.player);
  this.physics.add.existing(this.ladder);

  this.physics.moveTo(this.player, 500, 500, 50);

  let scene = this;

  this.physics.add.overlap(this.player, this.ladder, function (b1, b2) {
    scene.player.touchesladder = true;
  });
}

function update() {
  this.txt.setText(this.player.touchesladder ? "TOUCHES" : "DOES NOT TOUCH");
  this.player.touchesladder = false;

  //Move the player back and forth
  if (this.player.body.x > 480 || this.player.body.y > 480) {
    this.physics.moveTo(this.player, 50, 50, 50);
  } else if (this.player.body.x < 50 || this.player.body.y < 50) {
    this.physics.moveTo(this.player, 500, 500, 50);
  }
}

new Phaser.Game(config);
