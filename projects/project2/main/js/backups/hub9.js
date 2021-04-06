class Hub extends Phaser.Scene {
  constructor() {
    super({ key: "hub" });
  }

  create() {
    let scene = this;

    this.hitCheckpoint = false;
    this.currentTime = 0;
    this.timedEvent;

    this.checkpoint = { x: 5700, y: 0 };

    // Variables.
    this.hubStars = 0;
    this.facing = "right";

    // The Player function.
    this.character();

    // Calls the Create Animation function.
    this.createAnimations();

    // Call the game objects function.
    this.objects();

    // level assets.

    //  this.ladder.create(300, 150);

    //  this.moveableBlock1.create(300, 550);

    this.block.create(400, 587.5);

    this.bigBlock.create(600, 550);

    this.block.create(800, 587.5);

    this.flag.create(-200, 552.5);
    this.flag.create(-400, 552.5);

    this.door.create(1100, 400);

    this.bigBlockWide.create(1100, 550);

    this.block.create(1400, 587.5);

    this.blockWide.create(1600, 587.5);

    this.blockTall.create(1800, 550);

    this.bigBlockWide.create(2100, 550);

    this.blockTall.create(2400, 550);

    this.blockTall.create(2600, 550);

    this.star.create(2600, 400);

    this.blockTall.create(2800, 550);

    this.moveableBlock1 = this.physics.add.image(3200, 587.5, "block");

    this.bigBlockWide.create(3800, 550);

    this.bigBlockWide.create(3600, 550);

    this.moveableBlock2 = this.physics.add.image(4200, 187.5, "block");

    this.blockTall.create(4500, 550);

    this.blockTall.create(4700, 550);

    this.block.create(4700, 437.5);

    this.blockTall.create(4900, 550);
    this.blockTall.create(4900, 400);

    this.platform.create(5100, 335);

    this.platform.create(5300, 335);

    this.platform.create(5500, 335);

    this.platformWide.create(5750, 335);

    this.platformWider.create(6100, 335);

    this.ladder.create(6100, 180);

    this.platformWider.create(5900, 50);

    this.movingPlatformX = this.physics.add.image(5500, 50, "platform");

    // this.bouncingBlock.create(100, 600);

    // Calls the Object Properties function.
    this.objectProperties();

    // Colliders function.
    this.colliders();

    // COlliders with functions.
    // Block.
    this.physics.add.collider(
      this.player,
      this.moveableBlock1,
      this.hitBlock,
      null,
      this
    );

    // Bouncing block.
    this.physics.add.collider(this.player, this.bouncingBlock, function (
      b1,
      b2
    ) {
      scene.player.touchesbounce = true;
    });

    // Overlaps with functions.

    // Star.
    this.physics.add.overlap(
      this.player,
      this.star,
      this.collectStar,
      null,
      this
    );

    this.overlapCollider = this.physics.add.overlap(
      this.player,
      this.flag,
      this.checkPoint.bind(this)
    );

    // Door.
    this.physics.add.overlap(this.player, this.door, function (b1, b2) {
      scene.player.touchesdoor = true;
    });

    // Ladder.
    this.physics.add.overlap(this.player, this.ladder, function (b1, b2) {
      scene.player.touchesladder = true;
    });

    // Time loop.
    this.timedEvent = this.time.addEvent({
      delay: 0,
      callback: this.platformTimer,
      callbackScope: this,
      loop: true,
    });

    // Calls Cursor keys function.
    this.cursorKeys();

    // Calls global rendering and lighting function.
    this.global();

    // Calls Hud Function.
    this.hud();
  }

  update() {
    // Moving Platform Timer.
    this.platformTimer();

    // Position of global assets such as camera and lighting.
    this.globalPosition();

    // Position of the Hud and text.
    this.hudPosition();

    // Player mechanics and control.
    this.controls();
  }

  platformTimer() {
    this.currentTime++;
    if (this.currentTime == 800) {
      this.currentTime = 0;
    }

    if (this.currentTime < 400) {
      this.movingPlatformX.setVelocityX(100);
    } else if (this.currentTime >= 400) {
      this.movingPlatformX.setVelocityX(-100);
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
  character() {
    //  Player.
    this.player = this.physics.add.sprite(
      this.checkpoint.x,
      this.checkpoint.y,
      "avatar-idle"
    );
    this.player.setDepth(0);
    this.player.setScale(0.25);
    this.player.setCollideWorldBounds(false); // Boundaries of the world.
    this.player.setSize(75, 260, true);
    this.player.touchesdoor = false;
    this.player.touchesladder = false;
    this.player.touchesbounce = false;
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
      repeat: 3,
      setXY: { x: -720, y: 700, stepX: 1500 },
    });

    // Checkpoint.
    this.flag = this.physics.add.group({
      defaultKey: "checkpoint",
      immovable: true,
      allowGravity: false,
    });

    // Door.
    this.door = this.physics.add.group({
      defaultKey: "door",
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
      immovable: true,
      allowGravity: false,
    });
    // Block.
    this.block = this.physics.add.group({
      defaultKey: "block",
      immovable: true,
      allowGravity: false,
    });
    // Block Wide.
    this.blockWide = this.physics.add.group({
      defaultKey: "blockWide",
      immovable: true,
      allowGravity: false,
    });
    // Block Tall.
    this.blockTall = this.physics.add.group({
      defaultKey: "blockTall",
      immovable: true,
      allowGravity: false,
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
    // Wide Platform.
    this.platformWide = this.physics.add.group({
      defaultKey: "platformWide",
      immovable: true,
      allowGravity: false,
    });
    // Wider Platform.
    this.platformWider = this.physics.add.group({
      defaultKey: "platformWider",
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

    // Checkpoint.
    this.flag.children.iterateLocal("setDepth", -3);
    this.flag.children.iterateLocal("setScale", "0.25");
    this.flag.children.iterateLocal("setPipeline", "Light2D");

    // Door.
    this.door.children.iterateLocal("setDepth", -3);
    this.door.children.iterateLocal("setScale", "0.25");
    this.door.children.iterateLocal("setSize", 250, 599);
    this.door.children.iterateLocal("setPipeline", "Light2D");

    // Star.
    this.star.children.iterateLocal("setDepth", 0);
    this.star.children.iterateLocal("setScale", "0.5");
    this.star.children.iterateLocal("setTint", "0xffffff");

    // Ladder.
    this.ladder.children.iterateLocal("setDepth", -1);
    this.ladder.children.iterateLocal("setScale", "0.25");
    this.ladder.children.iterateLocal("setPipeline", "Light2D");

    // Moveable Blocks.
    this.moveableBlock1.setScale(0.25).setPipeline("Light2D").setDragX(2500);
    this.moveableBlock2.setScale(0.25).setPipeline("Light2D").setDragX(2500);
    //  this.moveableBlock3.setScale(0.25).setPipeline("Light2D").setDragX(2500);
    //this.moveableBlock4.setScale(0.25).setPipeline("Light2D").setDragX(2500);
    //this.moveableBlock5.setScale(0.25).setPipeline("Light2D").setDragX(2500);

    // Block.
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

    // Platforms.
    this.platformWide.children.iterateLocal("setScale", "0.25");
    this.platformWide.children.iterateLocal("setPipeline", "Light2D");

    // Platforms.
    this.platformWider.children.iterateLocal("setScale", "0.25");
    this.platformWider.children.iterateLocal("setPipeline", "Light2D");

    // Moving Platforms.
    this.movingPlatformX
      .setScale(0.25)
      .setPipeline("Light2D")
      .setDragX(2500)
      .setImmovable(true);

    this.movingPlatformX.body.allowGravity = false;
    //  this.movingPlatformY.setScale(0.25).setPipeline("Light2D").setDragX(2500);
  }

  // Colliders.
  colliders() {
    // Colliders

    this.physics.add.collider(this.ground, this.block);
    this.physics.add.collider(this.ground, this.blockTall);
    this.physics.add.collider(this.ground, this.blockWide);
    this.physics.add.collider(this.ground, this.bigBlock);
    this.physics.add.collider(this.ground, this.bigBlockWide);
    this.physics.add.collider(this.ground, this.door);
    this.physics.add.collider(this.ground, this.ladder);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.block);
    this.physics.add.collider(this.player, this.blockTall);
    this.physics.add.collider(this.player, this.blockWide);
    this.physics.add.collider(this.player, this.bigBlock);
    this.physics.add.collider(this.player, this.bigBlockWide);
    this.physics.add.collider(this.player, this.platform);
    this.physics.add.collider(this.player, this.platformWide);
    this.physics.add.collider(this.player, this.platformWider);
    this.physics.add.collider(this.player, this.movingPlatformX);
    this.physics.add.collider(this.player, this.movingPlatformY);

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

    // Moveable blocks.

    this.physics.add.collider(this.moveableBlock1, this.player);
    this.physics.add.collider(this.moveableBlock1, this.ground);
    this.physics.add.collider(this.moveableBlock1, this.moveableBlock1);
    this.physics.add.collider(this.moveableBlock1, this.moveableBlock2);
    this.physics.add.collider(this.moveableBlock1, this.moveableBlock3);
    this.physics.add.collider(this.moveableBlock1, this.moveableBlock4);
    this.physics.add.collider(this.moveableBlock1, this.moveableBlock5);
    this.physics.add.collider(this.moveableBlock1, this.blockWide);
    this.physics.add.collider(this.moveableBlock1, this.blockTall);
    this.physics.add.collider(this.moveableBlock1, this.bigBlock);
    this.physics.add.collider(this.moveableBlock1, this.bigBlockWide);

    this.physics.add.collider(this.moveableBlock2, this.player);
    this.physics.add.collider(this.moveableBlock2, this.ground);
    this.physics.add.collider(this.moveableBlock2, this.moveableBlock2);
    this.physics.add.collider(this.moveableBlock2, this.moveableBlock3);
    this.physics.add.collider(this.moveableBlock2, this.moveableBlock4);
    this.physics.add.collider(this.moveableBlock2, this.moveableBlock5);
    this.physics.add.collider(this.moveableBlock2, this.blockWide);
    this.physics.add.collider(this.moveableBlock2, this.blockTall);
    this.physics.add.collider(this.moveableBlock2, this.bigBlock);
    this.physics.add.collider(this.moveableBlock2, this.bigBlockWide);

    // this.physics.add.collider(this.moveableBlock3, this.player);
    //  this.physics.add.collider(this.moveableBlock3, this.ground);
    // this.physics.add.collider(this.moveableBlock3, this.moveableBlock3);
    // this.physics.add.collider(this.moveableBlock3, this.moveableBlock4);
    // this.physics.add.collider(this.moveableBlock3, this.moveableBlock5);
    // this.physics.add.collider(this.moveableBlock3, this.blockWide);
    // this.physics.add.collider(this.moveableBlock3, this.blockTall);
    // this.physics.add.collider(this.moveableBlock3, this.bigBlock);
    // this.physics.add.collider(this.moveableBlock3, this.bigBlockWide);
    //
    // this.physics.add.collider(this.moveableBlock4, this.player);
    //  this.physics.add.collider(this.moveableBlock4, this.ground);
    // this.physics.add.collider(this.moveableBlock4, this.moveableBlock4);
    // this.physics.add.collider(this.moveableBlock4, this.moveableBlock5);
    // this.physics.add.collider(this.moveableBlock4, this.blockWide);
    // this.physics.add.collider(this.moveableBlock4, this.blockTall);
    // this.physics.add.collider(this.moveableBlock4, this.bigBlock);
    // this.physics.add.collider(this.moveableBlock4, this.bigBlockWide);

    //
    // this.physics.add.collider(this.moveableBlock5, this.player);
    //  this.physics.add.collider(this.moveableBlock5, this.ground);
    // this.physics.add.collider(this.moveableBlock5, this.moveableBlock5);
    // this.physics.add.collider(this.moveableBlock5, this.blockWide);
    // this.physics.add.collider(this.moveableBlock5, this.blockTall);
    // this.physics.add.collider(this.moveableBlock5, this.bigBlock);
    // this.physics.add.collider(this.moveableBlock5, this.bigBlockWide);
  }

  // Prevents the moveable block from pushing through the ground.
  hitBlock(player, block) {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(0);
      this.moveableBlock1.setVelocityY(0);
    }
  }

  // Checkpoint function.
  checkPoint() {
    if (this.hitCheckpoint) {
      this.checkpoint.x = this.player.x;
      this.checkpoint.y = this.player.y;
      this.player.body.touching.left = false;
      this.player.body.touching.right = false;
      return;
    }
    this.hitCheckpoint = true;
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

  // Global canera any lighting.
  global() {
    // Camera function.
    this.camera = this.cameras.main.startFollow(this.player);
    this.camera.setZoom(1);

    // Lights.
    this.lights.enable();
    this.lights.setAmbientColor(0x808080);

    // Dim light that follows the player.
    this.light = this.lights.addLight(0, 0, 1080);
    this.light.setIntensity(1.5);

    // Overlay.
    this.overlay = this.add.image(0, 0, "overlay");
    this.overlay.setDepth(0);
  }

  // Hud and Text.
  hud() {
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

  // Global elements position.
  globalPosition() {
    // Light.
    this.light.x = this.player.x;
    this.light.y = this.player.y;

    // Overlay.
    this.overlay.x = this.player.x;
    this.overlay.y = this.player.y;
  }

  // Position of the hud and text.
  hudPosition() {
    // Updates the position of the random text relative to the player's position.
    this.text.x = this.player.body.position.x;
    this.text.y = this.player.body.position.y + 350;

    // Updates the position of the hud text relative to the player's position.
    this.hudStars.x = this.player.body.position.x + 670;
    this.hudStars.y = this.player.body.position.y - 300;

    // Updates the position of the hud text relative to the player's position.
    this.hudLevel.x = this.player.body.position.x - 650;
    this.hudLevel.y = this.player.body.position.y - 300;

    // Hud text updates.
    this.hudStars.text = `${this.hubStars} / 1 Stars`;

    // Random Text updates.
    if (this.player.touchesdoor == true) {
      if (this.hubStars < 1) {
        this.text.setText("You need at least 1 star to Enter the forest.");
      } else {
        this.text.setText("Press SPACE to ENTER the Forest");
      }
    } else {
      this.text.setText("");
    }
  }

  controls() {
    if (this.cursors.left.isDown) {
      // Going left.
      this.facing = "left";
      // Sprinting left.
      if (
        this.cursors.shift.isDown & !this.player.body.touching.left ||
        this.cursors.shift.isDown & this.player.touchesdoor ||
        this.cursors.shift.isDown & this.player.touchesladder
      ) {
        this.player.setVelocityX(-240);
        this.player.anims.play("run-left", true);

        // If the player collides with the block it slows the speed down.
      } else if (this.cursors.shift.isDown && this.player.body.touching.left) {
        this.player.setVelocityX(-150);
        this.player.anims.play("push-left", true);

        // Walking left
      } else if (
        !this.player.body.touching.left ||
        this.player.touchesdoor ||
        this.player.touchesladder
      ) {
        this.player.setVelocityX(-180);
        this.player.anims.play("walk-left", true);
      }
      // If the player collides with the block it slows the speed down.
      else if (this.player.body.touching.left) {
        this.player.setVelocityX(-90);
        this.player.anims.play("push-left", true);
      }

      // Going right.
    } else if (this.cursors.right.isDown) {
      this.facing = "right";
      // Sprinting right.
      if (
        this.cursors.shift.isDown & !this.player.body.touching.right ||
        this.cursors.shift.isDown & this.player.touchesdoor ||
        this.cursors.shift.isDown & this.player.touchesladder
      ) {
        this.player.setVelocityX(240);
        this.player.anims.play("run-right", true);

        // If the player collides with the block it slows the speed down.
      } else if (this.cursors.shift.isDown && this.player.body.touching.right) {
        this.player.setVelocityX(150);
        this.player.anims.play("push-right", true);

        // Walking right
      } else if (
        !this.player.body.touching.right ||
        this.player.touchesdoor ||
        this.player.touchesladder
      ) {
        this.player.setVelocityX(180);
        this.player.anims.play("walk-right", true);
      }
      // If the player collides with the block it slows the speed down.
      else if (this.player.body.touching.right) {
        this.player.setVelocityX(90);
        this.player.anims.play("push-right", true);
      }

      // Crouching.
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityX(0);
      // Brings the player down if they are in the air.
      if (this.player.body.velocity.y > 0) {
        this.player.setVelocityY(600);
      }
      if (
        this.facing === "right" &&
        this.player.anims.currentAnim.key !== "down-right"
      ) {
        this.player.anims.play("down-right");
      } else if (
        this.facing === "left" &&
        this.player.anims.currentAnim.key !== "down-left"
      ) {
        this.player.anims.play("down-left");
      }

      // Idle.
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.touching.down) {
        // Idle Right.
        if (this.facing == "right") {
          this.player.anims.play("idle-right", true);

          // Idle Left.
        } else if (this.facing == "left") {
          this.player.anims.play("idle-left", true);
        }
      } else if (
        !this.player.body.touching.down &&
        !this.player.touchesladder
      ) {
        if (this.facing == "right") {
          this.player.anims.play("up-right", true);
        } else if (this.facing == "left") {
          this.player.anims.play("up-left", true);
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

        this.facing = "left";
      }
    }

    // Go to the next level.
    if (this.player.touchesdoor == true) {
      // If the player has gathered the required amoount of stars.
      if (this.hubStars >= 1) {
        if (this.cursors.space.isDown) {
          this.scene.start("forest");
        }
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
      this.player.x = this.checkpoint.x;
      this.player.y = this.checkpoint.y;

      this.moveableBlock1.x = -800;
      this.moveableBlock1.y = 587.5;
    }
  }
}
