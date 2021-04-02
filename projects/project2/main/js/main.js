"use strict";

let config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 720,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 800 },
    },
  },
  scene: [Boot, Title, Play, Forest],
};

let game = new Phaser.Game(config);
