class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  create() {
    let style = {
      fontFamily: "sans-serif",
      fontSize: "40px",
      color: "#ffffff",
    };
    // Loading text.
    let loadingString = "Loading...";
    this.add.text(100, 100, loadingString, style);

    // Switch scenes.
    this.scene.start("play");
  }

  update() {}
}
