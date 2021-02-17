"use strict";

// Possible Hamlet Quotes.
let soliloquy = [
  `To be or not to be?`,
  `That is the question.`,
  `Whether 'tis nobler in the mind.'`,
  `To suffer the slings and arrows.`,
  `Of outregeous fortune.`,
  `Or to take arms.`,
  `Against a sea of sorrows.`,
  `And by opposing end them.`,
];

// Displays message.
let currentIndex = 0;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
}

function draw() {
  background(0);
  text(soliloquy[currentIndex], width / 2, height / 2);
}

// Randomizes possible quotes.
function mousePressed() {
  currentIndex = currentIndex + 1;

  if (currentIndex === soliloquy.length) {
    currentIndex = 0;
  }
}
