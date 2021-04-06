class Hub extends Phaser.Scene {
  constructor() {
    super({ key: "hub" });
  }

  create() {
    let scene = this;

    // Variables.
    this.hubStars = 0;
    this.facing = "right";

    // The Player function.
    this.player();

    // Call the game objects function.
    this.objects();

    // Calls the Create Animation function.
    this.createAnimations();

    this.door.create(-400, 550);

    this.star.create(1200, 225);

    //  this.ladder.create(300, 150);

    //  this.block.create(500, 400);

    this.blockWide.create(1600, 500);

    this.blockTall.create(-800, 400);

    this.bigBlock.create(400, 550);

    this.bigBlockWide.create(2000, 550);

    this.bouncingBlock.create(100, 600);

    this.platform.create(200, 425);
    this.platform.create(600, 425);
    this.platform.create(800, 325);
    this.platform.create(1200, 325);

    // Calls the Object Properties function.
    this.objectProperties();

    // Colliders
    this.physics.add.collider(this.ground, this.block);
    this.physics.add.collider(this.ground, this.blockTall);
    this.physics.add.collider(this.ground, this.blockWide);
    this.physics.add.collider(this.ground, this.bigBlock);
    this.physics.add.collider(this.ground, this.bigBlockWide);
    this.physics.add.collider(this.ground, this.door);
    this.physics.add.collider(this.ground, this.ladder);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.bigBlock);
    this.physics.add.collider(this.player, this.bigBlockWide);
    this.physics.add.collider(this.player, this.movingPlatformX);
    this.physics.add.collider(this.player, this.movingPlatformY);
    this.physics.add.collider(this.player, this.platform);

    this.physics.add.collider(this.block, this.block);
    this.physics.add.collider(this.block, this.blockWide);
    this.physics.add.collider(this.block, this.blockTall);
    this.physics.add.collider(this.block, this.bigBlock);
    this.physics.add.collider(this.block, this.bigBlockWide);

    this.physics.add.collider(this.blockWide, this.blockWide);
    this.physics.add.collider(this.blockWide, this.blockTall);
    this.physics.add.collider(this.blockWide, this.bigBlock);
    this.physics.add.collider(this.blockWide, this.bigBlockWide);

    this.physics.add.collider(this.blockTall, this.blockTall);
    this.physics.add.collider(this.blockTall, this.bigBlock);
    this.physics.add.collider(this.blockTall, this.bigBlockWide);

    // COlliders with functions.
    this.physics.add.collider(
      this.player,
      this.block,
      this.hitBlock,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.blockTall,
      this.hitBlockTall,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.blockWide,
      this.hitBlockWide,
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

    this.cursorKeys();

    // Camera function.
    this.camera = this.cameras.main.startFollow(this.player);
    this.camera.setZoom(1);

    // Lights.
    this.lights.enable();
    this.lights.setAmbientColor(0x808080);

    // Dim light that follows the player.
    this.light = this.lights.addLight(0, 0, 1080);
    this.light.setIntensity(1.5);

    // Star glowing light.
    this.starLight = this.lights.addLight(1200, 225, 360, 0xffffff);
    this.starLight.setIntensity(2);

    // Overlay.
    this.overlay = this.add.image(0, 0, "overlay");
    this.overlay.setDepth(0);

    // Random text.
    this.text = this.add
      .text(0, 0, "TEXT", {
        fontSize: "15px",
        align: "center",
        fontFamily: "block",
      })
      .setOrigin(0.5);

    //  Stars collected.
    this.hudLevel = this.add
      .text(0, 0, "Level: HUB", {
        fontSize: "15px",
        align: "left",
        fontFamily: "block",
      })
      .setOrigin(0.5);

    //  Stars collected.
    this.hudStars = this.add
      .text(0, 0, this.hubStars + " / 1 Stars", {
        fontSize: "15px",
        align: "right",
        fontFamily: "block",
      })
      .setOrigin(0.5);
  }

  update() {
    // Updates the position of the random text relative to the player's position.
    this.text.x = this.player.body.position.x;
    this.text.y = this.player.body.position.y + 350;

    // Updates the position of the hud text relative to the player's position.
    this.hudStars.x = this.player.body.position.x + 670;
    this.hudStars.y = this.player.body.position.y - 300;

    // Updates the position of the hud text relative to the player's position.
    this.hudLevel.x = this.player.body.position.x - 650;
    this.hudLevel.y = this.player.body.position.y - 300;

    // Random Text updates.
    if (this.player.touchesdoor == true) {
      this.text.setText("Press SPACE to Go to the Forest");
    } else {
      this.text.setText("");
    }

    // Hud text updates.
    this.hudStars.text = `${this.hubStars} / 1 Stars`;

    // Shadow offset.
    this.shadow.x = this.player.body.position.x - 5;
    this.shadow.y = this.player.body.position.y + 20;

    // Light.
    this.light.x = this.player.x;
    this.light.y = this.player.y;

    // Overlay.
    this.overlay.x = this.player.x;
    this.overlay.y = this.player.y;

    // Going left.
    if (this.cursors.left.isDown) {
      this.facing = "left";
      // Sprinting left.
      if (
        this.cursors.shift.isDown & !this.player.body.touching.left ||
        this.cursors.shift.isDown & this.player.touchesdoor ||
        this.cursors.shift.isDown & this.player.touchesladder
      ) {
        this.player.setVelocityX(-240);
        this.player.anims.play("run-left", true);
        this.shadow.anims.play("run-left", true);

        // If the player collides with the block it slows the speed down.
      } else if (this.cursors.shift.isDown && this.player.body.touching.left) {
        this.player.setVelocityX(-90);
        this.player.anims.play("push-left", true);
        this.shadow.anims.play("push-left", true);

        // Walking left
      } else if (
        !this.player.body.touching.left ||
        this.player.touchesdoor ||
        this.player.touchesladder
      ) {
        this.player.setVelocityX(-180);
        this.player.anims.play("walk-left", true);
        this.shadow.anims.play("walk-left", true);
      }
      // If the player collides with the block it slows the speed down.
      else if (this.player.body.touching.left) {
        this.player.setVelocityX(-90);
        this.player.anims.play("push-left", true);
        this.shadow.anims.play("push-left", true);
      }

      // Going right.
    } else if (this.cursors.right.isDown) {
      this.facing = "right";
      // Sprinting Right.
      if (
        this.cursors.shift.isDown & !this.player.body.touching.right ||
        this.cursors.shift.isDown & this.player.touchesdoor ||
        this.cursors.shift.isDown & this.player.touchesladder
      ) {
        this.player.setVelocityX(240);
        this.player.anims.play("run-right", true);
        this.shadow.anims.play("run-right", true);
        // If the player collides with the block it slows the speed down.
      } else if (this.cursors.shift.isDown && this.player.body.touching.right) {
        this.player.setVelocityX(90);
        this.player.anims.play("push-right", true);
        this.shadow.anims.play("push-right", true);
        // Walking right
      } else if (
        !this.player.body.touching.right ||
        this.player.touchesdoor ||
        this.player.touchesladder
      ) {
        this.player.setVelocityX(180);
        if (this.player.body.touching.down) {
          this.player.anims.play("walk-right", true);
          this.shadow.anims.play("walk-right", true);
        }
      }
      // If the player collides with the block it slows the speed down.
      else if (this.player.body.touching.right) {
        this.player.setVelocityX(90);
        this.player.anims.play("push-right", true);
        this.shadow.anims.play("push-right", true);
      }

      // Crouching.
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(400);
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
      this.player.setVelocityY(-400);
    }

    // If the player is touching the bouncing block.
    if (this.player.touchesbounce && this.player.body.touching.down) {
      this.player.setVelocityY(-800);
    }

    // If the player is touching the Ladder.
    if (this.player.touchesladder) {
      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -150;
        this.player.anims.play("climb", true);
        this.shadow.anims.play("climb", true);
        this.facing = "left";
      }
    }

    // Go to the next level.
    if (this.player.touchesdoor == true) {
      if (this.cursors.space.isDown) {
        this.scene.start("forest");
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

    // Pauses the scene.
    if (this.cursors.pause.isDown) {
      this.scene.launch("pause");
      this.scene.pause();
    }

    if (this.cursors.reset.isDown) {
      // Resets the scene.
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
      frameRate: 40,
      repeat: -1,
    });

    // Jump Right animation.
    this.anims.create({
      key: "up-right",
      frames: this.anims.generateFrameNumbers("avatar-jump", {
        start: 22,
        end: 43,
      }),
      frameRate: 40,
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

  // Player.
  player() {
    //  Player.
    this.player = this.physics.add.sprite(0, 550, "avatar-idle");
    this.player.setDepth(0);
    this.player.setScale(0.25);
    this.player.setCollideWorldBounds(false); // Boundaries of the world.
    this.player.setSize(75, 260, true);
    this.player.touchesdoor = false;
    this.player.touchesladder = false;
    this.player.touchesbounce = false;

    //  Shadow of the player.
    this.shadow = this.add.sprite(0, 0, "avatar-idle");
    this.shadow.setDepth(-1);
    this.shadow.setScale(0.25);
    this.shadow.setTint(0x000000);
    this.shadow.setAlpha(0.6);
    this.shadow.setPipeline("Light2D");
  }

  // Game objects.
  objects() {
    // Sky Background.
    this.sky = this.add.group({
      key: "sky",
      repeat: 2,
      setXY: { x: -720, y: 360, stepX: 1500 },
    });

    // Ground.
    this.ground = this.physics.add.staticGroup({
      key: "ground",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 2,
      setXY: { x: -720, y: 700, stepX: 1500 },
    });
    // Door.
    this.door = this.physics.add.group({
      defaultKey: "door",
      dragX: 1500,
      immovable: true,
      allowGravity: false,
    });
    // Star.
    this.star = this.physics.add.group({
      defaultKey: "star",
      immovable: true,
      allowGravity: false,
    });
    // Ladder.
    this.ladder = this.physics.add.group({
      defaultKey: "ladder",
    });
    // Moveable Block.
    this.block = this.physics.add.group({
      defaultKey: "block",
      dragX: 2500,
    });
    // Moveable Block Wide.
    this.blockWide = this.physics.add.group({
      defaultKey: "blockWide",
      dragX: 2500,
    });
    // Moveable Block Tall.
    this.blockTall = this.physics.add.group({
      defaultKey: "blockTall",
      dragX: 2500,
    });
    // Big Block.
    this.bigBlock = this.physics.add.group({
      defaultKey: "bigBlock",
      immovable: true,
      allowGravity: false,
    });
    // Big Block Wide.
    this.bigBlockWide = this.physics.add.group({
      defaultKey: "bigBlockWide",
      immovable: true,
      allowGravity: false,
    });
    // Bouncing Block.
    this.bouncingBlock = this.physics.add.group({
      defaultKey: "block",
      immovable: true,
      allowGravity: false,
    });
    // Platform.
    this.platform = this.physics.add.group({
      defaultKey: "platform",
      immovable: true,
      allowGravity: false,
    });
  }

  // Children of group objects properties.
  objectProperties() {
    // Sky.
    this.sky.children.iterateLocal("setDepth", -5);
    this.sky.children.iterateLocal("setPipeline", "Light2D");

    // Ground.
    this.ground.children.iterateLocal("setSize", 1500, 150);
    this.ground.children.iterateLocal("setDepth", -4);
    this.ground.children.iterateLocal("setPipeline", "Light2D");

    // Door.
    this.door.children.iterateLocal("setDepth", -3);
    this.door.children.iterateLocal("setScale", "0.25");
    this.door.children.iterateLocal("setSize", 250, 599);
    this.door.children.iterateLocal("setPipeline", "Light2D");

    // Star.
    this.star.children.iterateLocal("setDepth", 0);
    this.star.children.iterateLocal("setScale", "0.5");
    this.star.children.iterateLocal("setTint", "0xffffff");
    this.star.children.iterateLocal("setPipeline", "Light2D");

    // Ladder.
    this.ladder.children.iterateLocal("setDepth", -1);
    this.ladder.children.iterateLocal("setScale", "0.25");
    this.ladder.children.iterateLocal("setPipeline", "Light2D");

    // Blocks.
    this.block.children.iterateLocal("setScale", "0.25");
    this.block.children.iterateLocal("setPipeline", "Light2D");

    // Wide Blocks.
    this.blockWide.children.iterateLocal("setScale", "0.25");
    this.blockWide.children.iterateLocal("setPipeline", "Light2D");

    // Tall Blocks.
    this.blockTall.children.iterateLocal("setScale", "0.25");
    this.blockTall.children.iterateLocal("setPipeline", "Light2D");

    // Big Blocks.
    this.bigBlock.children.iterateLocal("setScale", "0.25");
    this.bigBlock.children.iterateLocal("setPipeline", "Light2D");

    // Big Wide Blocks.
    this.bigBlockWide.children.iterateLocal("setScale", "0.25");
    this.bigBlockWide.children.iterateLocal("setPipeline", "Light2D");

    // Bouncing Blocks.
    this.bouncingBlock.children.iterateLocal("setScale", "0.25");
    this.bouncingBlock.children.iterateLocal("setPipeline", "Light2D");

    // Platforms.
    this.platform.children.iterateLocal("setScale", "0.25");
    this.platform.children.iterateLocal("setPipeline", "Light2D");
  }

  // Prevents the moveable block from pushing through the ground.
  hitBlock(player, block) {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(0);
      this.block.setVelocityY(0);
    }
  }

  // Prevents the moceable block from pushing through the ground.
  hitBlockTall(player, blockTall) {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(0);
      this.blockTall.setVelocityY(0);
    }
  }

  // Prevents the moveable block from pushing through the ground.
  hitBlockWide(player, blockWide) {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(0);
      this.blockWide.setVelocityY(0);
    }
  }

  // Collects the star.
  collectStar(player, star) {
    star.destroy();
    this.hubStars += 1;
  }

  // Cursor keys.
  cursorKeys() {
    // Cursor keys.
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      reset: Phaser.Input.Keyboard.KeyCodes.R,
      pause: Phaser.Input.Keyboard.KeyCodes.ESC,
    });
  }
}