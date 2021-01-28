"use strict";

const animals = [
  // Constant of animals.
  "bulbasaur",
  "charizard",
  "squirtle",
  "pikachu",
  "jigglypuff",
  "gengar",
  "eevee",
  "dragonite",
  "mewtwo",
  "mew",
  "espeon",
  "umbreon",
  "tyranitar",
  "lugia",
  "ho-oh",
  "gardevoir",
  "metagross",
  "rayquaza",
  "lucario",
  "garchomp",
  "zoroark",
  "greninja",
  "sylveon",
  "mimikyu",
  "zeraora",
  "rillaboom",
  "cinderace",
  "intelleon",
];

let currentPokemon = ""; // Decides current animal.
let currentAnswer = "";

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal,
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

function draw() {
  background(0);

  if (currentAnswer === currentPokemon) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
}

function mousePressed() {
  currentPokemon = random(animals); // gets random value from animal array.
  let reversePokemon = reverseString(currentPokemon); // sends current animal to reverse string.
  responsiveVoice.speak(reversePokemon); // responds with reverse of animal.
}

function guessAnimal(animal) {
  // Will pass the animal 'word' into parameter.
  currentAnswer = animal.toLowerCase(); // Converts to lower case.
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split("");
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join(""); // if you want a space between each character add '-'
  // Return the result
  return result;
}
