class End extends Phaser.Scene {
  constructor() {
    super({ key: "end" });
  }

  create() {
    // Sky Background.
    this.sky = this.add.group({
      key: "sky",
      setXY: { x: 720, y: 360 },
    });
    this.sky.children.iterateLocal("setDepth", -2);

    // Logo.
    this.logo = this.add.group({
      key: "endLogo",
      setXY: { x: 720, y: 360 },
      setScale: { x: 0.5, y: 0.5 },
    });
    this.logo.children.iterateLocal("setDepth", 0);

    // Overlay.
    this.overlay = this.add.image(720, 360, "overlay");
    this.overlay.setDepth(0);

    // Start to Play.
    this.play = this.add
      .text(720, 680, "Press SPACE to Play Again", {
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
      this.scene.start("title");
    }
  }
}
