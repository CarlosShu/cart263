/****************************************************
Exercise 01: Find the Odd Letter
Carlos-Enrique Salazar Aguilar

My version of the sausage dog activity.
****************************************************/

"use strict";

// Title Menu Visuals variables.
let titleimage;

// Fonts variables.
let arialitalicfont;
let assassinfont;
let dancingfont;
let lemonfont;
let palaiitalicfont;
let royalfont;
let scriptfont;
let stencilfont;
let sylfaenfont;

// Assigning Variables to the Background.
let bg = {
  r: 252,
  g: 76,
  b: 222,
};

// Assigning Variables to the Text.
let titletext = {
  size: 120,
};

// Assigning Variables to the Text.
let instructionstext = {
  size: 40,
};

let textblack = {
  r: 35,
  g: 35,
  b: 35,
};

let textred = {
  r: 200,
  g: 35,
  b: 35,
};

// Start time.
let starttimecounter = 0;
let starttimeleft = 0;

// Game time.
let gametimecounter = 0;
let gametimeleft = 0;

// Starting State Variable.
let state = "titlemenu";

const NUM_LETTER_FONTS = 10;
const NUM_LETTERS = 120;

let letterfonts = [];
let letters = [];

let oddletterfont = undefined;
let oddletter = undefined;

// Preload function.
function preload() {
  // Title Menu Visuals.
  titleimage = loadImage("assets/images/title.png");

  // Fonts.
  arialitalicfont = loadFont("assets/arialitalic.ttf");
  assassinfont = loadFont("assets/assassin.ttf");
  dancingfont = loadFont("assets/dancing.otf");
  lemonfont = loadFont("assets/lemon.otf");
  palaiitalicfont = loadFont("assets/palaiitalic.ttf");
  royalfont = loadFont("assets/royal.otf");
  scriptfont = loadFont("assets/script.ttf");
  stencilfont = loadFont("assets/stencil.otf");
  sylfaenfont = loadFont("assets/sylfaen.ttf");

  for (let i = 0; i < NUM_LETTER_FONTS; i++) {
    let letterfont = loadFont(`assets/fonts/font${i}.ttf`);
    letterfonts.push(letterfont);
  }
  // i starts at 0, while i is less than NUM_LETTER_FONTS i will go up by 1.

  oddletterfont = loadFont(`assets/fonts/font9.ttf`);
}

// Setup function.
function setup() {
  // Create the letters.
  for (let i = 0; i < NUM_LETTERS; i++) {
    let x = random(0, 1408); // random x position.
    let y = random(0, 576); // random y position.
    let letterfont = random(letterfonts); // letter image number.
    let letter = new Letter(x, y, letterfont);
    letters.push(letter);
  }

  let x = random(0, 1408);
  let y = random(0, 576);
  oddletter = new Oddletter(x, y, oddletterfont);
}

// Canvas Resize function.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw function.
function draw() {
  createCanvas(1408, 576);
  background(bg.r, bg.b, bg.g);

  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "instructions") {
    instructions();
  } else if (state === "game") {
    game();
  } else if (state === "won") {
    won();
  } else if (state === "lost") {
    lost();
  }
}

// Title Menu.
function titlemenu() {
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(instructionstext.size);
  fill(textblack.r, textblack.g, textblack.b);
  text("CLICK ANYWHERE TO PLAY", width / 2, height / 2);
  pop();
}

// Instructions Menu.
function instructions() {
  // Timer.
  if (starttimecounter == 60) {
    starttimecounter = 0;
    starttimeleft--;
  }
  starttimecounter++;

  if (starttimeleft <= 6 && starttimeleft > 3) {
    push();
    textAlign(CENTER, CENTER);
    textFont(lemonfont);
    textSize(instructionstext.size);
    fill(textblack.r, textblack.g, textblack.b);
    text("YOU HAVE 10 SECONDS TO FIND THE ODD LETTER.", width / 2, height / 2);
    pop();
  } else if (starttimeleft <= 3 && starttimeleft > 1) {
    push();
    textAlign(CENTER, CENTER);
    textFont(lemonfont);
    textSize(instructionstext.size);
    fill(textblack.r, textblack.g, textblack.b);
    text("READY?", width / 2, height / 2);
    pop();
  } else if (starttimeleft <= 1 && starttimeleft > 0) {
    push();
    textAlign(CENTER, CENTER);
    textFont(lemonfont);
    textSize(instructionstext.size);
    fill(textblack.r, textblack.g, textblack.b);
    text("GO!", width / 2, height / 2);
    pop();
  } else if (starttimeleft == 0) {
    state = "game";
    gametimeleft = 10;
  }
}

function game() {
  // Timer.
  if (gametimecounter == 60) {
    gametimecounter = 0;
    gametimeleft--;
  }
  gametimecounter++;

  for (let i = 0; i < letters.length; i++) {
    // dynamically calculated.

    letters[i].update(); // calls update method.
  }

  oddletter.update();

  if (gametimeleft == 0) {
    state = "lost";
  }
}

function won() {
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(instructionstext.size);
  fill(textblack.r, textblack.g, textblack.b);
  text("NICELY DONE. REFRESH THE PAGE TO PLAY AGAIN.", width / 2, height / 2);
  pop();
}

function lost() {
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(instructionstext.size);
  fill(textblack.r, textblack.g, textblack.b);
  text("GOOD ATTEMPT. CLICK ANYWHERE TO PLAY AGAIN.", width / 2, height / 2);
  pop();
}

function mousePressed() {
  // Switch from title to instructions.
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height &&
    state === "titlemenu"
  ) {
    state = "instructions";
    starttimeleft = 6;
  }

  else if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height &&
    state === "lost"
  ) {
    state = "instructions";
    starttimeleft = 6;
  }

  oddletter.mousePressed(); // mouse pressed within sausage dog image.
}
