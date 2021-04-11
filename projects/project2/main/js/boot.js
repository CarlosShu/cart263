class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  preload() {
    // Load Font.
    this.loadFont("block", "assets/fonts/block.otf");

    // Sounds.
    this.load.audio("sound-jump", "assets/sounds/jump.wav");

    this.load.image("titleLogo", "assets/images/titleLogo.png");
    this.load.image("endLogo", "assets/images/endLogo.png");

    this.load.image("instructions", "assets/images/instructions.png");

    this.load.image("dark", "assets/images/dark.png");
    this.load.image("overlay", "assets/images/overlay.png");
    this.load.image("sky", "assets/images/sky.png");

    this.load.image("ground", "assets/images/ground.png");
    this.load.image("groundFloor", "assets/images/groundFloor.png");
    this.load.image("checkpoint", "assets/images/checkpoint.png");
    this.load.image("door", "assets/images/door.png");
    this.load.image("doorLock", "assets/images/doorlock.png");
    this.load.image("star", "assets/images/star.png");
    this.load.image("ladder", "assets/images/ladder.png");

    // Blocks.
    this.load.image("block", "assets/images/block.png");
    this.load.image("blockWide", "assets/images/blockWide.png");
    this.load.image("bigBlock", "assets/images/bigBlock.png");
    this.load.image("bigBlockWide", "assets/images/bigBlockWide.png");
    this.load.image("blockTall", "assets/images/blockTall.png");

    // Platforms.
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("platformWide", "assets/images/platformWide.png");
    this.load.image("platformWider", "assets/images/platformWider.png");

    // Forest Assets.
    this.load.image("forestTree", "assets/images/forestTree.png");
    this.load.image("forestFlower", "assets/images/forestFlower.png");
    this.load.image("forestRock", "assets/images/forestRock.png");
    this.load.image("forestMushroom", "assets/images/forestTree.png");

    // Avatar Sprites.
    this.load.spritesheet("avatar-idle", "assets/images/avatar-idle.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-walk", "assets/images/avatar-walk.png", {
      frameWidth: 200,
      frameHeight: 260,
    });
    this.load.spritesheet("avatar-run", "assets/images/avatar-run.png", {
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
    this.load.spritesheet("avatar-climb", "assets/images/avatar-climb.png", {
      frameWidth: 200,
      frameHeight: 260,
    });

    // Loading text.
    this.text = this.add
      .text(720, 360, "Loading...", {
        fontSize: "30px",
        align: "center",
        fontFamily: "block",
      })
      .setOrigin(0.5);

    // When it finishes loading it will switch to the play scene.
    this.load.on("complete", () => {
      this.scene.start("title");
    });
  }

  create() {}

  update() {}

  // Load font function I found on the internet. https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }
}
