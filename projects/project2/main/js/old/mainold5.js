var config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 720,
  parent: "phaser-example",
  scene: {
    preload: preload,
    create: create,
    update: update,
    physics: {
      arcade: {
        debug: false,
        gravity: { y: 800 },
      },
    },
  },
};

var facing = "right";
var cursors;
var game = new Phaser.Game(config);
var score = 0;
var text;
var currentTime = 150;
var timedEvent;

function preload() {}

function create() {}

function update() {}
