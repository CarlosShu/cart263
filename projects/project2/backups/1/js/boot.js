class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  preload() {
    // Style of text.
    this.style = {
      fontSize: "30px",
      align: "center",
      fontFamily: "arial",
      color: "#ffffff",
    };

    // Loading text.
    this.loadingString = "Loading...";

    // Adds text.
    this.add.text(720, 360, this.loadingString, this.style).setOrigin(0.5);

    this.load.image("sky", "assets/images/sky.png");
    this.load.image("ground", "assets/images/ground.png");
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("block", "assets/images/block.png");
    this.load.image("ladder", "assets/images/ladder.png");
    this.load.spritesheet("avatar-walk", "assets/images/avatar-walk.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-run", "assets/images/avatar-run.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-idle", "assets/images/avatar-idle.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-jump", "assets/images/avatar-jump.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-crouch", "assets/images/avatar-crouch.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-push", "assets/images/avatar-push.png", {
      frameWidth: 200,
      frameHeight: 260,
    });

    // When it finishes loading it will switch to the play scene.
    this.load.on("complete", () => {
      this.scene.start("title");
    });
  }

  create() {}

  update() {}
}
