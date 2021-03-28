class End extends Phaser.Scene {
  constructor() {
    super({ key: "end" });
  }

  create() {
    // End Score.
    this.text = this.add
      .text(300, 300, "Your Final Score: " + level, {
        fontSize: "30px",
        align: "center",
      })
      .setOrigin(0.5);

    // Play again.
    this.play = this.add
      .text(300, 550, "Press R to play again.", {
        fontSize: "15px",
        align: "center",
      })
      .setOrigin(0.5);

    // Replaces cursor keys with WASD.
    this.cursors = this.input.keyboard.addKeys({
      reset: Phaser.Input.Keyboard.KeyCodes.R,
    });
  }

  update() {
    // Reset.
    if (this.cursors.reset.isDown) {
      this.scene.start("play");
      level = 1;
      asteroidSpeed = 200;
    }
  }
}
