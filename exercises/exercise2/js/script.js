"use strict";

/**************************************************
Who's that Pokemon?
Carlos-Enrique Salazar Aguilar

Slamina exercise.
**************************************************/

// Fonts variables.
let lemonfont;

// Global Visuals variables.
let overlayimage;

// Pokemon Visuals variables.
let bulbasaurimage;
let bulbasaursilhouetteimage;
let charizardimage;
let charizardsilhouetteimage;
let squirtleimage;
let squirtlesilhouetteimage;
let pikachuimage;
let pikachusilhouetteimage;
let jigglypuffimage;
let jigglypuffsilhouetteimage;
let gengarimage;
let gengarsilhouetteimage;
let eeveeimage;
let eeveesilhouetteimage;
let snorlaximage;
let snorlaxsilhouetteimage;
let dragoniteimage;
let dragonitesilhouetteimage;
let mewtwoimage;
let mewtwosilhouetteimage;
let cyndaquilimage;
let cyndaquilsilhouetteimage;
let pichuimage;
let pichusilhouetteimage;
let lugiaimage;
let lugiasilhouetteimage;
let rayquazaimage;
let rayquazasilhouetteimage;
let gardevoirimage;
let gardevoirsilhouetteimage;
let lucarioimage;
let lucariosilhouetteimage;
let garchompimage;
let garchompsilhouetteimage;
let zoroarkimage;
let zoroarksilhouetteimage;
let greninjaimage;
let greninjasilhouetteimage;
let incineroarimage;
let incineroarsilhouetteimage;
let mimikyuimage;
let mimikyusilhouetteimage;

// Start time.
let starttimecounter = 0;
let starttimeleft = 0;

let gamestart = false;

let guess = undefined;

// Starting State Variable.
let state = "titlemenu";

const pokemons = [
  // Constant of pokemons.
  "bulbasaur",
  "charizard",
  "squirtle",
  "pikachu",
  "jigglypuff",
  "gengar",
  "eevee",
  "snorlax",
  "dragonite",
  "mewtwo",
  "cyndaquil",
  "pichu",
  "lugia",
  "gardevoir",
  "rayquaza",
  "lucario",
  "garchomp",
  "zoroark",
  "greninja",
  "incineroar",
  "mimikyu",
];

let currentPokemon = ""; // Decides current pokemon.
let currentAnswer = "";

// Preload Function.
function preload() {
  // Fonts.
  lemonfont = loadFont("assets/lemon.otf");

  // Global Visuals.
  overlayimage = loadImage("assets/images/overlay.png");

  // Visuals.
  bulbasaurimage = loadImage("assets/images/bulbasaur.png");
  bulbasaursilhouetteimage = loadImage("assets/images/bulbasaursilhouette.png");
  charizardimage = loadImage("assets/images/charizard.png");
  charizardsilhouetteimage = loadImage("assets/images/charizardsilhouette.png");
  squirtleimage = loadImage("assets/images/squirtle.png");
  squirtlesilhouetteimage = loadImage("assets/images/squirtlesilhouette.png");
  pikachuimage = loadImage("assets/images/pikachu.png");
  pikachusilhouetteimage = loadImage("assets/images/pikachusilhouette.png");
  jigglypuffimage = loadImage("assets/images/jigglypuff.png");
  jigglypuffsilhouetteimage = loadImage(
    "assets/images/jigglypuffsilhouette.png"
  );
  gengarimage = loadImage("assets/images/gengar.png");
  gengarsilhouetteimage = loadImage("assets/images/gengarsilhouette.png");
  eeveeimage = loadImage("assets/images/eevee.png");
  eeveesilhouetteimage = loadImage("assets/images/eeveesilhouette.png");
  snorlaximage = loadImage("assets/images/snorlax.png");
  snorlaxsilhouetteimage = loadImage("assets/images/snorlaxsilhouette.png");
  dragoniteimage = loadImage("assets/images/dragonite.png");
  dragonitesilhouetteimage = loadImage("assets/images/dragonitesilhouette.png");
  mewtwoimage = loadImage("assets/images/mewtwo.png");
  mewtwosilhouetteimage = loadImage("assets/images/mewtwosilhouette.png");
  cyndaquilimage = loadImage("assets/images/cyndaquil.png");
  cyndaquilsilhouetteimage = loadImage("assets/images/cyndaquilsilhouette.png");
  pichuimage = loadImage("assets/images/pichu.png");
  pichusilhouetteimage = loadImage("assets/images/pichusilhouette.png");
  lugiaimage = loadImage("assets/images/lugia.png");
  lugiasilhouetteimage = loadImage("assets/images/lugiasilhouette.png");
  gardevoirimage = loadImage("assets/images/gardevoir.png");
  gardevoirsilhouetteimage = loadImage("assets/images/gardevoirsilhouette.png");
  rayquazaimage = loadImage("assets/images/rayquaza.png");
  rayquazasilhouetteimage = loadImage("assets/images/rayquazasilhouette.png");
  lucarioimage = loadImage("assets/images/lucario.png");
  lucariosilhouetteimage = loadImage("assets/images/lucariosilhouette.png");
  garchompimage = loadImage("assets/images/garchomp.png");
  garchompsilhouetteimage = loadImage("assets/images/garchompsilhouette.png");
  zoroarkimage = loadImage("assets/images/zoroark.png");
  zoroarksilhouetteimage = loadImage("assets/images/zoroarksilhouette.png");
  greninjaimage = loadImage("assets/images/greninja.png");
  greninjasilhouetteimage = loadImage("assets/images/greninjasilhouette.png");
  incineroarimage = loadImage("assets/images/incineroar.png");
  incineroarsilhouetteimage = loadImage(
    "assets/images/incineroarsilhouette.png"
  );
  mimikyuimage = loadImage("assets/images/mimikyu.png");
  mimikyusilhouetteimage = loadImage("assets/images/mimikyusilhouette.png");
}

function setup() {
  createCanvas(1200, 600);

  if (annyang) {
    let commands = {
      "*pokemon": guessPokemon,
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(175);

  // States.
  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "game") {
    game();
  }
}

function titlemenu() {
  // Overlay.
  push();
  imageMode(CENTER);
  image(overlayimage, width / 2, height / 2, 1200, 600);
  pop();

  // Play again.
  push();
  textAlign(CENTER, CENTER);
  textSize(60);
  textFont(lemonfont);
  fill(255);
  text("WHO'S THAT POKéMON?", 600, 300);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textSize(15);
  textFont(lemonfont);
  fill(255);
  text("Press SPACE to play!", 600, 550);
  pop();
}

// Game Menu.
function game() {
  // Overlay.
  push();
  imageMode(CENTER);
  image(overlayimage, width / 2, height / 2, 1200, 600);
  pop();

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
      image(bulbasaursilhouetteimage, width / 2, height / 2, 250, 250);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(bulbasaurimage, width / 2, height / 2, 250, 250);
      pop();
    }
  }

  if (currentPokemon == "charizard") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(charizardsilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(charizardimage, width / 2, height / 2, 400, 400);
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
      image(pikachusilhouetteimage, width / 2, height / 2, 350, 350);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(pikachuimage, width / 2, height / 2, 350, 350);
      pop();
    }
  }

  if (currentPokemon == "jigglypuff") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(jigglypuffsilhouetteimage, width / 2, height / 2, 300, 300);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(jigglypuffimage, width / 2, height / 2, 300, 300);
      pop();
    }
  }

  if (currentPokemon == "gengar") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(gengarsilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(gengarimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }

  if (currentPokemon == "eevee") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(eeveesilhouetteimage, width / 2, height / 2, 300, 300);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(eeveeimage, width / 2, height / 2, 300, 300);
      pop();
    }
  }

  if (currentPokemon == "snorlax") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(snorlaxsilhouetteimage, width / 2, height / 2, 450, 450);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(snorlaximage, width / 2, height / 2, 450, 450);
      pop();
    }
  }
  if (currentPokemon == "dragonite") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(dragonitesilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(dragoniteimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }
  if (currentPokemon == "mewtwo") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(mewtwosilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(mewtwoimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }

  if (currentPokemon == "cyndaquil") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(cyndaquilsilhouetteimage, width / 2, height / 2, 350, 350);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(cyndaquilimage, width / 2, height / 2, 350, 350);
      pop();
    }
  }

  if (currentPokemon == "pichu") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(pichusilhouetteimage, width / 2, height / 2, 250, 250);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(pichuimage, width / 2, height / 2, 250, 250);
      pop();
    }
  }

  if (currentPokemon == "lugia") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(lugiasilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(lugiaimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }
  if (currentPokemon == "gardevoir") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(gardevoirsilhouetteimage, width / 2, height / 2, 350, 350);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(gardevoirimage, width / 2, height / 2, 350, 350);
      pop();
    }
  }

  if (currentPokemon == "rayquaza") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(rayquazasilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(rayquazaimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }
  if (currentPokemon == "lucario") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(lucariosilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(lucarioimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }
  if (currentPokemon == "garchomp") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(garchompsilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(garchompimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }
  if (currentPokemon == "zoroark") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(zoroarksilhouetteimage, width / 2, height / 2, 500, 500);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(zoroarkimage, width / 2, height / 2, 500, 500);
      pop();
    }
  }
  if (currentPokemon == "greninja") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(greninjasilhouetteimage, width / 2, height / 2, 350, 350);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(greninjaimage, width / 2, height / 2, 350, 350);
      pop();
    }
  }
  if (currentPokemon == "incineroar") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(incineroarsilhouetteimage, width / 2, height / 2, 400, 400);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(incineroarimage, width / 2, height / 2, 400, 400);
      pop();
    }
  }
  if (currentPokemon == "mimikyu") {
    if (guess == undefined) {
      push();
      imageMode(CENTER);
      image(mimikyusilhouetteimage, width / 2, height / 2, 300, 300);
      pop();
    } else {
      push();
      imageMode(CENTER);
      image(mimikyuimage, width / 2, height / 2, 300, 300);
      pop();
    }
  }

  push();
  textAlign(CENTER, CENTER);
  textSize(15);
  textFont(lemonfont);
  fill(255);
  if (guess == true) {
    text(
      "Correct, it was " +
        currentPokemon +
        "! Press SPACE again to generate a new pokémon!",
      600,
      550
    );
  } else if (guess == false) {
    text(
      "Wrong, it was " +
        currentPokemon +
        "! Press SPACE again to generate a new pokémon!",
      600,
      550
    );
  } else if (guess == undefined && gamestart == false) {
    text(
      "Press SPACE to generate a pokémon and say its name to win! If you don't know what it is, just say anything to skip.",
      600,
      300
    );
  }
  pop();
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
        if (gamestart == false) {
          gamestart = true;
          guess = undefined;
          currentPokemon = random(pokemons); // gets random value from pokemon array.
        }
      }
    }
  }
}

function guessPokemon(pokemon) {
  // Will pass the pokemon 'word' into parameter.
  currentAnswer = pokemon.toLowerCase(); // Converts to lower case.

  if (currentAnswer.includes(currentPokemon) && gamestart == true) {
    if (gamestart == true) {
      gamestart = false;
      guess = true;
    }
  } else if (!currentAnswer.includes(currentPokemon) && gamestart == true) {
    if (gamestart == true) {
      gamestart = false;
      guess = false;
    }
  }
}
