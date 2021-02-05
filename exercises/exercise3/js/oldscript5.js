/**************************************************
Click & Click
Carlos-Enrique Salazar

Here is a description of this template p5 project.
**************************************************/
"use strict";

let userData = {
  name: "stranger",
};

// Fonts variable.
let droidfont;

// State.
let state = "title";

// Start time.
let starttimecounter = 0;
let starttimeleft = 0;

// Gamme time.
let gametimecounter = 0;
let gametimeleft = 5;

var usercontents = "";
var passwordcontents = "";

var userscore = 0;

var highscore = 0;

// Preload Function.
function preload() {
  // Fonts.
  droidfont = loadFont("assets/droid.ttf");
}

function setup() {
  createCanvas(1000, 500);
  noCursor();

  let data = JSON.parse(
    localStorage.getItem("web-storage-example-personalization")
  );
  if (data !== null) {
    userData.name = data.name;
  } else {
    userData.name = prompt("What's your name?"); // asks for and inputs name.
    localStorage.setItem(
      "web-storage-example-personalization",
      JSON.stringify(userData)
    );
  }
}

function draw() {
  background(0);

  if (state === "title") {
    title();
  } else if (state === "username") {
    username();
    onInput();
  } else if (state === "password") {
    password();
    onInput();
  } else if (state === "welcome") {
    welcome();
  } else if (state === "instructions") {
    instructions();
  } else if (state === "game") {
    game();
  } else if (state === "end") {
    end();
  }
}

function title() {
  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(80);
  fill(0, 255, 0);
  text("CLICK & CLICK", width / 2, height / 2);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("Press Enter to Log In / Register", width / 2, 450);
  pop();
}

function username() {
  // Start Timer.
  if (starttimecounter == 60) {
    starttimecounter = 0;
    starttimeleft--;
  }
  starttimecounter++;

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("Please Enter Your Username", width / 2, 450);
  pop();
}

function password() {
  // Start Timer.
  if (starttimecounter == 60) {
    starttimecounter = 0;
    starttimeleft--;
  }
  starttimecounter++;

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("Please Enter Your Password", width / 2, 450);
  pop();
}

function welcome() {
  // Start Timer.
  if (starttimecounter == 60) {
    starttimecounter = 0;
    starttimeleft--;
  }
  starttimecounter++;

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(30);
  fill(0, 255, 0);
  text(
    "Welcome rofl, your current highscore is " + highscore + " points",
    width / 2,
    height / 2
  );
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("Please Enter to Play", width / 2, 450);
  pop();
}

function instructions() {
  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(30);
  fill(0, 255, 0);
  text(
    "CLICK AS MANY TIMES AS YOU CAN IN UNDER 5 SECONDS",
    width / 2,
    height / 2
  );
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("CLICK TO START", width / 2, 450);
  pop();
}

function game() {
  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(30);
  fill(0, 255, 0);
  text(userscore, width / 2, height / 2);
  pop();

  // Game Timer.
  if (gametimecounter == 60) {
    gametimecounter = 0;
    gametimeleft--;
  }
  gametimecounter++;

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text(gametimeleft, width / 2, 450);
  pop();

  if (gametimeleft == 0) {
    state = "end";
  }

  if (userscore > highscore) {
    highscore = userscore;
  }
}

function end() {
  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(30);
  fill(0, 255, 0);
  text("YOU GOT " + userscore + " points", width / 2, height / 2);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(droidfont);
  textSize(20);
  fill(255, 255, 255);
  text("PRESS ENTER TO PLAY AGAIN", width / 2, 450);
  pop();
}

function onInput() {
  if (state == "username") {
    // get the text entered
    push();
    textAlign(CENTER, CENTER);
    textFont(droidfont);
    fill(0, 255, 0);
    textSize(30);
    text("**" + usercontents + "**", width / 2, height / 2);
    pop();
  } else if (state == "password") {
    // get the text entered
    push();
    textAlign(CENTER, CENTER);
    textFont(droidfont);
    fill(0, 255, 0);
    textSize(30);
    text("**" + passwordcontents + "**", width / 2, height / 2);
    pop();
  }
}

function keyTyped() {
  if ((state == "username") & (starttimeleft <= 0)) {
    usercontents += key;
  } else if ((state == "password") & (starttimeleft <= 0)) {
    passwordcontents += key;
  }
}

// Key press function.
function keyPressed() {
  // Switch from title to username screen.
  if (state === "title") {
    if (keyCode == 13) {
      starttimeleft = 1;
      state = "username";
      usercontents = "";
    }
  }
  // Username.
  else if (state === "username") {
    // If backspace is entered the user will delete their last key.
    if (keyCode == 8) {
      usercontents = "";
    }
    // If user gets username right it will switch to password screen.
    if (usercontents == userData.name) {
      if (keyCode == 13) {
        state = "password";
        starttimeleft = 1;
        passwordcontents = "";
      }
    }
  }
  // Password.
  else if (state === "password") {
    // If backspace is entered the user will delete their last key.
    if (keyCode == 8) {
      passwordcontents = "";
    }
    // If user gets username right it will switch to welcome screen.
    if (passwordcontents == "lmao") {
      if (keyCode == 13) {
        state = "welcome";
        starttimeleft = 1;
        passwordcontents = "";
      }
    }
  }
  // Switch from welcome to instruction screen.
  if (state === "welcome" && starttimeleft <= 0) {
    if (keyCode == 13) {
      starttimeleft = 1;
      state = "instructions";
    }
  }

  // Switch from end to welcome screen.
  if (state === "end") {
    if (keyCode == 13) {
      state = "welcome";
      userscore = 0;
    }
  }

  if (keyCode == 27) {
    localStorage.removeItem("web-storage-example-personalization"); // Deletes save data.
  }
}

function mousePressed() {
  if (state === "instructions") {
    state = "game";
    gametimeleft = 5;
  }
  if (state === "game") {
    userscore = userscore + 1;
  }
}
