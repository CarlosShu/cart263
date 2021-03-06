"use strict";

// Is the light on or off?
let on = false;

function setup() {
  createCanvas(500, 500);

  // Check if annyang is available.
  if (annyang) {
    // Create the commands.
    let commands = {
      "Turn the light on": function() {
        on = true;
      },
      "Turn the light off": function() {
        on = false;
      }
    }
    // Add the commands and start annyang.
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  if (on) {
  background(255);
  } else {
    background(0);
  }
}
