class Play extends Phaser.Scene {
  constructor() {
    super({ key: "play" });
  }

  create() {
    // Block.
    this.block = this.add.image(400, 300, "block");
    // this.block.setTint(0xdd3333); // Sets tint.
    this.block.setScale(0.25); // Sets scale.

    this.avatar = this.physics.add.sprite(400, 300, "avatar");
    this.avatar.setScale(0.25); // Sets scale.

    // Calls create animation function.
    this.createAnimations();

    this.avatar.setVelocityX(100);
    this.avatar.play("idle-left");
    this.avatar.setCollideWorldBounds(true);

    // Replaces cursor keys with WASD.
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      reset: Phaser.Input.Keyboard.KeyCodes.R,
    });
  }

  update() {
    this.avatar.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(100);
    }

    if (this.cursors.up.isDown) {
      this.avatar.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.avatar.setVelocityY(100);
    }

    if (
      this.avatar.body.velocity.x !== 0 ||
      this.avatar.body.velocity.y !== 0
    ) {
      this.avatar.play("left", true);
    } else {
      this.avatar.play("idle-left", true);
    }
  }

  // Create animations function.
  createAnimations() {
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
  }
}
