"use strict";

let answer = ["elephant", "teapot", "england", "television"];

let hint = [
  "A large animal.",
  "Something that you put hot water in.",
  "A country in Europe.",
  "Something that houses channels.",
];

let currentNumber = 0;

// Line 1.
let line1P = document.getElementById("line1");
line1P.innerText = anagram[currentNumber];

// Line 2.
let line2P = document.getElementById("line2");
line2P.innerText = hint[currentNumber];

let textInput = document.getElementById(`answer`);

textInput.addEventListener(`keydown`, function (event) {
  // Check if they hit return
  if (event.keyCode === 13) {
    // If they get the answer right.
    if (event.target.value == answer[currentNumber]) {
      alert("Correct!");

      // Next word.
      currentNumber = currentNumber + 1;

      // Line 1.
      let line1P = document.getElementById("line1");
      line1P.innerText = anagram[currentNumber];

      // Line 2.
      let line2P = document.getElementById("line2");
      line2P.innerText = hint[currentNumber];

      // If they get the answer wrong.
    } else {
      alert("Try again!");
    }
  }
});
