"use strict";

let answer = [
  "elephant",
  "teapot",
  "england",
  "television",
  "desk",
  "white",
  "maple",
  "pencil",
  "dragon",
  "neptune",
  "apple",
  "firefly",
  "calcium",
  "mammoth",
  "honey",
  "cube",
  "biology",
  "lawyer",
  "witch",
  "oxygen",
  "soldier",
  "mouse",
  "scarf",
  "halloween",
  "february",
  "arrow",
  "floor",
  "camera",
  "sword",
  "cloud",
  "web",
  "city",
  "orange",
];

let hint = [
  "a large grey animal",
  "something that you put hot water in",
  "an English country in Europe",
  "something that houses channels",
  "something made of wood and found in a  classroom",
  "the opposite of black",
  "the type of leaf that represents Canada",
  "something that you write with",
  "a mythical zodiac animal",
  "the eight planet in the solar system",
  "a red fruit",
  "an insect that glows in the dark",
  "a mineral typically associated with milk and bones",
  "an extinct animal related to the elephant",
  "a sweet substance produced by a yellow insect",
  "a six-sided polygon",
  "the study of life",
  "a person that deals with laws in a court setting",
  "the female term for a wizzard",
  "a substance that animals need to breathe",
  "a person that fights in a war",
  "a small rodent that cats like to chase",
  "something that keeps one's neck warm during winter",
  "a type of holiday that people dress up on",
  "the shortest month of the year",
  "an ammunition for a bow",
  "the opposite of a ceiling",
  "a suit of cards which also represents luck",
  "something that one uses to capture images and videos",
  "a weapon that knights use",
  "something that floats in the sky, and also the name of a famous video game character",
  "spiders make it and people surf on it",
  "an urban setting larger than a town",
  "red mixed with yellow, also a fruit",
];

let currentNumber = 0;

let line2 = hint[currentNumber];
let line2P = document.getElementById("line2");
line2P.innerText = line2;

let textInput = document.getElementById(`answer`);
let button = document.getElementById("skip");

// Answer text.
textInput.addEventListener(`keydown`, function (event) {
  // Check if they hit return
  if (event.keyCode === 13) {
    // If they get the answer right.
    if (event.target.value == answer[currentNumber]) {
      alert("Correct!");
      // New word.
      currentNumber = currentNumber + 1;
      // New hint.
      let line2 = hint[currentNumber];
      let line2P = document.getElementById("line2");
      line2P.innerText = line2;
      // If they get the answer wrong.
    } else {
      alert("Try again!");
    }
  }
});

// Skip button.
button.addEventListener("click", function (event) {
  // New word.
  currentNumber = currentNumber + 1;
  // New hint.
  let line2 = hint[currentNumber];
  let line2P = document.getElementById("line2");
  line2P.innerText = line2;
});
