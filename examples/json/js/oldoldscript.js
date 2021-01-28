"use strict";

let tarotData = undefined;
let fortune = "No fortune found yet...";

function preload() {}
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // let description = tarotData.description;
  // let firstShadowMeaning =
  //   tarotData.tarot_interpretations[0].meanings.shadow[0]; // gives us first shadow meaning.

  push();
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text(fortune, width / 2, height / 2);
  pop();
}

function mousePressed() {
  loadJSON(
    "https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json",
    tarotLoaded
  );
}

function tarotLoaded(data) {
  // tarotdata is assigned what is inside regular data.
  tarotData = data;
  let card = random(tarotData.tarot_interpretations); // random fortune variable.
  fortune = random(card.fortune_telling);
}
