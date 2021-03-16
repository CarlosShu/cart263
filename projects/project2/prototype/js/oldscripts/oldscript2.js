var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 }, // World gravity.
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
  this.load.image("block", "assets/images/block.png");
  this.load.image("star", "assets/images/star.png");
  this.load.spritesheet("avatar", "assets/images/avatar.png", {
    frameWidth: 50,
    frameHeight: 66,
  });
  this.load.spritesheet("avatar-idle", "assets/images/avatar-idle.png", {
    frameWidth: 50,
    frameHeight: 66,
  });
  this.load.spritesheet("avatar-jump", "assets/images/avatar-jump.png", {
    frameWidth: 50,
    frameHeight: 66,
  });
  this.load.spritesheet("avatar-crouch", "assets/images/avatar-crouch.png", {
    frameWidth: 50,
    frameHeight: 66,
  });
}

function create() {
  this.add.image(640, 360, "sky"); // Sky Background.

  platforms = this.physics.add.staticGroup();

  platforms.create(640, 670, "ground").setScale().refreshBody(); // Main Ground. You can change the scale.

  // platforms.create(600, 400, "platform").setScale(0.25);
  // platforms.create(50, 250, "platform").setScale(0.25);
  // platforms.create(750, 220, "platform").setScale(0.25);

  movingPlatform = this.physics.add.image(400, 485, "platform").setScale(0.25); // Platform. You can change the scale.

  movingPlatform.setImmovable(true);
  movingPlatform.body.allowGravity = false;
  movingPlatform.setVelocityX(60);

  player = this.physics.add.sprite(100, 450, "avatar");

  player.setBounce(0.25); // Player bounce off of the ground.
  player.setCollideWorldBounds(true); // Boundaries of the world.

  // Idle left animation.
  this.anims.create({
    key: "idle-left",
    frames: this.anims.generateFrameNumbers("avatar-idle", {
      start: 0,
      end: 5,
    }),
    frameRate: 15,
    repeat: -1,
  });

  // Idle Right animation.
  this.anims.create({
    key: "idle-right",
    frames: this.anims.generateFrameNumbers("avatar-idle", {
      start: 6,
      end: 11,
    }),
    frameRate: 15,
    repeat: -1,
  });

  // Going left animation.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("avatar", { start: 0, end: 15 }),
    frameRate: 30,
    repeat: -1,
  });

  // Going Right animation.
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("avatar", { start: 17, end: 32 }),
    frameRate: 30,
    repeat: -1,
  });

  // Jump left animation.
  this.anims.create({
    key: "up-left",
    frames: this.anims.generateFrameNumbers("avatar-jump", {
      start: 0,
      end: 9,
    }),
    frameRate: 30,
    repeat: -1,
  });

  // Jump Right animation.
  this.anims.create({
    key: "up-right",
    frames: this.anims.generateFrameNumbers("avatar-jump", {
      start: 10,
      end: 19,
    }),
    frameRate: 30,
    repeat: -1,
  });

  // Crouch left animation.
  this.anims.create({
    key: "down-left",
    frames: this.anims.generateFrameNumbers("avatar-crouch", {
      start: 0,
      end: 0,
    }),
    frameRate: 15,
    repeat: 0,
  });

  // Crouch Right animation.
  this.anims.create({
    key: "down-right",
    frames: this.anims.generateFrameNumbers("avatar-crouch", {
      start: 7,
      end: 7,
    }),
    frameRate: 15,
    repeat: 0,
  });

  // Replaces cursor keys with WASD.
  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  stars = this.physics.add.group({
    key: "star",
    repeat: 18,
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

  //  Arcade Physics:
  var block = this.physics.add.image(400, -100, "block");

  block.setBounce(0.5, 0.15);
  block.setCollideWorldBounds(true);
}

function update() {
  // Going left.
  if (cursors.left.isDown) {
    player.setVelocityX(-240);
    player.anims.play("left", true);
    facing = "left";

    // Going right.
  } else if (cursors.right.isDown) {
    player.setVelocityX(240);
    player.anims.play("right", true);
    facing = "right";

    // Crouching.
  } else if (cursors.down.isDown) {
    player.setVelocityX(0);

    if (facing == "right") {
      player.anims.play("down-right");
    } else if (facing == "left") {
      player.anims.play("down-left");
    }

    // Idle.
  } else {
    player.setVelocityX(0);
    if (player.body.touching.down) {
      // Idle Right.
      if (facing == "right") {
        player.anims.play("idle-right", true);
        // Idle Left.
      } else if (facing == "left") {
        player.anims.play("idle-left", true);
      }
    } else if (!player.body.touching.down) {
      if (facing == "right") {
        player.anims.play("up-right", true);
      } else if (facing == "left") {
        player.anims.play("up-left", true);
      }
    }
  }

  // Jump.
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-600);
  }

  // Moving platform.
  if (movingPlatform.x >= 500) {
    movingPlatform.setVelocityX(-50);
  } else if (movingPlatform.x <= 300) {
    movingPlatform.setVelocityX(50);
  }
}

// Star.
function collectStar(player, star) {
  star.disableBody(true, true);
}
