class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
  }

  preload() {
    // Load assets here!
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("spaceship", "assets/images/spaceship.png");
    this.load.image("thumbs-down", "assets/images/thumbs-down.png");
    this.load.image("asteroid", "assets/images/asteroid.png");
    this.load.image("star", "assets/images/star.png");
    this.load.image("moon", "assets/images/moon.png");
    this.load.image("rocks", "assets/images/rocks.png");
    this.load.on("complete", () => {
      this.scene.start("title");
    });
  }

  create() {}

  update() {}
}
