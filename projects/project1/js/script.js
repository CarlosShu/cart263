"use strict";

/**************************************************
Project 1: A Night at the Movies
Carlos-Enrique Salazar Aguilar

A re-telling of the classic Twilight Zone Episode "It's a Good Life".

Credit:
Typewriter Code - https://gist.github.com/mjvo/2dce29799eb75b7ee1a571380f12ef1b
Fade Effects and Others - https://editor.p5js.org/remarkability/sketches/rtM08miUD

As well as to people who helped me in the class' discord.
**************************************************/
// JSON variables.
let panelsData;

// Sounds variables.
let screamsound;
let magic1sound;
let magic2sound;
let messagesound;
let settingsound;
let dogsound;
let wooshsound;
let unwrapsound;
let chugsound;
let swoopsound;
let bang1sound;
let bang2sound;
let bang3sound;
let glasssound;

// Music variables.
let intromusic;
let explanationmusic;
let outdoormusic;
let horrormusic;
let partymusic;
let pianomusic;
let suspensemusic;
let endmusic;

// Font variable.
let courierfont;

// Visuals variables.
let backgroundimage;
let headerimage;
let titleimage;
let endimage;
let effectimage;

// FPS variable.
let fr = 15;

// Fade variables.
var fade;
var fadeAmount = 15;

// State Variable.
let state = "titlemenu";

// Number Variables.
let counter = 0;

// Panel time.
let paneltimecounter = 0;
let paneltimeleft = 0;

// Sentence starts at zero characters. Ettiene helped.
let n = 0;

// Array of panel images variables.
let panelimage = [];

// Panel number, loads from JSON.
let panel = [];

// Curent Panel number variable.
let currentPanel = 1;

// Current Slide number variable.
let currentSlide = 0;

// Preload function.
function preload() {
  // JSON.
  panelsData = loadJSON("assets/data/panels.json"); // Loads JSON.

  // Sounds.
  screamsound = loadSound("assets/sounds/sounds/scream.mp3");
  magic1sound = loadSound("assets/sounds/sounds/magic1.wav");
  magic2sound = loadSound("assets/sounds/sounds/magic2.wav");
  messagesound = loadSound("assets/sounds/sounds/message.wav");
  settingsound = loadSound("assets/sounds/sounds/setting.wav");
  dogsound = loadSound("assets/sounds/sounds/dog.wav");
  wooshsound = loadSound("assets/sounds/sounds/woosh.wav");
  unwrapsound = loadSound("assets/sounds/sounds/unwrap.wav");
  chugsound = loadSound("assets/sounds/sounds/chug.wav");
  swoopsound = loadSound("assets/sounds/sounds/swoop.wav");
  bang1sound = loadSound("assets/sounds/sounds/bang1.wav");
  bang2sound = loadSound("assets/sounds/sounds/bang2.wav");
  bang3sound = loadSound("assets/sounds/sounds/bang3.wav");
  glasssound = loadSound("assets/sounds/sounds/glass.mp3");

  // Music.
  intromusic = loadSound("assets/sounds/music/intro.wav");
  explanationmusic = loadSound("assets/sounds/music/explanation.wav");
  outdoormusic = loadSound("assets/sounds/music/outdoor.wav");
  horrormusic = loadSound("assets/sounds/music/horror.wav");
  partymusic = loadSound("assets/sounds/music/party.wav");
  pianomusic = loadSound("assets/sounds/music/piano.wav");
  suspensemusic = loadSound("assets/sounds/music/suspense.wav");
  endmusic = loadSound("assets/sounds/music/end.wav");

  // Font.
  courierfont = loadFont("assets/courier.otf"); // Practically the Nintendo Logo Font.

  // Visuals.
  backgroundimage = loadImage("assets/images/background.png");
  headerimage = loadImage("assets/images/header.png");
  titleimage = loadImage("assets/images/title.png");
  endimage = loadImage("assets/images/end.png");
  effectimage = loadImage("assets/images/effect.png");

  // Visual Panels.
  panelimage[1] = loadImage("assets/images/panels/01.gif");
  panelimage[2] = loadImage("assets/images/panels/02.png");
  panelimage[3] = loadImage("assets/images/panels/03.png");
  panelimage[4] = loadImage("assets/images/panels/04.png");
  panelimage[5] = loadImage("assets/images/panels/05.png");
  panelimage[6] = loadImage("assets/images/panels/06.png");
  panelimage[7] = loadImage("assets/images/panels/07.png");
  panelimage[8] = loadImage("assets/images/panels/08.png");
  panelimage[9] = loadImage("assets/images/panels/09.png");
  panelimage[10] = loadImage("assets/images/panels/10.png");
  panelimage[11] = loadImage("assets/images/panels/11.png");
  panelimage[12] = loadImage("assets/images/panels/12.png");
  panelimage[13] = loadImage("assets/images/panels/13.png");
  panelimage[14] = loadImage("assets/images/panels/14.png");
  panelimage[15] = loadImage("assets/images/panels/15.png");
  panelimage[16] = loadImage("assets/images/panels/16.png");
  panelimage[17] = loadImage("assets/images/panels/17.png");
  panelimage[18] = loadImage("assets/images/panels/18.png");
  panelimage[19] = loadImage("assets/images/panels/19.png");
  panelimage[20] = loadImage("assets/images/panels/20.png");
  panelimage[21] = loadImage("assets/images/panels/21.png");
  panelimage[22] = loadImage("assets/images/panels/22.png");
  panelimage[23] = loadImage("assets/images/panels/23.png");
  panelimage[24] = loadImage("assets/images/panels/24.png");
  panelimage[25] = loadImage("assets/images/panels/25.png");
  panelimage[26] = loadImage("assets/images/panels/26.png");
  panelimage[27] = loadImage("assets/images/panels/27.png");
  panelimage[28] = loadImage("assets/images/panels/28.png");
  panelimage[29] = loadImage("assets/images/panels/29.png");
  panelimage[30] = loadImage("assets/images/panels/30.png");
  panelimage[31] = loadImage("assets/images/panels/31.gif");
  panelimage[32] = loadImage("assets/images/panels/32.png");
  panelimage[33] = loadImage("assets/images/panels/33.gif");
  panelimage[34] = loadImage("assets/images/panels/34.png");
  panelimage[35] = loadImage("assets/images/panels/35.png");
  panelimage[36] = loadImage("assets/images/panels/36.png");
  panelimage[37] = loadImage("assets/images/panels/37.png");
  panelimage[38] = loadImage("assets/images/panels/38.png");
  panelimage[39] = loadImage("assets/images/panels/39.png");
  panelimage[40] = loadImage("assets/images/panels/40.png");
  panelimage[41] = loadImage("assets/images/panels/41.png");
}

function setup() {
  createCanvas(900, 700);

  // No cursor.
  noCursor();

  // No Smoothing.
  noSmooth();

  // FPS.
  frameRate(fr);

  // Fade.
  fade = 0;
}

function draw() {
  background(backgroundimage);

  // States.
  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "instructions") {
    instructions();
  } else if (state === "movie") {
    movie();
  } else if (state === "end") {
    endmenu();
  }
}

// Title Menu function.
function titlemenu() {
  // Title.
  push();
  imageMode(CENTER);
  image(titleimage, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  // Press Enter.
  if (counter >= 10) {
    push();
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text("Press Enter", width / 2, 650);
    pop();
  }
  if (counter == 15) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

// Instructions function.
function instructions() {
  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  // Instructions.
  push();
  textAlign(CENTER, CENTER);
  textFont(courierfont);
  textSize(25);
  fill(255, 255, 255);
  text("Use SPACE to navigate between slides!", width / 2, height / 2);
  pop();
}

// Movie.
function movie() {
  // The current panel image.
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panelimage[currentPanel], width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  // Text gets placed in the center.
  if (
    currentPanel == 8 ||
    currentPanel == 15 ||
    currentPanel == 19 ||
    currentPanel == 37
  ) {
    // The Current text displayed.
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(
      panelsData.panels[currentPanel][currentSlide].substring(0, n),
      width / 2,
      height / 2
    );
  } else {
    // The Current text displayed.
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(
      panelsData.panels[currentPanel][currentSlide].substring(0, n),
      width / 2,
      625
    );
  }

  // Typewriter code.
  if (n < panelsData.panels[currentPanel][currentSlide].length) {
    n++;
  } else {
    n = panelsData.panels[currentPanel][currentSlide].length;
  }

  // Image fade effect.
  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  // Special effects for specific slides.
  if (
    (currentPanel == 10 && currentSlide == 2) ||
    (currentPanel == 14 && currentSlide == 2) ||
    (currentPanel == 30 && currentSlide == 0)
  ) {
    if (paneltimecounter >= 3 && paneltimecounter < 5) {
      // The current panel image.
      push();
      imageMode(CENTER);
      blendMode(OVERLAY);
      image(effectimage, width / 2, height / 2, width, height);
      pop();
    } else if (paneltimecounter >= 7 && paneltimecounter < 9) {
      // The current panel image.
      push();
      imageMode(CENTER);
      blendMode(OVERLAY);
      image(effectimage, width / 2, height / 2, width, height);
      pop();
    } else if (paneltimecounter >= 11 && paneltimecounter < 13) {
      // The current panel image.
      push();
      imageMode(CENTER);
      blendMode(OVERLAY);
      image(effectimage, width / 2, height / 2, width, height);
      pop();
      // The current panel image.
      push();
      imageMode(CENTER);
      blendMode(OVERLAY);
      image(effectimage, width / 2, height / 2, width, height);
      pop();
    } else if (paneltimecounter == 15) {
      // The current panel image.
      push();
      imageMode(CENTER);
      blendMode(OVERLAY);
      image(effectimage, width / 2, height / 2, width, height);
      pop();
      // The current panel image.
      push();
      imageMode(CENTER);
      blendMode(OVERLAY);
      image(effectimage, width / 2, height / 2, width, height);
      pop();
    }
  }

  // Panel 23 effect.
  if (currentPanel == 23 && currentSlide == 2) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      paneltimeleft = 1;
    }
  }

  // Panel 24 effect.
  if (currentPanel == 24 && currentSlide == 0) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      // Plays sound.
      bang1sound.play();
      // Music.
      suspensemusic.play();
    }
  }

  // Panel 30 effect.
  if (currentPanel == 30 && currentSlide == 0) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      paneltimeleft = 2;
      // Plays sound.
      magic2sound.play();
      // Music.
      horrormusic.play();
    }
  }

  // Panel 31 effect.
  if (currentPanel == 31 && currentSlide == 0) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      paneltimeleft = 2;
      // Plays sound.
      screamsound.play();
    }
  }

  // Panel 32 effect.
  if (currentPanel == 32 && currentSlide == 0) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      paneltimeleft = 3;
    }
  }

  // Panel 33 effect.
  if (currentPanel == 33 && currentSlide == 0) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      paneltimeleft = 3;
    }
  }

  // Panel 35 effect.
  if (currentPanel == 35 && currentSlide == 0) {
    if (paneltimeleft <= 0) {
      currentPanel = currentPanel + 1;
      currentSlide = 0;
      paneltimeleft = 3;
    }
  }

  // Panel Timer.
  if (paneltimecounter == 15) {
    paneltimecounter = 0;
    paneltimeleft--;
  }
  paneltimecounter++;
}

// End Menu function.
function endmenu() {
  // End.
  push();
  imageMode(CENTER);
  image(endimage, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to instructions.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "instructions";

      // Sound effect.
      messagesound.play();
    }
  }

  // Switch from Instructions to Movie.
  if (state === "instructions") {
    if (keyCode == 32) {
      state = "movie";
      currentSlide = 0;
      currentPanel = 1;
      fade = 0;
      // Sound effect.
      messagesound.play();

      // Music.
      intromusic.play();
    }
  }

  // Movie.
  if (keyCode == 32) {
    if (state === "movie") {
      // Sound player for specific slides.
      if (currentPanel == 1 && currentSlide == 3) {
        if (n == panelsData.panels[1][3].length) {
          // Music.
          intromusic.stop();
          explanationmusic.play();
        }
      }
      if (currentPanel == 7 && currentSlide == 4) {
        if (n == panelsData.panels[7][4].length) {
          // Plays sound.
          settingsound.play();
          // Music.
          explanationmusic.stop();
        }
      }
      if (currentPanel == 8 && currentSlide == 0) {
        if (n == panelsData.panels[8][0].length) {
          // Music.
          outdoormusic.play();
        }
      }
      if (currentPanel == 10 && currentSlide == 1) {
        if (n == panelsData.panels[10][1].length) {
          // Plays sound.
          magic1sound.play();
        }
      }

      if (currentPanel == 13 && currentSlide == 2) {
        if (n == panelsData.panels[13][2].length) {
          // Plays sound.
          dogsound.play();
        }
      }

      if (currentPanel == 13 && currentSlide == 3) {
        if (n == panelsData.panels[13][3].length) {
          // Plays sound.
          dogsound.play();
        }
      }

      if (currentPanel == 14 && currentSlide == 0) {
        if (n == panelsData.panels[14][0].length) {
          // Plays sound.
          dogsound.play();
        }
      }

      if (currentPanel == 14 && currentSlide == 1) {
        if (n == panelsData.panels[14][1].length) {
          // Plays sound.
          magic1sound.play();
        }
      }

      if (currentPanel == 14 && currentSlide == 5) {
        if (n == panelsData.panels[14][5].length) {
          // Plays sound.
          settingsound.play();
          // Music.
          outdoormusic.stop();
        }
      }

      if (currentPanel == 15 && currentSlide == 0) {
        if (n == panelsData.panels[15][0].length) {
          // Music.
          partymusic.play();
        }
      }

      if (currentPanel == 16 && currentSlide == 1) {
        if (n == panelsData.panels[16][1].length) {
          // Plays sound.
          unwrapsound.play();
        }
      }
      if (currentPanel == 18 && currentSlide == 1) {
        if (n == panelsData.panels[18][1].length) {
          // Plays sound.
          settingsound.play();
          // Music.
          partymusic.stop();
        }
      }
      if (currentPanel == 19 && currentSlide == 0) {
        if (n == panelsData.panels[19][0].length) {
          // Music.
          pianomusic.play();
        }
      }
      if (currentPanel == 20 && currentSlide == 0) {
        if (n == panelsData.panels[20][0].length) {
          // Plays sound.
          chugsound.play();
        }
      }
      if (currentPanel == 21 && currentSlide == 0) {
        if (n == panelsData.panels[21][0].length) {
          // Plays sound.
          swoopsound.play();
        }
      }
      if (currentPanel == 22 && currentSlide == 3) {
        if (n == panelsData.panels[22][3].length) {
          // Plays sound.
          swoopsound.play();
          // Music.
          pianomusic.stop();
        }
      }
      if (currentPanel == 23 && currentSlide == 1) {
        if (n == panelsData.panels[23][1].length) {
          // Plays sound.
          glasssound.play();
        }
      }
      if (currentPanel == 25 && currentSlide == 2) {
        if (n == panelsData.panels[25][2].length) {
          // Plays sound.
          bang1sound.play();
        }
      }
      if (currentPanel == 26 && currentSlide == 1) {
        if (n == panelsData.panels[26][1].length) {
          // Plays sound.
          bang2sound.play();
        }
      }
      if (currentPanel == 27 && currentSlide == 3) {
        if (n == panelsData.panels[27][3].length) {
          // Plays sound.
          bang3sound.play();
        }
      }
      if (currentPanel == 28 && currentSlide == 1) {
        if (n == panelsData.panels[28][1].length) {
          // Plays sound.
          bang1sound.play();
        }
      }
      if (currentPanel == 29 && currentSlide == 1) {
        if (n == panelsData.panels[29][1].length) {
          // Plays sound.
          magic2sound.play();
          // Music.
          suspensemusic.stop();
        }
      }
      if (currentPanel == 36 && currentSlide == 1) {
        if (n == panelsData.panels[36][1].length) {
          // Plays sound.
          settingsound.play();
          // Music.
          horrormusic.stop();
        }
      }
      if (currentPanel == 37 && currentSlide == 0) {
        if (n == panelsData.panels[37][0].length) {
          // Music.
          endmusic.play();
        }
      }
      if (currentPanel == 38 && currentSlide == 1) {
        if (n == panelsData.panels[38][1].length) {
          // Plays sound.
          bang1sound.play();
        }
      }
      if (currentPanel == 39 && currentSlide == 3) {
        if (n == panelsData.panels[39][3].length) {
          // Plays sound.
          swoopsound.play();
        }
      }

      // Final panel.
      if (currentPanel == 41 && currentSlide == 4) {
        if (n == panelsData.panels[41][4].length) {
          state = "end";
        }
      }

      // Switches to next slide.
      if (n == panelsData.panels[currentPanel][currentSlide].length) {
        if (paneltimeleft <= 0) {
          // Current Sldie;
          currentSlide = currentSlide + 1;
          n = 0;

          // Slide effects.
          if (n == panelsData.panels[10][1].length) {
            paneltimeleft = 3;
          }
          if (n == panelsData.panels[14][1].length) {
            paneltimeleft = 3;
          }
        }
      }

      // If it's the last slide it'll switch over to the next panel.
      if (currentSlide == panelsData.panels[currentPanel].length) {
        if (paneltimeleft <= 0) {
          // Panel effects.
          if (currentSlide == panelsData.panels[29].length) {
            paneltimeleft = 3;
          }

          // Current Panel.
          currentPanel = currentPanel + 1;
          currentSlide = 0;
          fade = 0;
        }
      }
    }
  }
}
