"use strict";

/**************************************************
Project 1: A Night at the Movies
Carlos-Enrique Salazar Aguilar

A re-telling of the classic Twilight Zone Episode "It's a Good Life".
**************************************************/
// Font variable.
let courierfont;

// Visuals variables.
let backgroundimage;
let headerimage;
let titleimage;

// Panels variables.
let panel01image;
let panel02image;

// FPS variable.
let fr = 10;

// Number Variables.
let counter = 0;

// Panel time.
let paneltimecounter = 0;
let paneltimeleft = 0;

// Fade variables.
var fade;
var fadeAmount = 20;

// Fade text variables.
var fadeText;
var fadeTextAmount = 20;

// State Variable.
let state = "titlemenu";

function preload() {
  // Font.
  courierfont = loadFont("assets/courier.otf"); // Practically the Nintendo Logo Font.

  // Visuals.
  backgroundimage = loadImage("assets/images/background.png");
  headerimage = loadImage("assets/images/header.png");
  titleimage = loadImage("assets/images/title.png");

  // Visual Panels.
  panel01image = loadImage("assets/images/panels/01.gif");
  panel02image = loadImage("assets/images/panels/02.png");
}

function setup() {
  createCanvas(900, 700);

  // No cursor.
  noCursor();

  // No Smoothing.
  noSmooth();

  // FPS.
  frameRate(fr);

  // Fade.
  fade = 0;

  // Fade Text.
  fadeText = 0;
}

function draw() {
  background(backgroundimage);

  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "panel_01") {
    panel01();
  } else if (state === "panel_02") {
    panel02();
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

  if (counter >= 10) {
    push();
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(15);
    fill(255, 255, 255);
    text("Press Enter", width / 2, 650);
    pop();
  }
  if (counter == 20) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

function panel01() {
  // Panel 01.
  push();
  imageMode(CENTER);
  tint(255, fade);
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
  fill(255, 255, 255, fadeText);
  text(
    "You're travelling to a dimension beyond the boundaries of time and space...",
    width / 2,
    height / 2
  );
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  // Panel Timer.
  if (paneltimecounter == 10) {
    paneltimecounter = 0;
    paneltimeleft--;
  }
  paneltimecounter++;
}

function panel02() {
  /// Panel 02.
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel02image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  // FIX THIS.
  typeWriter("Hello, my name is Rob Sterling...", 0, width / 2, 625, 50);
}

// FIX THIS. Source ---> https://gist.github.com/mjvo/2dce29799eb75b7ee1a571380f12ef1b
function typeWriter(sentence, n, x, y, speed) {
  if (n < sentence.length) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(15);
    fill(255, 255, 255);
    text(sentence.substring(0, n + 5), x, y);
    n++;
    setTimeout(function () {
      typeWriter(sentence, n, x, y, speed);
    }, speed);
  }
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "panel_01";
      fade = 0;
      fadeText = 0;
      paneltimeleft = 3;
    }
  }
  if (state === "panel_01") {
    if (paneltimeleft < 0) {
      if (keyCode == 13) {
        state = "panel_02";
        fade = 0;
        fadeText = 0;
        paneltimeleft = 12;
      }
    }
  }
}
