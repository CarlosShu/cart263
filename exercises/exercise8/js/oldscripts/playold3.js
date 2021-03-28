class Play extends Phaser.Scene {
  constructor() {
    super({ key: "play" });
  }

  create() {
    // Background.
    this.background = this.add.group({
      defaultKey: "background",
    });
    this.background.create(300, 250).setScale(1.5).setPipeline("Light2D");

    // Create the spaceship.
    this.spaceship = this.physics.add.sprite(300, 400, "spaceship");
    this.spaceship.setCollideWorldBounds(true);
    this.spaceship.setDragX(50);
    this.spaceship.setBounceX(0.5);
    this.spaceship.setScale(1.25);

    // asteroid.
    this.asteroid = this.physics.add.group({
      key: "asteroid",
      quantity: 1,
      collideWorldBounds: true,
    });

    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;

    this.sadness = this.physics.add.sprite(x, y, "thumbs-down");

    Phaser.Actions.RandomRectangle(
      this.asteroid.getChildren(),
      this.physics.world.bounds
    );

    this.physics.add.overlap(
      this.spaceship,
      this.sadness,
      this.getSad,
      null,
      this
    );

    this.physics.add.collider(this.sadness, this.asteroid);

    // Replaces cursor keys with WASD.
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      reset: Phaser.Input.Keyboard.KeyCodes.R,
    });

    // Dim light that follows the spaceship.
    this.light = this.lights.addLight(0, 0, 500);
    this.light.setIntensity(10);
    this.lights.enable();
  }

  getSad(spaceship, sadness) {
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.sadness.setPosition(x, y);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.spaceship.body.acceleration.x = -250;
      this.spaceship.body.rotation = -30;
    } else if (this.cursors.right.isDown) {
      this.spaceship.body.acceleration.x = 250;
      this.spaceship.body.rotation = 30;
    } else {
      this.spaceship.body.acceleration.x = 0;
      this.spaceship.body.rotation = 0;
    }

    // Light.
    this.light.x = this.spaceship.x;
    this.light.y = this.spaceship.y;
  }
}
