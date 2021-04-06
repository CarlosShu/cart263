class Instructions extends Phaser.Scene {
  constructor() {
    super({ key: "instructions" });
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
      key: "instructions",
      setXY: { x: 720, y: 360 },
      setScale: { x: 0.75, y: 0.75 },
    });
    this.logo.children.iterateLocal("setDepth", 1);

    // Overlay.
    this.overlay = this.add.image(720, 360, "overlay");
    this.overlay.setDepth(0);

    // Start to Play.
    this.play = this.add
      .text(720, 680, "PRESS SPACE TO PLAY", {
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
      this.scene.start("play");
    }
  }
}
