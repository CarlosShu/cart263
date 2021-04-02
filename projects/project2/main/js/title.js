class Title extends Phaser.Scene {
  constructor() {
    super({ key: "title" });
  }

  create() {
    // Title.
    this.text = this.add
      .text(720, 360, "BLOCK MANIA", {
        fontSize: "100px",
        align: "center",
        fontFamily: "block",
      })
      .setOrigin(0.5);

    // Start to Play.
    this.play = this.add
      .text(720, 680, "Press SPACE to Play", {
        fontSize: "15px",
        align: "center",
        fontFamily: "block",
      })
      .setOrigin(0.5);

    // Replaces cursor keys with WASD.
    this.cursors = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  update() {
    // Start.
    if (this.cursors.space.isDown) {
      this.scene.start("forest");
    }
  }
}
