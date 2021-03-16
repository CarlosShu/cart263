var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 }, // World gravity.
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var facing = "right";
var stars;
var platforms;
var cursors;
var movingPlatform;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/images/sky.png");
  this.load.image("ground", "assets/images/ground.png");
  this.load.image("platform", "assets/images/platform.png");
  this.load.image("star", "assets/images/star.png");
  this.load.spritesheet("dude", "assets/images/avatar.png", {
    frameWidth: 50,
    frameHeight: 66,
  });
}

function create() {
  this.add.image(640, 360, "sky"); // Sky Background.

  platforms = this.physics.add.staticGroup();

  platforms.create(640, 670, "ground").setScale().refreshBody(); // Main Ground. You can change the scale.

  // platforms.create(600, 400, 'ground');
  // platforms.create(50, 250, 'ground');
  // platforms.create(750, 220, 'ground');

  movingPlatform = this.physics.add.image(400, 500, "platform").setScale(0.25); // Platform. You can change the scale.

  movingPlatform.setImmovable(true);
  movingPlatform.body.allowGravity = false;
  movingPlatform.setVelocityX(60);

  player = this.physics.add.sprite(100, 450, "dude");

  player.setBounce(0.25); // Player bounce off of the ground.
  player.setCollideWorldBounds(true); // Boundaries of the world.

  // Idle left animation.
  this.anims.create({
    key: "idle-left",
    frames: [{ key: "dude", frame: 0 }],
    frameRate: 30,
  });

  // Idle right animation.
  this.anims.create({
    key: "idle-right",
    frames: [{ key: "dude", frame: 17 }],
    frameRate: 30,
  });

  // Going left animation.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 16 }),
    frameRate: 30,
    repeat: -1,
  });

  // Going Right animation.
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 17, end: 32 }),
    frameRate: 30,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, movingPlatform);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(stars, movingPlatform);

  this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update() {
  if (cursors.left.isDown) {
    // Going left.
    player.setVelocityX(-240);

    player.anims.play("left", true);
    facing = "left";
  } else if (cursors.right.isDown) {
    // Going right.
    player.setVelocityX(240);

    player.anims.play("right", true);
    facing = "right";
  } else {
    // Idle.
    player.setVelocityX(0);
    if (facing == "right") {
      player.anims.play("idle-right");
    } else if (facing == "left") {
      player.anims.play("idle-left");
    }
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-400);
  }

  if (movingPlatform.x >= 500) {
    movingPlatform.setVelocityX(-50);
  } else if (movingPlatform.x <= 300) {
    movingPlatform.setVelocityX(50);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
}
