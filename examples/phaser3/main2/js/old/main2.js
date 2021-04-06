let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [Boot, Player],
};

let game = new Phaser.Game(config);
