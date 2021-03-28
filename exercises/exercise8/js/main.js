/**************************************************
Desperately Seeking Sadness
Carlos-Enrique Salazar Aguilar

Phaser 3 Activity.
**************************************************/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  physics: { default: "arcade" },
  scene: [Boot, Instructions, Title, Play, End],
};

let game = new Phaser.Game(config);
let level = 1;
let asteroidSpeed = 200;
