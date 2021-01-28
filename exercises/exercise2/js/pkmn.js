"use strict";

// Start time.
let starttimecounter = 0;
let starttimeleft = 0;

// Game time.
let gametimecounter = 0;
let gametimeleft = 0;

// Starting State Variable.
let state = "game";

const pokemons = [
  // Constant of pokemons.
  "bulbasaur",
  "charizard",
  "squirtle",
  "pikachu",
  "mewtwo",
  "tyranitar",
  "lugia",
  "gardevoir",
  "rayquaza",
  "lucario",
  "zoroark",
  "greninja",
  "mimikyu",
  "cinderace",
];

let currentPokemon = ""; // Decides current pokemon.
let currentAnswer = "";

function setup() {
  createCanvas(1200, 600);

  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "instructions") {
    instructions();
  } else if (state === "game") {
    game();
  }

  if (annyang) {
    let commands = {
      "I think it is *pokemon": guessPokemon,
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
}

function titlemenu() {
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(255);
  text("WHO'S THAT POKEMON?", 600, 300);
  pop();
}

function game() {
  if (currentAnswer === currentPokemon) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  text(currentAnswer, 600, 300);
}

function mousePressed() {
  currentPokemon = random(pokemons); // gets random value from pokemon array.
  let reversePokemon = reverseString(currentPokemon); // sends current pokemon to reverse string.
  responsiveVoice.speak(reversePokemon); // responds with reverse of pokemon.
}

function guessPokemon(pokemon) {
  // Will pass the pokemon 'word' into parameter.
  currentAnswer = pokemon.toLowerCase(); // Converts to lower case.
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
