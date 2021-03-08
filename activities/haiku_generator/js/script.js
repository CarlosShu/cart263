/**
Haiku Generator
Carlos-Enrique Salazar Aguilar

Generates a random haiku!
*/

"use strict";

let fiveSyllableLines = [
  "O, to be a tree.",
  "The cat does not know.",
  "We are all forests.",
  "You have done your best.",
  "They are all gone now.",
];

let sevenSyllableLines = [
  "Say the things left unsaid.",
  "Never believe the wind's lies.",
  "The autumn stretches its legs.",
  "Nothing can satisfy you.",
  "They will not come back again.",
];

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let line1P = document.getElementById("line1");
let line2P = document.getElementById("line2");
let line3P = document.getElementById("line3");

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

// Every line has a click event that knows to call to call the Lineclicked function.
line1P.addEventListener("click", lineClicked);
line2P.addEventListener("click", lineClicked);
line3P.addEventListener("click", lineClicked);

// Line clicked function sets new line for every event that was clicked. Calls fade out.
function lineClicked(event) {
  fadeOut(event.target, 1);
}

// Reduces that opacity and sets it, and keeps doing it every frame for as long as opacity is greater than zero.
function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style["opacity"] = opacity;
  if (opacity > 0) {
    requestAnimationFrame(function () {
      fadeOut(element, opacity);
    });
    // As soon as it is zero, it'll start the fade in process.
  } else {
    setNewLine(element);
    fadeIn(element, 0);
  }
}

// Keeps adding to opacity until opacity is back to 1.
function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style["opacity"] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  }
}

// Works out which element it was and sets a new line.
function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  } else if (element === line2P) {
    element.innerText = random(sevenSyllableLines);
  }
}

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index]; // Returns element at position in the array.
}
