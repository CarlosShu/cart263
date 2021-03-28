class Instructions extends Phaser.Scene {
  constructor() {
    super({ key: "instructions" });
  }

  create() {
    // End Score.
    this.text = this.add
      .text(300, 300, "Use W & A to move left and right and avoid asteroids.", {
        fontSize: "15px",
        align: "center",
      })
      .setOrigin(0.5);

    // Play again.
    this.play = this.add
      .text(300, 550, "Press SPACE to play.", {
        fontSize: "15px",
        align: "center",
      })
      .setOrigin(0.5);

    // Replaces cursor keys with WASD.
    this.cursors = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  update() {
    // Reset.
    if (this.cursors.space.isDown) {
      this.scene.start("play");
    }
  }
}
