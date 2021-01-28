// how to have a program that saves game data.

"use strict";

let clicks = 0; // number of clicks.

let gameData = {
  // game data.
  highScore: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem("click-attack-game-data"));
  // load the data when the program starts.
  if (data !== null) {
    // if data isn't null then there is a highscore there.
    gameData = data;
  }
}

function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(0);
  text(clicks, width / 2, height / 2);
  pop();

  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  fill(0);
  text(`High Score: ${gameData.highScore}`, 100, 100);
  pop();
}

function mousePressed() {
  clicks++; // adds on clicks.

  if (clicks > gameData.highScore) {
    gameData.highScore = clicks;
    localStorage.setItem("click-attack-game-data", JSON.stringify(gameData)); // converts game data to string.
  }
}

function keyPressed() {
  if (key === "c") {
    localStorage.removeItem("click-attack-game-data"); // deletes save data.
  }
}
