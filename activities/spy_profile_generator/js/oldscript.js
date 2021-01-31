"use strict";

/**************************************************
Spy Profile Generator Activity
Carlos-Enrique Salazar Aguilar

**************************************************/

let spyProfile = {
  name: "**REDACTED**",
  alias: "**REDACTED**",
  secretWeapon: "**REDACTED",
  password: "**REDACTED**",
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

function preload() {
  instrumentData = loadJSON(
    "https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json"
  );
  objectData = loadJSON(
    "https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json"
  );
  tarotData = loadJSON(
    "https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  generateSpyProfile();
}

function generateSpyProfile() {
  spyProfile.name = prompt("Agent! What is your name?!");
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem("spy-profile-data", JSON.stringify(spyProfile)); // Saves data. Turns object into string.
}

function draw() {
  background(255);

  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secreat Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont("Courier, monospace");
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(profile, 100, 100);
  pop();
}
