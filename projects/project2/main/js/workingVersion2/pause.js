class Pause extends Phaser.Scene {
  constructor() {
    super({ key: "pause" });
  }

  create() {
    // Replaces cursor keys with WASD.
    this.cursors = this.input.keyboard.addKeys({
      pause: Phaser.Input.Keyboard.KeyCodes.ESC,
    });
  }

  update() {
    // Resumes the scene.
    if (this.cursors.pause.isDown) {
      this.scene.resume("play");
      this.scene.stop();
    }
  }
}
