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
let panel03image;
let panel04image;
let panel05image;
let panel06image;
let panel07image;
let panel08image;
let panel09image;
let panel10image;
let panel11image;
let panel12image;

// FPS variable.
let fr = 15;

// Number Variables.
let counter = 0;

// Panel time.
let paneltimecounter = 0;
let paneltimeleft = 0;

// Fade variables.
var fade;
var fadeAmount = 18;

// Fade text variables.
var fadeText;
var fadeTextAmount = 18;

// State Variable.
let state = "titlemenu";

// Sentence starts at zero characters. Ettiene helped.
let n = 0;

// Dialogues.

// Slide Blank.
var slideblank_01 = "Sometime in the Year 1963...";
var slideblank_02 = "Later that day...";
var slideblank_03 = "A little while later...";
var slideblank_04 = "Later that night...";

// Panel 01 array.
let panel01 = [
  "You're travelling to another dimension...",
  "One not only of sight and sound but of mind...",
  "Your next stop...",
  "The Twilight Zone",
];

// Panel 02 array.
let panel02 = [
  "Hello, my name is Rob Sterling.",
  "In tonight's story, we'll be exploring a little Town called Peaksville.",
  "You see, not too long ago, Peaksville was isolated from the rest of the world...",
];

let currentSlide = 0;

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
  panel03image = loadImage("assets/images/panels/03.png");
  panel04image = loadImage("assets/images/panels/04.png");
  panel05image = loadImage("assets/images/panels/05.png");
  panel06image = loadImage("assets/images/panels/06.png");
  panel07image = loadImage("assets/images/panels/07.png");
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
  } else if (state === "shot01") {
    shot01();
  } else if (state === "shot02") {
    shot02();
  } else if (state === "shot03") {
    shot03();
  } else if (state === "shot04") {
    shot04();
  } else if (state === "shot05") {
    shot05();
  } else if (state === "shot06") {
    shot06();
  }

  // Panel Timer.
  if (paneltimecounter == 10) {
    paneltimecounter = 0;
    paneltimeleft--;
  }
  paneltimecounter++;
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
    textSize(18);
    fill(255, 255, 255);
    text("Press Enter", width / 2, 650);
    pop();
  }
  if (counter == 18) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

// Shot 01.
function shot01() {
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

  textAlign(CENTER, CENTER);
  textFont(courierfont);
  textSize(18);
  fill(255, 255, 255);
  text(panel01[currentSlide].substring(0, n), width / 2, 625);

  if (n < panel01[currentSlide].length) {
    n++;
  } else {
    n = panel01[currentSlide].length;
  }

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;
}

// Shot 02.
function shot02() {
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

  textAlign(CENTER, CENTER);
  textFont(courierfont);
  textSize(18);
  fill(255, 255, 255);
  text(panel02[currentSlide].substring(0, n), width / 2, 625);

  if (n < panel02[currentSlide].length) {
    n++;
  } else {
    n = panel02[currentSlide].length;
  }

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "shot01";
      currentSlide = 0;
      fade = 0;
      fadeText = 0;
      paneltimeleft = 3;
    }
  }

  // Space Bar.
  if (keyCode == 32) {
    // Shot 01.
    if (state === "shot01") {
      // Switches to next slide.
      if (n == panel01[currentSlide].length) {
        // Current Sldie;
        currentSlide = currentSlide + 1;
        n = 0;
      }
      // If it's the last slide it'll switch over to the next panel.
      if (currentSlide == panel01.length) {
        state = "shot02";
        currentSlide = 0;
        fade = 0;
        fadeText = 0;
      }
    }

    // Shot 02.
    if (state === "shot02") {
      // Switches to next slide.
      if (n == panel02[currentSlide].length) {
        // Current Sldie;
        currentSlide = currentSlide + 1;
        n = 0;
      }
      // If it's the last slide it'll switch over to the next panel.
      if (currentSlide == panel02.length) {
        state = "shot03";
        currentSlide = 0;
        fade = 0;
        fadeText = 0;
      }
    }
  }
}
