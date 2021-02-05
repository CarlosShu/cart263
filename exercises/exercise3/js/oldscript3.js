/**************************************************
Click & Click
Carlos-Enrique Salazar

Here is a description of this template p5 project.
**************************************************/
"use strict";

// Fonts variable.
let droidfont;

// State.
let state = "title";

// Preload Function.
function preload() {
  // Fonts.
  droidfont = loadFont("assets/droid.ttf");
}

function setup() {
  createCanvas(1000, 500);
  noCursor();
}

function draw() {
  background(0);

  if (state === "title") {
    title();
  } else if (state === "username") {
    username();
    onInput();
  } else if (state === "password") {
  }
}

function title() {
  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(80);
  fill(0, 255, 0);
  text("CLICK & CLICK", width / 2, height / 2);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("Press Enter to Log In / Register", width / 2, 450);
  pop();
}

function username() {
  // push();
  // textAlign(CENTER, CENTER);
  // textFont(droidfont);
  // textSize(40);
  // fill(0, 255, 0);
  // text("Write in the input box to change the text", width / 2, height / 2);
  // pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("Please Enter Your Username", width / 2, 450);
  pop();
}

function onInput() {
  // create input box
  let inputElem = createInput("");
  inputElem.input(onInput);
  inputElem.position(0, 0);

  push();
  fill("black");
  rectMode(CENTER);
  rect(width / 2, height / 2, 600, 100);
  pop();

  // get the text entered
  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(40);
  fill(0, 255, 0);
  text(this.value(), width / 2, height / 2);
  pop();
}

// Key press function.
function keyPressed() {
  // Switch from title to instructions.
  if (state === "title") {
    if (keyCode == 13) {
      state = "username";
    }
  } else if (state === "instructions") {
    if (keyCode == 13) {
      state = "simulation";
    }
  } else if (state === "ending") {
    if (keyCode == 27) {
      state = "title";
      score = 0;
      timeleft = 10;
    }
  }
}
