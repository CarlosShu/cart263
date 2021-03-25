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
  scene: [Boot, Play],
};

let game = new Phaser.Game(config);

let facing = "right";
let cursors;
let score = 0;
let text;
let currentTime = 150;
let timedEvent;
