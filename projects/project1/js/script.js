"use strict";

/**************************************************
Template p5 project
Carlos-Enrique Salazar Aguilar

Here is a description of this template p5 project.
**************************************************/
// Font variable.
let courierfont;

// Visuals variables.
let backgroundimage;
let headerimage;
let titleimage;

// Panels variables.
let panel01image;

// State Variable.
let state = "titlemenu";

// Number Variables.
let counter = 0;

function preload() {
  // Font.
  courierfont = loadFont("assets/courier.otf"); // Practically the Nintendo Logo Font.

  // Visuals.
  backgroundimage = loadImage("assets/images/background.png");
  headerimage = loadImage("assets/images/header.png");
  titleimage = loadImage("assets/images/title.png");

  // Visual Panels.
  panel01image = loadImage("assets/images/panel01.gif");
}

function setup() {
  createCanvas(900, 700);
}

function draw() {
  background(backgroundimage);

  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "panel_01") {
    panel01();
  }
}

function titlemenu() {
  // Title.
  push();
  imageMode(CENTER);
  image(titleimage, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (counter >= 30) {
    push();
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(15);
    fill(255, 255, 255);
    text("Press Enter", width / 2, 650);
    pop();
  }
  if (counter == 60) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

function panel01() {
  // Panel 01.
  push();
  imageMode(CENTER);
  image(panel01image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(courierfont);
  textSize(15);
  fill(255, 255, 255);
  text(
    "You're travelling to another dimension beyond the boundaries of time and space...",
    width / 2,
    height / 2
  );
  pop();
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "panel_01";
    }
  }
}
