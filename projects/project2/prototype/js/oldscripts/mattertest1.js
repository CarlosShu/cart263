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
  this.load.image("platform", "assets/images/platform.png");
  this.load.image("block", "assets/images/block.png");
  this.load.image("ramp", "assets/images/ramp.png");
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

  //  Player.
  player = this.physics.add.sprite(100, 0, "avatar").setScale(0.25);
  player.setBounce(0.25); // Player bounce off of the ground.
  player.setCollideWorldBounds(true); // Boundaries of the world.
  player.setSize(100, 252, true);

  // Text.
  var text = this.add
    .text(720, 60, "Use WASD to walk, jump, crouch, and hold SHIFT to sprint.")
    .setFontSize(20)
    .setFontFamily("Arial")
    .setOrigin(0.5);

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

  // Replaces cursor keys with WASD.
  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
  });

  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, block);
  this.physics.add.collider(block, ground);
  this.physics.add.collider(block, block);
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
    player.setVelocityY(-500);
  }
}
