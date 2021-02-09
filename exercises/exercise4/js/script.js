"use strict";

/**************************************************
Pop-A-Bop 2
Carlos-Enrique Salazar Aguilar

Bubble Popper ++ Exercise using ML5 js.
**************************************************/

// Fonts variables.
let lemonfont;

// Visuals variables.
let cursorimage;
let colorimage;
let underwaterimage;
let bgimage;
let bubbleimage;

// State.
let state = "title";

// Bubbles.
let bubbles = []; // Calling card of the array.
let bubblesSize = 20; // Bubble amount size.

// Small Bubbles.
let smallbubbles = []; // Calling card of the array.
let smallbubblesSize = 40; // Bubble amount size.

// Bubbles.
let bigbubbles = []; // Calling card of the array.
let bigbubblesSize = 10; // Bubble amount size.

// Time counter variable.
let timecounter = 0;

// Score variable.
var score = 0;

let gameData = {
  // game data.
  highscore: 0,
};

// Time left variable.
var timeleft = 10;

function preload() {
  // Fonts.
  lemonfont = loadFont("assets/lemon.otf");

  // Visuals.
  cursorimage = loadImage("assets/images/cursor.png");
  bgimage = loadImage("assets/images/background.png");
  colorimage = loadImage("assets/images/color.png");
  bubbleimage = loadImage("assets/images/bubble.png");
  underwaterimage = loadImage("assets/images/underwater.gif");
}

function setup() {
  createCanvas(1000, 500);
  noCursor();

  let data = JSON.parse(localStorage.getItem("click-attack-game-data"));
  // load the data when the program starts.
  if (data !== null) {
    // if data isn't null then there is a highscore there.
    gameData = data;
  }

  // Bubble Spawn.
  for (let i = 0; i < bubblesSize; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let bubble = new Bubble(x, y);
    bubbles.push(bubble);
  }

  // Small Bubble Spawn.
  for (let i = 0; i < smallbubblesSize; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let smallbubble = new SmallBubble(x, y);
    smallbubbles.push(smallbubble);
  }

  // Big Bubble Spawn.
  for (let i = 0; i < bigbubblesSize; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let bigbubble = new BigBubble(x, y);
    bigbubbles.push(bigbubble);
  }
}

function windowResized() {
  resizeCanvas(width, height);
}

function draw() {
  background(bgimage);

  if (state === "title") {
    bubbleAppear();
    title();
    GlobalOverlay();
  } else if (state === "instructions") {
    bubbleAppear();
    instructions();
    GlobalOverlay();
  } else if (state === "simulation") {
    bubbleAppear();
    simulation();
    GlobalOverlay();
  } else if (state === "ending") {
    bubbleAppear();
    ending();
    GlobalOverlay();
  }
}

// Global lighting Function.
function GlobalOverlay() {
  // Color overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(colorimage, width / 2, height / 2, width, height);
  pop();

  // UNderwater overlay.
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(underwaterimage, width / 2, height / 2, width, height);
  pop();

  // Cursor Image.
  push();
  imageMode(CENTER);
  image(cursorimage, mouseX, mouseY, 700, 700);
  pop();
}

// Title function.
function title() {
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(90);
  fill(255, 255, 255);
  text("POP-A-BOP 2", width / 2, height / 2);
  pop();

  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Press ENTER to play", width / 2, 450);
  pop();
}

// Instructions function.
function instructions() {
  // Instructions
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(30);
  fill(255, 255, 255);
  text(
    `Your current High Score is ${gameData.highscore}`,
    width / 2,
    height / 2
  );
  pop();

  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Press ENTER to start", width / 2, 450);
  pop();
}

function simulation() {
  // Time.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Time: " + timeleft, width / 2, height / 1.1);
  pop();

  // 10 second timer.
  if (timecounter == 70) {
    // This only happens every second.
    timecounter = 10;
    timeleft--;
  }
  timecounter++;

  // Goes to ending state once 10 seconds have passed.
  if (timeleft === 0) {
    state = "ending";
  }

  if (score > gameData.highscore) {
    gameData.highscore = score;
    localStorage.setItem("click-attack-game-data", JSON.stringify(gameData)); // converts game data to string.
  }
}

// Ending function.
function ending() {
  // Score.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(50);
  fill(255, 255, 255);
  text("Your Score: " + score, width / 2, height / 2);
  pop();
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Press ESC to play again", width / 2, height / 1.1);
  pop();
}

function bubbleAppear() {
  // Counter for arrays. Less than four moving bubble.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  }

  // Counter for arrays. Less than four moving bubble.
  for (let i = 0; i < smallbubbles.length; i++) {
    smallbubbles[i].update();
  }

  // Counter for arrays. Less than four moving bubble.
  for (let i = 0; i < bigbubbles.length; i++) {
    bigbubbles[i].update();
  }
}

// Key press function.
function keyPressed() {
  // Switch from title to instructions.
  if (state === "title") {
    if (keyCode == 13) {
      state = "instructions";
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
