class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  preload() {
    // Block.
    this.load.image("block", "assets/images/block.png");
    // Avatar.
    this.load.spritesheet("avatar-idle", "assets/images/avatar-idle.png", {
      frameWidth: 200,
      frameHeight: 252,
    });

    // When it finishes loading it will switch to the play scene.
    this.load.on("complete", () => {
      this.scene.start("play");
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
  }

  update() {}
}
