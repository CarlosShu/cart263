class Play extends Phaser.Scene {
  constructor() {
    super({ key: "play" });
  }

  create() {
    // Block.
    this.block = this.add.image(400, 300, "block");
    // this.block.setTint(0xdd3333); // Sets tint.
    this.block.setScale(0.25); // Sets scale.

    this.avatar = this.add.sprite(400, 300, "avatar");
    this.avatar.setScale(0.25); // Sets scale.

    // Calls create animation function.
    this.createAnimations();

    this.avatar.play("idle-left");
  }

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
  }

  update() {}
}
