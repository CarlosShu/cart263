"use strict";

let anagram = ["elephant", "teapot", "england", "television"];

let hint = [
  "A large animal.",
  "Something that you put hot water in.",
  "A country in Europe.",
  "Something that houses channels.",
];

let current = 0;

let line1 = anagram[current];

let line1P = document.getElementById("line1");

line1P.innerText = line1;

let line2 = hint[current];

let line2P = document.getElementById("line2");

line2P.innerText = line2;

let textInput = document.getElementById(`answer`);

textInput.addEventListener(`keydown`, function (event) {
  // Check if they hit return
  if (event.keyCode === 13) {
    // Show the content of the text input
    if (event.target.value == anagram[current]) {
      alert("Correct!");
      setNewLine();
    } else {
      alert("Try again!");
    }
  }
});

// Works out which element it was and sets a new line.
function setNewLine() {
  line1P.innerText = random(anagram);
  line2P.innerText = random(hint);
}

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index]; // Returns element at position in the array.
}
