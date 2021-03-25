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
  this.sky = this.add.group({
    defaultKey: "sky",
  });
  this.sky.create(720, 360);

  // Ground.
  this.ground = this.physics.add.staticGroup({
    defaultKey: "ground",
    isStatic: true,
    collideWorldBounds: true,
  });
  this.ground
    .create(720, 670)
    .setScale()
    .refreshBody()
    .setSize(1500, 180, true);

  //  Shadow of the player.
  this.shadow = this.add.sprite(0, 0, "avatar-idle");
  this.shadow.setScale(0.25);
  this.shadow.setTint(0x000000);
  this.shadow.setAlpha(0.6);

  //  Player.
  this.player = this.physics.add.sprite(0, 0, "avatar-idle");
  this.player.setScale(0.25);
  this.player.setBounce(0.25); // Player bounce off of the ground.
  this.player.setCollideWorldBounds(true); // Boundaries of the world.
  this.player.setSize(100, 256, true);

  // Block.
  this.block = this.physics.add.group({
    defaultKey: "block",
    bounceY: 0.25,
    bounceX: 0.25,
    dragX: 1500,
    collideWorldBounds: true,
  });
  this.block.create(500, 400).setScale(0.25);

  // Moving platform X.
  this.movingPlatformX = this.physics.add.group({
    defaultKey: "platform",
    bounceY: 0.25,
    bounceX: 0.25,
    collideWorldBounds: true,
    immovable: true,
    allowGravity: false,
  });
  this.movingPlatformX.create(800, 325).setScale(0.25);

  // Moving platform Y.
  this.movingPlatformY = this.physics.add.group({
    defaultKey: "platform",
    bounceY: 0.25,
    bounceX: 0.25,
    collideWorldBounds: true,
    immovable: true,
    allowGravity: false,
  });
  this.movingPlatformY.create(400, 325).setScale(0.25);

  // Platform.
  this.platform = this.physics.add.group({
    defaultKey: "platform",
    bounceY: 0.25,
    bounceX: 0.25,
    collideWorldBounds: true,
    immovable: true,
    allowGravity: false,
  });
  this.platform.create(200, 425).setScale(0.25);
  this.platform.create(600, 425).setScale(0.25);
  this.platform.create(1200, 325).setScale(0.25);

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

  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.player, this.movingPlatformX);
  this.physics.add.collider(this.player, this.movingPlatformY);
  this.physics.add.collider(this.player, this.platform);
  this.physics.add.collider(this.player, this.block);
  this.physics.add.collider(this.block, this.ground);
  this.physics.add.collider(this.block, this.block);

  // Camera function.
  this.cameras.main.startFollow(this.player);

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
  text.x = this.player.body.position.x;
  text.y = this.player.body.position.y + 350;

  // Shadow offset.
  this.shadow.x = this.player.body.position.x - 5;
  this.shadow.y = this.player.body.position.y + 20;

  // Going left.
  if (cursors.left.isDown) {
    // Sprinting left.
    if (cursors.shift.isDown && !this.player.body.touching.left) {
      this.player.setVelocityX(-360);
      this.player.anims.play("run-left", true);
      this.shadow.anims.play("run-left", true);
      facing = "left";
    }
    // Waling left.
    else if (!this.player.body.touching.left) {
      this.player.setVelocityX(-180);
      this.player.anims.play("left", true);
      this.shadow.anims.play("left", true);
      facing = "left";
    } // If the player is touching the block.
    else if (this.player.body.touching.left) {
      this.player.setVelocityX(-90);
      this.player.anims.play("push-left", true);
      this.shadow.anims.play("push-left", true);
      facing = "left";
    }

    // Going right.
  } else if (cursors.right.isDown) {
    // Sprinting Right.
    if (cursors.shift.isDown && !this.player.body.touching.right) {
      this.player.setVelocityX(360);
      this.player.anims.play("run-right", true);
      this.shadow.anims.play("run-right", true);
      facing = "right";
      // Waling right.
    } else if (!this.player.body.touching.right) {
      this.player.setVelocityX(180);
      this.player.anims.play("right", true);
      this.shadow.anims.play("right", true);
      facing = "right";
    } // If the player is touching the block.
    else if (this.player.body.touching.right) {
      this.player.setVelocityX(90);
      this.player.anims.play("push-right", true);
      this.shadow.anims.play("push-right", true);
      facing = "right";
    }

    // Crouching.
  } else if (cursors.down.isDown) {
    this.player.setVelocityX(0);
    if (facing == "right") {
      this.player.anims.play("down-right", true);
      this.shadow.anims.play("down-right", true);
    } else if (facing == "left") {
      this.player.anims.play("down-left", true);
      this.shadow.anims.play("down-left", true);
    }

    // Idle.
  } else {
    this.player.setVelocityX(0);
    if (this.player.body.touching.down) {
      // Idle Right.
      if (facing == "right") {
        this.player.anims.play("idle-right", true);
        this.shadow.anims.play("idle-right", true);
        // Idle Left.
      } else if (facing == "left") {
        this.player.anims.play("idle-left", true);
        this.shadow.anims.play("idle-left", true);
      }
    } else if (!this.player.body.touching.down) {
      if (facing == "right") {
        this.player.anims.play("up-right", true);
        this.shadow.anims.play("up-right", true);
      } else if (facing == "left") {
        this.player.anims.play("up-left", true);
        this.shadow.anims.play("up-left", true);
      }
    }
  }

  if (cursors.up.isDown && this.player.body.touching.down) {
    // Jump.
    this.player.setVelocityY(-500);
  }

  // Reset scene.
  if (cursors.reset.isDown) {
    this.scene.restart();
  }
}
