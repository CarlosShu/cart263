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
var score = 0;
var text;
var currentTime = 150;
var timedEvent;

function preload() {
  this.load.image("sky", "assets/images/sky.png");
  this.load.image("ground", "assets/images/ground.png");
  this.load.image("platform", "assets/images/platform.png");
  this.load.image("block", "assets/images/block.png");
  this.load.image("ramp", "assets/images/ramp.png");
  this.load.spritesheet("avatar-walk", "assets/images/avatar-walk.png", {
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
  this.load.spritesheet("avatar-push", "assets/images/avatar-push.png", {
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

  //  Shadow of the player.
  shadow = this.add.sprite(0, 0, "avatar-idle");
  shadow.setScale(0.25);
  shadow.setTint(0x000000);
  shadow.setAlpha(0.6);

  //  Player.
  player = this.physics.add.sprite(0, 0, "avatar-idle");
  player.setScale(0.25);
  player.setBounce(0.25); // Player bounce off of the ground.
  player.setCollideWorldBounds(true); // Boundaries of the world.
  player.setSize(100, 256, true);

  // Block.
  var block = this.physics.add.group({
    defaultKey: "block",
    bounceY: 0.25,
    bounceX: 0.25,
    dragX: 1500,
    collideWorldBounds: true,
  });
  block.create(500, 400).setScale(0.25).setSize(350, 0);
  block.create(800, 400).setScale(0.25);

  // Moving platform X.
  var movingPlatformX = this.physics.add.group({
    defaultKey: "platform",
    bounceY: 0.25,
    bounceX: 0.25,
    collideWorldBounds: true,
    immovable: true,
    allowGravity: false,
  });
  movingPlatformX.create(800, 325).setScale(0.25);

  // Moving platform Y.
  var movingPlatformY = this.physics.add.group({
    defaultKey: "platform",
    bounceY: 0.25,
    bounceX: 0.25,
    collideWorldBounds: true,
    immovable: true,
    allowGravity: false,
  });
  movingPlatformY.create(400, 325).setScale(0.25);

  // Platform.
  var platform = this.physics.add.group({
    defaultKey: "platform",
    bounceY: 0.25,
    bounceX: 0.25,
    collideWorldBounds: true,
    immovable: true,
    allowGravity: false,
  });
  platform.create(200, 425).setScale(0.25);
  platform.create(600, 425).setScale(0.25);
  platform.create(1200, 325).setScale(0.25);

  // Idle left animation.
  this.anims.create({
    key: "idle-left",
    frames: this.anims.generateFrameNumbers("avatar-idle", {
      start: 0,
      end: 15,
    }),
    frameRate: 32,
    repeat: -1,
  });

  // Idle Right animation.
  this.anims.create({
    key: "idle-right",
    frames: this.anims.generateFrameNumbers("avatar-idle", {
      start: 16,
      end: 31,
    }),
    frameRate: 32,
    repeat: -1,
  });

  // Walking left animation.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("avatar-walk", {
      start: 0,
      end: 31,
    }),
    frameRate: 33,
    repeat: -1,
  });

  // Walking Right animation.
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("avatar-walk", {
      start: 32,
      end: 63,
    }),
    frameRate: 33,
    repeat: -1,
  });

  // Running left animation.
  this.anims.create({
    key: "run-left",
    frames: this.anims.generateFrameNumbers("avatar-run", {
      start: 0,
      end: 39,
    }),
    frameRate: 60,
    repeat: -1,
  });

  // Running Right animation.
  this.anims.create({
    key: "run-right",
    frames: this.anims.generateFrameNumbers("avatar-run", {
      start: 40,
      end: 79,
    }),
    frameRate: 60,
    repeat: -1,
  });

  // Jump left animation.
  this.anims.create({
    key: "up-left",
    frames: this.anims.generateFrameNumbers("avatar-jump", {
      start: 0,
      end: 21,
    }),
    frameRate: 44,
    repeat: -1,
  });

  // Jump Right animation.
  this.anims.create({
    key: "up-right",
    frames: this.anims.generateFrameNumbers("avatar-jump", {
      start: 22,
      end: 43,
    }),
    frameRate: 44,
    repeat: -1,
  });

  // Crouch left animation.
  this.anims.create({
    key: "down-left",
    frames: this.anims.generateFrameNumbers("avatar-crouch", {
      start: 0,
      end: 3,
    }),
    frameRate: 15,
    repeat: -1,
  });

  // Crouch Right animation.
  this.anims.create({
    key: "down-right",
    frames: this.anims.generateFrameNumbers("avatar-crouch", {
      start: 4,
      end: 7,
    }),
    frameRate: 15,
    repeat: -1,
  });

  // Running Right animation.
  this.anims.create({
    key: "push-left",
    frames: this.anims.generateFrameNumbers("avatar-push", {
      start: 0,
      end: 31,
    }),
    frameRate: 32,
    repeat: -1,
  });

  // Running Right animation.
  this.anims.create({
    key: "push-right",
    frames: this.anims.generateFrameNumbers("avatar-push", {
      start: 32,
      end: 63,
    }),
    frameRate: 32,
    repeat: -1,
  });

  // Replaces cursor keys with WASD.
  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    reset: Phaser.Input.Keyboard.KeyCodes.R,
  });

  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, movingPlatformX);
  this.physics.add.collider(player, movingPlatformY);
  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, block);
  this.physics.add.collider(block, ground);
  this.physics.add.collider(block, block);

  // Camera function.
  this.cameras.main.startFollow(player);

  //  So we can see how much health we have left
  text = this.add
    .text(0, 0, "TEXT", {
      fontSize: "15px",
      align: "center",
      fontFamily: "arial",
    })
    .setOrigin(0.5);

  // Time loop.
  timedEvent = this.time.addEvent({
    delay: 50,
    callback: currentText,
    callbackScope: this,
    loop: true,
  });
}

// Changes the text based on a timer.
function currentText() {
  currentTime--;
  if (currentTime === 0) {
    currentTime = 150;
  }
}

function update() {
  // Updates the text.
  if (currentTime > 100) {
    text.setText("Use WASD to walk, jump, and crouch.");
  } else if (currentTime <= 100 && currentTime > 50) {
    text.setText("Hold SHIFT to sprint.");
  } else if (currentTime <= 50) {
    text.setText("Press R to reset the level.");
  }

  // Updates the position of the text relative to the player's position.
  text.x = player.body.position.x;
  text.y = player.body.position.y + 350;

  // Shadow offset.
  shadow.x = player.body.position.x - 5;
  shadow.y = player.body.position.y + 20;

  // Going left.
  if (cursors.left.isDown) {
    // Sprinting left.
    if (cursors.shift.isDown && !player.body.touching.left) {
      player.setVelocityX(-360);
      player.anims.play("run-left", true);
      shadow.anims.play("run-left", true);
      facing = "left";
    }
    // Waling left.
    else if (!player.body.touching.left) {
      player.setVelocityX(-180);
      player.anims.play("left", true);
      shadow.anims.play("left", true);
      facing = "left";
    } // If the player is touching the block.
    else if (player.body.touching.left) {
      player.setVelocityX(-90);
      player.anims.play("push-left", true);
      shadow.anims.play("push-left", true);
      facing = "left";
    }

    // Going right.
  } else if (cursors.right.isDown) {
    // Sprinting Right.
    if (cursors.shift.isDown && !player.body.touching.right) {
      player.setVelocityX(360);
      player.anims.play("run-right", true);
      shadow.anims.play("run-right", true);
      facing = "right";
      // Waling right.
    } else if (!player.body.touching.right) {
      player.setVelocityX(180);
      player.anims.play("right", true);
      shadow.anims.play("right", true);
      facing = "right";
    } // If the player is touching the block.
    else if (player.body.touching.right) {
      player.setVelocityX(90);
      player.anims.play("push-right", true);
      shadow.anims.play("push-right", true);
      facing = "right";
    }

    // Crouching.
  } else if (cursors.down.isDown) {
    player.setVelocityX(0);
    if (facing == "right") {
      player.anims.play("down-right", true);
      shadow.anims.play("down-right", true);
    } else if (facing == "left") {
      player.anims.play("down-left", true);
      shadow.anims.play("down-left", true);
    }

    // Idle.
  } else {
    player.setVelocityX(0);
    if (player.body.touching.down) {
      // Idle Right.
      if (facing == "right") {
        player.anims.play("idle-right", true);
        shadow.anims.play("idle-right", true);
        // Idle Left.
      } else if (facing == "left") {
        player.anims.play("idle-left", true);
        shadow.anims.play("idle-left", true);
      }
    } else if (!player.body.touching.down) {
      if (facing == "right") {
        player.anims.play("up-right", true);
        shadow.anims.play("up-right", true);
      } else if (facing == "left") {
        player.anims.play("up-left", true);
        shadow.anims.play("up-left", true);
      }
    }
  }

  if (cursors.up.isDown && player.body.touching.down) {
    // Jump.
    player.setVelocityY(-500);
  }

  // Reset scene.
  if (cursors.reset.isDown) {
    this.scene.restart();
  }
}
