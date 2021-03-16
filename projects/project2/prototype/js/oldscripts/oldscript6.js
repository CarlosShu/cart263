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
        gravity: { y: 1000 },
      },
      matter: {
        debug: true,
        gravity: { y: 0.5 },
      },
    },
  },
};

var player;
var facing = "right";
var stars;
var platforms;
var blocks;
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
    frameWidth: 200,
    frameHeight: 252,
  });
  this.load.spritesheet("avatar-run", "assets/images/avatar-run.png", {
    frameWidth: 200,
    frameHeight: 252,
  });
  this.load.spritesheet("avatar-idle", "assets/images/avatar-idle.png", {
    frameWidth: 200,
    frameHeight: 252,
  });
  this.load.spritesheet("avatar-jump", "assets/images/avatar-jump.png", {
    frameWidth: 200,
    frameHeight: 252,
  });
  this.load.spritesheet("avatar-crouch", "assets/images/avatar-crouch.png", {
    frameWidth: 200,
    frameHeight: 252,
  });
}

function create() {
  this.add.image(720, 360, "sky"); // Sky Background.

  platforms = this.physics.add.staticGroup();

  blocks = this.physics.add.image(400, -100, "block").setScale(0.25);
  blocks.setBounce(0.1);
  blocks.setGravity(0, 300);
  blocks.setFriction(0, 1);

  // Ground.
  platforms
    .create(720, 670, "ground", null, { isStatic: true })
    .setScale()
    .refreshBody();

  movingPlatform = this.physics.add.image(400, 485, "platform").setScale(0.25); // Platform. You can change the scale.

  movingPlatform.setImmovable(true);
  movingPlatform.body.allowGravity = false;
  movingPlatform.setVelocityX(60);

  //  Player.
  player = this.physics.add.sprite(100, 450, "avatar").setScale(0.25);
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

  // Walking left animation.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("avatar", { start: 0, end: 15 }),
    frameRate: 30,
    repeat: -1,
  });

  // Walking Right animation.
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("avatar", { start: 17, end: 32 }),
    frameRate: 30,
    repeat: -1,
  });

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

  // Running Right animation.
  this.anims.create({
    key: "run-right",
    frames: this.anims.generateFrameNumbers("avatar-run", {
      start: 20,
      end: 39,
    }),
    frameRate: 60,
    repeat: -1,
  });

  // Jump left animation.
  this.anims.create({
    key: "up-left",
    frames: this.anims.generateFrameNumbers("avatar-jump", {
      start: 0,
      end: 10,
    }),
    frameRate: 30,
    repeat: -1,
  });

  // Jump Right animation.
  this.anims.create({
    key: "up-right",
    frames: this.anims.generateFrameNumbers("avatar-jump", {
      start: 11,
      end: 21,
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
    shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
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
  this.physics.add.collider(player, blocks);
  this.physics.add.collider(blocks, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(stars, movingPlatform);

  this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update() {
  // Walking left.
  if (cursors.left.isDown) {
    if (cursors.shift.isDown) {
      if (player.body.touching.down) {
        player.setVelocityX(-360);
        player.anims.play("run-left", true);
        facing = "left";
      }
    } else {
      player.setVelocityX(-180);
      player.anims.play("left", true);
      facing = "left";
    }

    // Walking right.
  } else if (cursors.right.isDown) {
    if (cursors.shift.isDown) {
      if (player.body.touching.down) {
        player.setVelocityX(360);
        player.anims.play("run-right", true);
        facing = "right";
      }
    } else {
      player.setVelocityX(180);
      player.anims.play("right", true);
      facing = "right";
    }

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
