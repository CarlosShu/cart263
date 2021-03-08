"use strict";

let state = "instructions";

let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let colors = [
  "#E74C3C",
  "#8E44AD",
  "#3498DB",
  "#1ABC9C",
  "#27AE60",
  "#F1C40F ",
  "#E67E22",
];

let score = 0;

let line1P = document.getElementById("line1");
line1P.innerText = "PRESS ANY KEY TO START";

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index]; // Returns element at position in the array.
}

document.addEventListener("keydown", function (event) {
  if (state == "instructions") {
    fadeOut(event.target, 1);
    state = "game";
    setInterval(end, 5000);
  } else if (event.key === line1P.innerText) {
    fadeOut(event.target, 1);
    score += 1;
  }
});

// Reduces that opacity and sets it, and keeps doing it every frame for as long as opacity is greater than zero.
function fadeOut(element, opacity) {
  opacity -= 0.2;
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
  opacity += 0.2;
  element.style["opacity"] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  }
}

function setNewLine(element) {
  let line1P = document.getElementById("line1");
  line1P.innerText = random(letters);
  line1P.style["color"] = random(colors);
  line1P.style["font-size"] = "10rem";
}

function end() {
  let line1P = document.getElementById("line1");
  line1P.innerText = "YOU GOT " + score + " POINTS";
  line1P.style["color"] = "#7F8C8D";
  line1P.style["font-size"] = "5rem";
}
