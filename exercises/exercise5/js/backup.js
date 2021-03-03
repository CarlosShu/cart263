"use strict";

// Preload function.
function preload() {
  // JSON.
  anagramsData = loadJSON("assets/data/anagrams.json");
}

let line1 = random(anagramsData.anagrams);

let line1P = document.getElementById("line1");

line1P.innerText = line1;

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index]; // Returns element at position in the array.
}
