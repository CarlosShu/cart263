"use strict";

let face = `:-|`;

function setup() {
  createCanvas(500, 500);

  // Check if annyang is available.
  if (annyang) {
    // Create the commands.
    let commands = {
      "I love you": love,
      "I hate you": hate
    }
    // Add the commands and start annyang.
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  rotate(PI / 2);
  textSize(400);
  textAlign(CENTER, CENTER);
  fill(255);
  text(face, 0, 0);
  pop();
}

function love() {
  face = `:-)`;
}

function hate() {
  face = `:-(`;
}
