"use strict";

/**************************************************
Pop-a-Bop 2
Carlos-Enrique Salazar Aguilar

Pop bubbles with your index finger as a pin.
**************************************************/
// Fonts variables.
let lemonfont;

// Visuals variables.
let cursorimage;
let colorimage;
let underwaterimage;
let bgimage;
let bubbleimage;

// The Global Video.
let video = undefined;

// The Handpose Model.
let handpose = undefined;

// The current set of predictions.
let predictions = [];

// The bubble.
let bubble = undefined;

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

// State.
let state = "loading";

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
  createCanvas(640, 480);

  // Access user's webcam.
  video = createCapture(VIDEO);
  video.hide();

  // Load the handpose model.
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log("Model loaded.");
    state = `title`;
  });

  // Listen for predictions.
  handpose.on("predict", function (results) {
    console.log(results);
    predictions = results;
  });

  let data = JSON.parse(localStorage.getItem("bubble-game"));
  // load the data when the program starts.
  if (data !== null) {
    // if data isn't null then there is a highscore there.
    gameData = data;
  }

  // Our bubble.
  bubble = {
    x: random(width),
    y: height,
    size: 60,
    vx: 0,
    vy: 0,
    speed: 2,
    maxspeed: 4,
  };
}

function draw() {
  background(bgimage);

  if (state === `loading`) {
    loading();
  } else if (state === "title") {
    title();
    pin();
    GlobalOverlay();
  } else if (state === "instructions") {
    instructions();
    pin();
    GlobalOverlay();
  } else if (state === "simulation") {
    simulation();
    pin();
    bubbleappear();
    GlobalOverlay();
  } else if (state === "ending") {
    ending();
    pin();
    GlobalOverlay();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(25);
  fill(255, 255, 255);
  text("Use your Index Finger to Play!", width / 2, height / 2);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(15);
  fill(255, 255, 255);
  text("Loading Game...", width / 2, 450);
  pop();
}

function pin() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    // Pin body.
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(5);
    line(baseX, baseY, tipX, tipY);
    pop();

    // Pin head.
    push();
    noStroke();
    fill(180, 180, 180);
    ellipse(baseX, baseY, 25);
    pop();

    // Check pubble popping.
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
      score = score + 1;
    }
  }
}

function bubbleappear() {
  bubble.vy = random(-bubble.speed, -bubble.maxspeed);
  let change = random(0, 100);
  if (change < 0.1) {
    bubble.vx = random(-bubble.speed, bubble.speed);
  }

  // Move the bubble.
  bubble.x = bubble.x + bubble.vx;
  bubble.y = bubble.y + bubble.vy;

  // If bubble leaves canvas it resets.
  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  // Displays the bubble.
  push();
  imageMode(CENTER);
  image(bubbleimage, bubble.x, bubble.y, bubble.size, bubble.size);
  pop();
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
}

// Title function.
function title() {
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textFont(lemonfont);
  textSize(75);
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
    localStorage.setItem("bubble-game", JSON.stringify(gameData)); // converts game data to string.
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
