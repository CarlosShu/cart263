class Forest extends Phaser.Scene {
  constructor() {
    super({ key: "forest" });
  }

  create() {
    let scene = this;

    this.physics.world.setBounds(-1400, -1000, 7400, 2000);

    this.hitCheckpoint = false;
    this.currentTime = 0;
    this.timedEvent;

    this.checkpoint = { x: 0, y: 550 };

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

    this.moveableBlock1 = this.moveableBlockGroup.create(-600, 587.5);

    this.star.create(-1200, 400);

    this.bigBlock.create(-1200, 550);

    this.blockTall.create(-1000, 550);

    this.block.create(400, 587.5);

    this.bigBlock.create(600, 550);

    this.block.create(800, 587.5);

    this.flag.create(0, 552.5);

    this.door.create(1100, 400);

    this.bigBlockWide.create(1100, 550);

    this.block.create(1400, 587.5);

    this.blockWide.create(1600, 587.5);

    this.blockTall.create(1800, 550);

    this.bigBlockWide.create(2100, 550);

    this.flag.create(2100, 410);

    this.blockTall.create(2400, 550);

    this.blockTall.create(2600, 550);

    this.star.create(2600, 400);

    this.blockTall.create(2800, 550);

    this.moveableBlock2 = this.moveableBlockGroup.create(3200, 587.5);

    this.bigBlockWide.create(3800, 550);

    this.flag.create(3700, 410);

    this.bigBlockWide.create(3600, 550);

    this.moveableBlock3 = this.moveableBlockGroup.create(4200, 187.55);

    this.blockTall.create(4500, 550);

    this.blockTall.create(4700, 550);

    this.block.create(4700, 437.5);

    this.blockTall.create(4900, 550);
    this.blockTall.create(4900, 400);

    this.platform.create(5100, 335);

    this.platform.create(5300, 335);

    this.platformWide.create(5550, 335);

    this.movingPlatformY.create(5750, 50);

    this.platformWider.create(5450, 50);

    this.flag.create(5450, -25);

    this.movingPlatformX.create(4900, 50);

    this.platform.create(4700, 50);

    this.movingPlatformX.create(4300, 50);

    this.platformWider.create(4000, 150);

    this.star.create(4000, 100);

    this.bouncingBlock.create(100, 600);

    // Calls the Object Properties function.
    this.objectProperties();

    // Colliders function.
    this.colliders();

    // COlliders with functions.

    // Block.
    this.physics.add.collider(
      this.player,
      this.moveableBlockGroup,
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

    // Door.
    this.physics.add.overlap(this.player, this.door, function (b1, b2) {
      scene.player.touchesdoor = true;
    });

    // Ladder.
    this.physics.add.overlap(this.player, this.ladder, function (b1, b2) {
      scene.player.touchesladder = true;
    });

    // Flag.
    this.physics.add.overlap(this.player, this.flag, function (b1, b2) {
      scene.player.touchesflag = true;
    });

    // Time loop.
    this.timedEvent = this.time.addEvent({
      delay: 0,
      callback: this.platformTimer,
      callbackScope: this,
      loop: true,
    });

    // Chekpoint function.
    this.overlapCollider = this.physics.add.overlap(
      this.player,
      this.flag,
      this.checkPoint.bind(this)
    );

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
    if (this.currentTime == 600) {
      this.currentTime = 0;
    }

    if (this.currentTime < 300) {
      this.movingPlatformX.setVelocityX(100);
      this.movingPlatformY.setVelocityY(100);
    } else if (this.currentTime >= 300) {
      this.movingPlatformX.setVelocityX(-100);
      this.movingPlatformY.setVelocityY(-100);
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
    this.player.setCollideWorldBounds(true); // Boundaries of the world.
    this.player.setSize(75, 260, true);
    this.player.touchesdoor = false;
    this.player.touchesladder = false;
    this.player.touchesbounce = false;
    this.player.touchesflag = false;
  }

  // Game objects.
  objects() {
    // Sky Background.
    this.sky = this.add.group({
      key: "sky",
      repeat: 6,
      setXY: { x: -1600, y: 360, stepX: 1500 },
    });

    // Background ground.
    this.backgroundGround2 = this.physics.add.staticGroup({
      key: "groundFloor",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 6,
      setXY: { x: -1600, y: 584, stepX: 1500 },
    });

    // Background ground.
    this.backgroundGround = this.physics.add.staticGroup({
      key: "groundFloor",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 6,
      setXY: { x: -1600, y: 644, stepX: 1500 },
    });

    // Ground.
    this.ground = this.physics.add.staticGroup({
      key: "ground",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 6,
      setXY: { x: -1600, y: 700, stepX: 1500 },
    });

    // Foreground ground.
    this.foregroundGround = this.physics.add.staticGroup({
      key: "groundFloor",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 6,
      setXY: { x: -1600, y: 756, stepX: 1500 },
    });

    // Foreground ground.
    this.foregroundGround2 = this.physics.add.staticGroup({
      key: "groundFloor",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 6,
      setXY: { x: -1600, y: 818, stepX: 1500 },
    });

    // Background Forest Tree.
    this.backgroundForestTree = this.physics.add.staticGroup({
      key: "forestTree",
      isStatic: true,
      setScale: { x: 0.6, y: 0.6 },
      repeat: 10,
      setXY: { x: -720, y: 297, stepX: 1000 },
    });

    // Background Plants.
    this.backgroundForestPlant = this.physics.add.staticGroup({
      key: "forestPlant",
      isStatic: true,
      setScale: { x: 0.5, y: 0.5 },
      repeat: 10,
      setXY: { x: -720 - 500, y: 424, stepX: 2000 },
    });

    // Foreground Forest Tree.
    this.foregroundForestTree = this.physics.add.staticGroup({
      key: "forestTree",
      isStatic: true,
      setScale: { x: 0.6, y: 0.6 },
      repeat: 10,
      setXY: { x: -720 + 500, y: 472, stepX: 2000 },
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
      immovable: false,
      allowGravity: true,
    });

    // Ladder.
    this.ladder = this.physics.add.group({
      defaultKey: "ladder",
      immovable: true,
      allowGravity: false,
    });

    this.moveableBlockGroup = this.physics.add.group({
      defaultKey: "block",
      immovable: false,
      allowGravity: true,
      dragX: 2500,
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
      defaultKey: "forestMushroom",
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

    // Moving Platform X.
    this.movingPlatformX = this.physics.add.group({
      defaultKey: "platform",
      immovable: true,
      allowGravity: false,
    });

    // Moving Platform Y.
    this.movingPlatformY = this.physics.add.group({
      defaultKey: "platform",
      immovable: true,
      allowGravity: false,
    });
  }

  // Children of group objects properties.
  objectProperties() {
    // Sky.
    this.sky.children.iterateLocal("setDepth", -7);
    this.sky.children.iterateLocal("setTint", "0x303030");
    this.sky.children.iterateLocal("setPipeline", "Light2D");

    // Background ground.
    this.backgroundGround2.children.iterateLocal("setSize", 1500, 150);
    this.backgroundGround2.children.iterateLocal("setDepth", -6);
    this.backgroundGround2.children.iterateLocal("setTint", "0x042004");
    this.backgroundGround2.children.iterateLocal("setPipeline", "Light2D");

    // Background ground.
    this.backgroundGround.children.iterateLocal("setSize", 1500, 150);
    this.backgroundGround.children.iterateLocal("setDepth", -5);
    this.backgroundGround.children.iterateLocal("setTint", "0x104010");
    this.backgroundGround.children.iterateLocal("setPipeline", "Light2D");

    // Background Trees.
    this.backgroundForestTree.children.iterateLocal("setSize", 1500, 150);
    this.backgroundForestTree.children.iterateLocal("setDepth", -4);
    this.backgroundForestTree.children.iterateLocal("setTint", "0x303030");
    this.backgroundForestTree.children.iterateLocal("setPipeline", "Light2D");

    // Background plants.
    this.backgroundForestPlant.children.iterateLocal("setSize", 1500, 150);
    this.backgroundForestPlant.children.iterateLocal("setDepth", -4);
    this.backgroundForestPlant.children.iterateLocal("setTint", "0x303030");
    this.backgroundForestPlant.children.iterateLocal("setPipeline", "Light2D");

    // Foreground ground.
    this.foregroundGround.children.iterateLocal("setSize", 1500, 150);
    this.foregroundGround.children.iterateLocal("setDepth", 1);
    this.foregroundGround.children.iterateLocal("setTint", "0x104010");
    this.foregroundGround.children.iterateLocal("setPipeline", "Light2D");

    // Foreground ground.
    this.foregroundGround2.children.iterateLocal("setSize", 1500, 150);
    this.foregroundGround2.children.iterateLocal("setDepth", 2);
    this.foregroundGround2.children.iterateLocal("setTint", "0x042004");
    this.foregroundGround2.children.iterateLocal("setPipeline", "Light2D");

    // Foreground Forest Tree.
    this.foregroundForestTree.children.iterateLocal("setSize", 1500, 150);
    this.foregroundForestTree.children.iterateLocal("setDepth", 1);
    this.foregroundForestTree.children.iterateLocal("setTint", "0x606060");
    this.foregroundForestTree.children.iterateLocal("setPipeline", "Light2D");

    // Ground.
    this.ground.children.iterateLocal("setSize", 1500, 150);
    this.ground.children.iterateLocal("setDepth", -3);
    this.ground.children.iterateLocal("setTint", "0x108010");
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
    this.star.children.iterateLocal("setTint", "0x00FF00");

    // Ladder.
    this.ladder.children.iterateLocal("setDepth", -1);
    this.ladder.children.iterateLocal("setScale", "0.25");
    this.ladder.children.iterateLocal("setPipeline", "Light2D");

    // Moveable Blocks.
    this.moveableBlockGroup.children.iterateLocal("setScale", "0.25");
    this.moveableBlockGroup.children.iterateLocal("setTint", "0x802800");

    // Block.
    this.block.children.iterateLocal("setScale", "0.25");
    this.block.children.iterateLocal("setTint", "0x804000");

    // Wide Blocks.
    this.blockWide.children.iterateLocal("setScale", "0.25");
    this.blockWide.children.iterateLocal("setTint", "0x804000");

    // Tall Blocks.
    this.blockTall.children.iterateLocal("setScale", "0.25");
    this.blockTall.children.iterateLocal("setTint", "0x804000");

    // Big Blocks.
    this.bigBlock.children.iterateLocal("setScale", "0.25");
    this.bigBlock.children.iterateLocal("setTint", "0x802800");

    // Big Wide Block.
    this.bigBlockWide.children.iterateLocal("setScale", "0.25");
    this.bigBlockWide.children.iterateLocal("setTint", "0x802800");

    // Bouncing Blocks.
    this.bouncingBlock.children.iterateLocal("setScale", "0.25");
    this.bouncingBlock.children.iterateLocal("setTint", "0x808080");

    // Platforms.
    this.platform.children.iterateLocal("setScale", "0.25");
    this.platform.children.iterateLocal("setTint", "0x804000");

    // Platforms.
    this.platformWide.children.iterateLocal("setScale", "0.25");
    this.platformWide.children.iterateLocal("setTint", "0x8802800");

    // Platforms.
    this.platformWider.children.iterateLocal("setScale", "0.25");
    this.platformWider.children.iterateLocal("setTint", "0x802800");

    // Moving Platform X.
    this.movingPlatformX.children.iterateLocal("setScale", "0.25");
    this.movingPlatformX.children.iterateLocal("setFrictionX", "1");
    this.movingPlatformX.children.iterateLocal("setTint", "0x802800");

    // Moving Platform Y.
    this.movingPlatformY.children.iterateLocal("setScale", "0.25");
    this.movingPlatformY.children.iterateLocal("setPipeline", "Light2D");
    this.movingPlatformY.children.iterateLocal("setTint", "0x802800");
  }

  // Colliders.
  colliders() {
    // [Player.

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

    // Star.

    this.physics.add.collider(this.star, this.ground);
    this.physics.add.collider(this.star, this.block);
    this.physics.add.collider(this.star, this.blockTall);
    this.physics.add.collider(this.star, this.blockWide);
    this.physics.add.collider(this.star, this.bigBlock);
    this.physics.add.collider(this.star, this.bigBlockWide);
    this.physics.add.collider(this.star, this.platform);
    this.physics.add.collider(this.star, this.platformWide);
    this.physics.add.collider(this.star, this.platformWider);
    this.physics.add.collider(this.star, this.movingPlatformX);
    this.physics.add.collider(this.star, this.movingPlatformY);

    // Moveable blocks.

    this.physics.add.collider(this.moveableBlockGroup, this.player);
    this.physics.add.collider(this.moveableBlockGroup, this.ground);
    this.physics.add.collider(this.moveableBlockGroup, this.moveableBlockGroup);
    this.physics.add.collider(this.moveableBlockGroup, this.block);
    this.physics.add.collider(this.moveableBlockGroup, this.blockWide);
    this.physics.add.collider(this.moveableBlockGroup, this.blockTall);
    this.physics.add.collider(this.moveableBlockGroup, this.bigBlock);
    this.physics.add.collider(this.moveableBlockGroup, this.bigBlockWide);
  }

  // Prevents the moveable block from pushing through the ground.
  hitBlock(player, block) {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(0);
      this.moveableBlockGroup.setVelocityY(0);
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

    // Dark Overlay.
    this.overlay = this.add.image(0, 0, "dark");
    this.overlay.setDepth(2);
    this.overlay.setBlendMode("MULTIPLY");
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
      .setOrigin(0.5)
      .setDepth(3);

    //  Level.
    this.hudLevel = this.add
      .text(0, 0, "Level: FOREST", {
        fontSize: "15px",
        align: "left",
        fontFamily: "block",
      })
      .setOrigin(0.5)
      .setDepth(3);

    //  Stars collected.
    this.hudStars = this.add
      .text(0, 0, this.hubStars + " / 3 Stars", {
        fontSize: "15px",
        align: "right",
        fontFamily: "block",
      })
      .setOrigin(0.5)
      .setDepth(3);
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
    this.hudLevel.x = this.player.body.position.x - 630;
    this.hudLevel.y = this.player.body.position.y - 300;

    // Hud text updates.
    this.hudStars.text = `${this.hubStars} / 3 Stars`;

    // Random Text updates.
    if (this.player.touchesdoor == true) {
      if (this.hubStars < 1) {
        this.text.setText("You need 3 stars to Enter the forest");
      } else {
        this.text.setText("Press SPACE to ENTER the Forest");
      }
    } else if (this.player.touchesflag == true) {
      this.text.setText("Checkpoint!");
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
        this.player.setVelocityX(-120);
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
        this.player.setVelocityX(120);
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
      // Plays sound.
      this.sound.play("sound-jump");
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
      if (this.hubStars >= 3) {
        if (this.cursors.space.isDown) {
          this.scene.start("end");
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

    // Resets Bounce variable.
    this.player.touchesbounce = false;

    // Resets Door variable.
    this.player.touchesladder = false;

    // Resets Flag variable.
    this.player.touchesflag = false;

    // Pauses the scene.
    if (this.cursors.pause.isDown) {
      this.text.setText("Paused");
      this.scene.launch("pause");
      this.scene.pause();
    }

    if (this.cursors.reset.isDown) {
      this.player.x = this.checkpoint.x;
      this.player.y = this.checkpoint.y;

      this.moveableBlock1.x = -600;
      this.moveableBlock1.y = 587.5;

      this.moveableBlock2.x = 3200;
      this.moveableBlock2.y = 587.5;

      this.moveableBlock3.x = 4200;
      this.moveableBlock3.y = 587.5;
    }
  }
}
