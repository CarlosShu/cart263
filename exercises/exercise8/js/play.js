class Play extends Phaser.Scene {
  constructor() {
    super({ key: "play" });
  }

  create() {
    // Background.
    this.background = this.add.group({
      defaultKey: "background",
    });
    this.background.create(300, 350).setScale(1.5).setPipeline("Light2D");

    // Create the spaceship.
    this.spaceship = this.physics.add.sprite(300, 500, "spaceship");
    this.spaceship.setCollideWorldBounds(true);
    this.spaceship.setDragX(10);
    this.spaceship.setBounceX(0.5);
    this.spaceship.setScale(1.25);

    let asteroidX = Math.random() * this.sys.canvas.width;
    let asteroidY = -100;

    this.asteroid = this.physics.add.sprite(asteroidX, asteroidY, "asteroid");
    this.asteroid.setScale(0.75);

    this.physics.add.overlap(
      this.spaceship,
      this.asteroid,
      this.getHit,
      null,
      this
    );

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
    this.light.setIntensity(20);
    this.lights.enable();
  }

  getHit(spaceship, asteroid) {
    this.scene.start("end");
  }

  update() {
    //  Hud.
    this.text = this.add.text(10, 10, "Level " + level, {
      fontSize: "15px",
      align: "center",
    });

    if (this.cursors.left.isDown) {
      this.spaceship.body.acceleration.x = -300;
      this.spaceship.body.rotation = -30;
    } else if (this.cursors.right.isDown) {
      this.spaceship.body.acceleration.x = 300;
      this.spaceship.body.rotation = 30;
    } else {
      this.spaceship.body.acceleration.x = 0;
      this.spaceship.body.rotation = 0;
    }

    if (this.asteroid.y <= 0) {
      this.asteroid.setVelocityY(asteroidSpeed);
    }

    if (this.asteroid.y > 700) {
      this.asteroid.x = Math.random() * this.sys.canvas.width;
      this.asteroid.y = -100;
      level += 1;
      asteroidSpeed = asteroidSpeed + 20;
    }

    // Light.
    this.light.x = this.spaceship.x;
    this.light.y = this.spaceship.y;
  }
}
