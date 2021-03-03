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

let line1 = random(fiveSyllableLines);

let line1P = document.getElementById("line1");

line1P.innerText = line1;

// Every line has a click event that knows to call to call the Lineclicked function.
line1P.addEventListener("click", lineClicked);

// Line clicked function sets new line for every event that was clicked. Calls fade out.
function lineClicked(event) {
  setNewLine();
}

// Works out which element it was and sets a new line.
function setNewLine() {
  if (line1P) {
    line1P.innerText = random(fiveSyllableLines);
  }
}

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index]; // Returns element at position in the array.
}
