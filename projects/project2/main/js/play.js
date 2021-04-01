class Play extends Phaser.Scene {
  constructor() {
    super({ key: "play" });
  }

  create() {
    let scene = this;

    // Variables.
    this.hubStars = 0;
    this.facing = "right";

    // Sky Background.
    this.sky = this.add.group({
      defaultKey: "sky",
    });
    this.sky.create(720, 360).setDepth(-3).setPipeline("Light2D");

    // Ground.
    this.ground = this.physics.add.staticGroup({
      defaultKey: "ground",
      isStatic: true,
      collideWorldBounds: true,
    });
    this.ground
      .create(720, 670)
      .setDepth(-2)
      .setScale(0.5)
      .refreshBody()
      .setSize(1500, 150, true)
      .setPipeline("Light2D");

    //  Shadow of the player.
    this.shadow = this.add.sprite(0, 0, "avatar-idle");
    this.shadow.setScale(0.25);
    this.shadow.setTint(0x000000);
    this.shadow.setAlpha(0.6);
    this.shadow.setPipeline("Light2D");

    //  Player.
    this.player = this.physics.add.sprite(0, 0, "avatar-idle");
    this.player.setScale(0.25);
    //  this.player.setBounce(0.4); // Player bounce off of the ground.
    this.player.setCollideWorldBounds(false); // Boundaries of the world.
    this.player.setSize(75, 260, true);
    this.player.touchesdoor = false;
    this.player.touchesladder = false;
    this.player.touchesbounce = false;

    // Calls the Create Animation function.
    this.createAnimations();

    // Door.
    this.door = this.physics.add.group({
      defaultKey: "door",
      bounceY: 0.25,
      dragX: 1500,
      collideWorldBounds: true,
    });

    this.door
      .create(1200, 400)
      .setDepth(-1)
      .setScale(0.25)
      .setSize(250, 599, true)
      .setTint(0x00ff00)
      .setPipeline("Light2D");

    // Door.
    this.star = this.physics.add.group({
      defaultKey: "star",
      immovable: true,
      allowGravity: false,
    });

    this.star
      .create(1200, 225)
      .setScale(0.5)
      .setTint(0xffffff)
      .setPipeline("Light2D");

    // Ladder.
    this.ladder = this.physics.add.group({
      defaultKey: "ladder",
      collideWorldBounds: true,
    });

    this.ladder
      .create(300, 150)
      .setDepth(-1)
      .setScale(0.25)
      .setPipeline("Light2D");

    // Block.
    this.block = this.physics.add.group({
      defaultKey: "block",
      bounceY: 0.25,
      dragX: 1500,
      collideWorldBounds: true,
    });

    this.block.create(500, 400).setScale(0.25).setPipeline("Light2D");

    // Bouncing Block.
    this.bouncingBlock = this.physics.add.group({
      defaultKey: "block",
      dragX: 1500,
      collideWorldBounds: true,
      immovable: true,
      allowGravity: false,
    });

    this.bouncingBlock.create(1000, 400).setScale(0.25).setPipeline("Light2D");

    // Set the tint.
    // .setTint(0x00ff00)

    // Platform.
    this.platform = this.physics.add.group({
      defaultKey: "platform",
      collideWorldBounds: true,
      immovable: true,
      allowGravity: false,
    });
    this.platform.create(200, 425).setScale(0.25).setPipeline("Light2D");
    this.platform.create(600, 425).setScale(0.25).setPipeline("Light2D");
    this.platform.create(800, 325).setScale(0.25).setPipeline("Light2D");
    this.platform.create(1200, 325).setScale(0.25).setPipeline("Light2D");

    // Colliders.
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.movingPlatformX);
    this.physics.add.collider(this.player, this.movingPlatformY);
    this.physics.add.collider(this.player, this.platform);
    this.physics.add.collider(this.door, this.ground);
    this.physics.add.collider(this.block, this.ground);
    this.physics.add.collider(this.block, this.block);
    this.physics.add.collider(this.ladder, this.ground);

    // COlliders with functions.
    this.physics.add.collider(
      this.player,
      this.block,
      this.hitBlock,
      null,
      this
    );
    this.physics.add.collider(this.player, this.bouncingBlock, function (
      b1,
      b2
    ) {
      scene.player.touchesbounce = true;
    });

    // Overlaps with functions.
    this.physics.add.overlap(
      this.player,
      this.star,
      this.collectStar,
      null,
      this
    );
    this.physics.add.overlap(this.player, this.door, function (b1, b2) {
      scene.player.touchesdoor = true;
    });
    this.physics.add.overlap(this.player, this.ladder, function (b1, b2) {
      scene.player.touchesladder = true;
    });

    // Cursor keys.
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      reset: Phaser.Input.Keyboard.KeyCodes.R,
    });

    // Camera function.
    this.camera = this.cameras.main.startFollow(this.player);
    this.camera.setZoom(1);

    // Lights.
    this.lights.enable();
    this.lights.setAmbientColor(0x808080);

    // Dim light that follows the player.
    this.light = this.lights.addLight(0, 0, 720);
    this.light.setIntensity(1);

    // Star glowing light.
    this.starLight = this.lights.addLight(1200, 225, 360, 0xffffff);
    this.starLight.setIntensity(2);

    //  Stars collected.
    this.hud = this.add
      .text(0, 0, this.hubStars + "/3 Stars", {
        fontSize: "15px",
        align: "center",
        fontFamily: "block",
      })
      .setOrigin(0.5);
  }

  update() {
    // Updates the position of the text relative to the player's position.
    this.hud.x = this.player.body.position.x + 650;
    this.hud.y = this.player.body.position.y - 300;

    // Text updates.
    this.hud.text = `${this.hubStars}/3 Stars`;

    // Shadow offset.
    this.shadow.x = this.player.body.position.x - 5;
    this.shadow.y = this.player.body.position.y + 20;

    // Light.
    this.light.x = this.player.x;
    this.light.y = this.player.y;

    // Going left.
    if (this.cursors.left.isDown) {
      // Sprinting left.
      if (this.cursors.shift.isDown) {
        this.player.setVelocityX(-360);
        this.player.anims.play("run-left", true);
        this.shadow.anims.play("run-left", true);
        this.facing = "left";
      }
      // Waling left.
      else if (
        !this.player.body.touching.left ||
        this.player.touchesdoor ||
        this.player.touchesladder
      ) {
        this.player.setVelocityX(-180);
        this.player.anims.play("walk-left", true);
        this.shadow.anims.play("walk-left", true);
        this.facing = "left";
      } else if (this.cursors.shift.isDown && this.player.body.touching.left) {
        this.player.setVelocityX(-360);
        this.player.anims.play("push-left", true);
        this.shadow.anims.play("push-left", true);
        this.facing = "left";
      }
      // If the player is touching the block.
      else if (this.player.body.touching.left) {
        this.player.setVelocityX(-120);
        this.player.anims.play("push-left", true);
        this.shadow.anims.play("push-left", true);
        this.facing = "left";
      }

      // Going right.
    } else if (this.cursors.right.isDown) {
      // Sprinting Right.
      if (this.cursors.shift.isDown) {
        this.player.setVelocityX(360);
        this.player.anims.play("run-right", true);
        this.shadow.anims.play("run-right", true);
        this.facing = "right";
        // Waling right.
      } else if (
        !this.player.body.touching.right ||
        this.player.touchesdoor ||
        this.player.touchesladder
      ) {
        this.player.setVelocityX(180);
        this.player.anims.play("walk-right", true);
        this.shadow.anims.play("walk-right", true);
        this.facing = "right";
        // Sprinting right.
      } else if (this.cursors.shift.isDown && this.player.body.touching.right) {
        this.player.setVelocityX(360);
        this.player.anims.play("push-right", true);
        this.shadow.anims.play("push-right", true);
        this.facing = "right";
      } // If the player is touching the block.
      else if (this.player.body.touching.right) {
        this.player.setVelocityX(120);
        this.player.anims.play("push-right", true);
        this.shadow.anims.play("push-right", true);
        this.facing = "right";
      }

      // Crouching.
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(800);
      if (
        this.facing === "right" &&
        this.player.anims.currentAnim.key !== "down-right"
      ) {
        this.player.anims.play("down-right");
        this.shadow.anims.play("down-right", true);
      } else if (
        this.facing === "left" &&
        this.player.anims.currentAnim.key !== "down-left"
      ) {
        this.player.anims.play("down-left");
        this.shadow.anims.play("down-left", true);
      }

      // Idle.
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.touching.down) {
        // Idle Right.
        if (this.facing == "right") {
          this.player.anims.play("idle-right", true);
          this.shadow.anims.play("idle-right", true);
          // Idle Left.
        } else if (this.facing == "left") {
          this.player.anims.play("idle-left", true);
          this.shadow.anims.play("idle-left", true);
        }
      } else if (
        !this.player.body.touching.down &&
        !this.player.touchesladder
      ) {
        if (this.facing == "right") {
          this.player.anims.play("up-right", true);
          this.shadow.anims.play("up-right", true);
        } else if (this.facing == "left") {
          this.player.anims.play("up-left", true);
          this.shadow.anims.play("up-left", true);
        }
      }
    }

    // Jump.
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500);
    }

    // If the player is touching the bouncing block.
    if (this.player.touchesbounce && this.player.body.touching.down) {
      this.player.setVelocityY(-800);
    }

    // If the player is touching the Ladder.
    if (this.player.touchesladder) {
      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -250;
        this.player.anims.play("climb", true);
        this.shadow.anims.play("climb", true);
        this.facing = "left";
      }
    }

    // Go to the next level.
    if (this.player.touchesdoor == true) {
      if (this.cursors.space.isDown) {
        this.scene.start("title");
      }
    }

    // Camera zoom.
    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
        this.camera.setZoom(1);
      }
      if (deltaY < 0) {
        this.camera.setZoom(1.5);
      } else {
      }
    });

    // Resets ladder variable.
    this.player.touchesdoor = false;

    // Resets bounce variable.
    this.player.touchesbounce = false;

    // Resets Door variable.
    this.player.touchesladder = false;

    // Resets the scene.
    if (this.cursors.reset.isDown) {
      this.scene.restart();
    }
  }

  // Create animations function.
  createAnimations() {
    // Idle left animation.
    this.anims.create({
      key: "idle-left",
      frames: this.anims.generateFrameNumbers("avatar-idle", {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    // Idle Right animation.
    this.anims.create({
      key: "idle-right",
      frames: this.anims.generateFrameNumbers("avatar-idle", {
        start: 16,
        end: 31,
      }),
      frameRate: 30,
      repeat: -1,
    });

    // Walking left animation.
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("avatar-walk", {
        start: 0,
        end: 31,
      }),
      frameRate: 30,
      repeat: -1,
    });

    // Walking Right animation.
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("avatar-walk", {
        start: 32,
        end: 63,
      }),
      frameRate: 30,
      repeat: -1,
    });

    // Running left animation.
    this.anims.create({
      key: "run-left",
      frames: this.anims.generateFrameNumbers("avatar-run", {
        start: 0,
        end: 39,
      }),
      frameRate: 90,
      repeat: -1,
    });

    // Running Right animation.
    this.anims.create({
      key: "run-right",
      frames: this.anims.generateFrameNumbers("avatar-run", {
        start: 40,
        end: 79,
      }),
      frameRate: 90,
      repeat: -1,
    });

    // Jump left animation.
    this.anims.create({
      key: "up-left",
      frames: this.anims.generateFrameNumbers("avatar-jump", {
        start: 0,
        end: 21,
      }),
      frameRate: 45,
      repeat: -1,
    });

    // Jump Right animation.
    this.anims.create({
      key: "up-right",
      frames: this.anims.generateFrameNumbers("avatar-jump", {
        start: 22,
        end: 43,
      }),
      frameRate: 45,
      repeat: -1,
    });

    // Crouch left animation.
    this.anims.create({
      key: "down-left",
      frames: this.anims.generateFrameNumbers("avatar-crouch", {
        start: 27,
        end: 0,
      }),
      frameRate: 240,
      repeat: 0,
    });

    // Crouch Right animation.
    this.anims.create({
      key: "down-right",
      frames: this.anims.generateFrameNumbers("avatar-crouch", {
        start: 28,
        end: 56,
      }),
      frameRate: 240,
      repeat: 0,
    });

    // Running Right animation.
    this.anims.create({
      key: "push-left",
      frames: this.anims.generateFrameNumbers("avatar-push", {
        start: 0,
        end: 31,
      }),
      frameRate: 30,
      repeat: -1,
    });

    // Running Right animation.
    this.anims.create({
      key: "push-right",
      frames: this.anims.generateFrameNumbers("avatar-push", {
        start: 32,
        end: 63,
      }),
      frameRate: 30,
      repeat: -1,
    });

    // Climb animation.
    this.anims.create({
      key: "climb",
      frames: this.anims.generateFrameNumbers("avatar-climb", {
        start: 0,
        end: 32,
      }),
      frameRate: 30,
      repeat: -1,
    });
  }

  // Prevents the block from pushing through the ground.
  hitBlock(player, block) {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(0);
      this.block.setVelocityY(0);
    }
  }

  // COllects the star.
  collectStar(player, star) {
    star.destroy();
    this.hubStars += 1;
  }
}
