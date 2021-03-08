"use strict";

let current = 0;

let anagram = ["Elephant", "Teapot", "England", "Television"];

let hint = [
  "A large animal.",
  "Something that you put hot water in.",
  "A country in Europe.",
  "Something that houses channels.",
];

let line1 = random(anagram);

let line1P = document.getElementById("line1");

line1P.innerText = line1;

let line2 = random(hint);

let line2P = document.getElementById("line2");

line2P.innerText = line2;

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index]; // Returns element at position in the array.
}

let textInput = document.getElementById(`answer`);

textInput.addEventListener(`keydown`, function (event) {
  // Check if they hit return
  if (event.keyCode === 13) {
    // Show the content of the text input
    let input = event.target.value;
    alert(input);
  }
});
