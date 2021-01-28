"use strict";
// Visuals variables.
let bulbasaurimage;
let bulbasaursilhouetteimage;
let charizardimage;
let charizardsilhouetteimage;
let squirtleimage;
let squirtlesilhouetteimage;
let pikachuimage;
let pikachusilhouetteimage;

// Start time.
let starttimecounter = 0;
let starttimeleft = 0;

// Game time.
let gametimecounter = 0;

let guess = undefined;

// Starting State Variable.
let state = "titlemenu";

const pokemons = [
  // Constant of pokemons.
  "bulbasaur",
  "charizard",
  "squirtle",
  "pikachu",
  // "mewtwo",
  // "tyranitar",
  // "lugia",
  // "gardevoir",
  // "rayquaza",
  // "lucario",
  // "zoroark",
  // "greninja",
  // "mimikyu",
  // "cinderace",
];

let currentPokemon = ""; // Decides current pokemon.
let currentAnswer = "";

// Preload Function.
function preload() {
  // Visuals.
  bulbasaurimage = loadImage("assets/images/bulbasaur.png");
  bulbasaursilhouetteimage = loadImage("assets/images/bulbasaursilhouette.png");
  charizardimage = loadImage("assets/images/charizard.png");
  charizardsilhouetteimage = loadImage("assets/images/charizardsilhouette.png");
  squirtleimage = loadImage("assets/images/squirtle.png");
  squirtlesilhouetteimage = loadImage("assets/images/squirtlesilhouette.png");
  pikachuimage = loadImage("assets/images/pikachu.png");
  pikachusilhouetteimage = loadImage("assets/images/pikachusilhouette.png");
}

function setup() {
  createCanvas(1200, 600);

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
  background(200);

  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "game") {
    game();
  }
}

function titlemenu() {
  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text("WHO'S THAT POKEMON?", 600, 300);
  pop();
}

// Game Menu.
function game() {
  // Start Timer.
  if (starttimecounter == 60) {
    starttimecounter = 0;
    starttimeleft--;
  }
  starttimecounter++;

  if (currentPokemon == "bulbasaur") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(bulbasaursilhouetteimage, width / 2, height / 2, 300, 300);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(bulbasaurimage, width / 2, height / 2, 300, 300);
      pop();
    }
  }

  if (currentPokemon == "charizard") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(charizardsilhouetteimage, width / 2, height / 2, 500, 500);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(charizardimage, width / 2, height / 2, 500, 500);
      pop();
    }
  }

  if (currentPokemon == "squirtle") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(squirtlesilhouetteimage, width / 2, height / 2, 300, 300);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(squirtleimage, width / 2, height / 2, 300, 300);
      pop();
    }
  }

  if (currentPokemon == "pikachu") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(pikachusilhouetteimage, width / 2, height / 2, 300, 300);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(pikachuimage, width / 2, height / 2, 300, 300);
      pop();
    }
  }

  if (guess == true) {
    push();
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(255);
    text(
      "Correct, it was " +
        currentPokemon +
        "! Press space to generate a new pokemon.",
      600,
      550
    );
    pop();
  } else if (guess == false) {
    push();
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(255);
    text(
      "Wrong, it was " +
        currentPokemon +
        "! Press space to generate a new pokemon.",
      600,
      550
    );
    pop();
  }
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 32) {
      state = "game";
      starttimeleft = 1;
    }
  }
  if (state === "game") {
    if (starttimeleft <= 0) {
      if (keyCode == 32) {
        guess = undefined;
        currentPokemon = random(pokemons); // gets random value from pokemon array.
        let reversePokemon = reverseString(currentPokemon); // sends current pokemon to reverse string.
        responsiveVoice.speak(reversePokemon); // responds with reverse of pokemon.
      }
    }
  }
}

function guessPokemon(pokemon) {
  // Will pass the pokemon 'word' into parameter.
  currentAnswer = pokemon.toLowerCase(); // Converts to lower case.

  if (currentAnswer == currentPokemon) {
    guess = true;
  } else {
    guess = false;
  }
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
