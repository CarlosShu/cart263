"use strict";

/**************************************************
Project 1: A Night at the Movies
Carlos-Enrique Salazar Aguilar

A re-telling of the classic Twilight Zone Episode "It's a Good Life".
**************************************************/
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

// Number Variables.
let counter = 0;

// Panel time.
let paneltimecounter = 0;
let paneltimeleft = 0;

// Fade variables.
var fade;
var fadeAmount = 15;

// State Variable.
let state = "titlemenu";

// Sentence starts at zero characters. Ettiene helped.
let n = 0;

// Array of panel images variables.
let panelimage = [];

let panel = [];

let currentSlide = 0;

let currentPanel = 1;

function preload() {
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

  // Panel arrays.
  panel[1] = [
    "You're travelling to another dimension...",
    "One not only of sight and sound but of mind...",
    "Your next stop...",
    "The Twilight Zone.",
  ];

  panel[2] = [
    ".....",
    "Hello, my name is Rob Sterling.",
    "In tonight's story, we'll be exploring a little Town by the name of Peaksville.",
    "You see, not too long ago, Peaksville was isolated from the rest of the world...",
  ];

  panel[3] = [
    "Its inhabitants were never sure of what happened to everyone else...",
    "...they were however sure of one thing, the cause.",
    "A Monster had arrived in their town.",
  ];

  panel[4] = [
    "With one fell swoop he took away all technology simply because it displeased him...",
    "...and he reduced humanity back into the dark ages...",
  ];

  panel[5] = [
    "Now, I'd like to introduce you to some of the residents in Peaksville.",
    "These are Mr. and Ms. Fremont, they house the Monster.",
  ];

  panel[6] = [
    "The Monster can read minds, and wish away anyone whom he doesn't like.",
    "To avoid this, the residents must always cloud their heads with happy thoughts.",
  ];

  panel[7] = [
    "Oh, and I guess I forgot...",
    "This is the Monster.",
    "A Six year old named Anthony Fremont.",
    "He looks innocent, but if he looks your way you better think happy thoughts...",
    "For the mind behind him is absolutely merciless and in charge.",
  ];

  panel[8] = [`Peaksville Ohio, 1973`];

  panel[9] = [
    `"Hello Anthony, it sure is a good day today isn't it?"`,
    `"What'd you got there?"`,
  ];

  panel[10] = [
    `"I made a three-headed Gopher, but I'm tired of playing with him now."`,
    `"Gopher, you be dead!"`,
    `"......!!"`,
    `"........"`,
  ];

  panel[11] = [
    `"My- it's...."`,
    `"It's a good thing you did that!"`,
    `"You're a good boy Anthony!"`,
    `"We all love you!"`,
  ];

  panel[12] = [
    `"Woaw- I didn't see you there son!"`,
    `"Can I get you anything?"`,
    `"Dad, how come no one ever wants to play with me?"`,
  ];

  panel[13] = [
    `"Well son, don't you remember the last time you played with children?"`,
    `"You wished them all away, their parents were really upset!"`,
    `"....but they deserved it! You did a good thing that day..."`,
    `*Bark!* *Bark!*`,
  ];

  panel[14] = [
    `"That Dog, that stupid dog!"`,
    `"He doesn't like me! He's a bad a dog!"`,
    `"......!!"`,
    `"What did you do son?"`,
    `"I sent him away."`,
    `"...It's- it's a good thing you did that... you're a good boy Anthony..."`,
  ];

  panel[15] = ["Later that same day."];

  panel[16] = [
    `"As you all know, today is Dan's birthday!"`,
    `"So let's get on with opening some presents!"`,
  ];

  panel[17] = [
    `*Unwrapping presents*`,
    `"Is this Perry Como? My- I haven't heard Perry Como in years!"`,
    `"Happy Birthday Honey."`,
    `"Do you think we can play it?"`,
  ];

  panel[18] = [
    `"I don't think we should Dan, you know Anthony doesn't like singing."`,
    `"You're right, it's a good thing that I can't play it! Real good thing!"`,
  ];

  panel[19] = [`A litte while later.`];

  panel[20] = [`*Music is playing.*`];

  panel[21] = [`*Gulp* *Gulp* *Gulp*`];

  panel[22] = [
    `"You know everyone, this is really good brandy..."`,
    `"In fact, it's the last bottle that exists..."`,
    `"Once it's gone..."`,
    `"......"`,
  ];

  panel[23] = [
    `"It's my birthday today...."`,
    `"It's my birthday today and I can't even listen to good music!!"`,
  ];

  panel[24] = [`"!!!!!"`];

  panel[25] = [
    `"You....!!!"`,
    `"This is all your fault...!!"`,
    `"Because you gave birth to that monster!!"`,
  ];

  panel[26] = [`"Dan stop please!!"`, `"Just stop talking!!"`];

  panel[27] = [
    `"And you... you little murderer...!!"`,
    `"You watch yourself, because maybe... maybe someone with guts...!!"`,
    `"...will sneak up behind you and smash you upon your skull...!!"`,
    `"...and put an end to this once and for all!!"`,
  ];

  panel[28] = [`"YOU'RE A BAD MAN!!"`, `"YOU'RE A VERY BAD MAN!!"`];

  panel[29] = [
    `"WILL SOMEBODY GRAB A LAMP OR A BOTTLE OR SOMETHING!?"`,
    `"PUT AN END TO THIS NIGHTMARE WHILE HE'S FOCUSED ON ME!!"`,
  ];

  panel[30] = [`".....!!"`];

  panel[31] = [`"!!!!!"`];

  panel[32] = [`"*SCREAMING*"`];

  panel[33] = [`"....."`];

  panel[34] = [`"Send it away son!"`, `"Please son, please send it away!"`];

  panel[35] = [`"....."`];

  panel[36] = [
    `"Let this be a warning to everyone."`,
    `"You better not think bad things about me, or I'll do the same to you!"`,
  ];

  panel[37] = [`Later that night.`];

  panel[38] = [`"What's going on?"`, `"Is it- is it snowing!?"`];

  panel[39] = [
    `"Son, are you making it snow!?"`,
    `"Yes, I am."`,
    `"But that'll kill all the crops...!!"`,
    `"That'll kill all the crops and-!"`,
  ];

  panel[40] = [
    `"I mean... it's a good thing that you're making it snow!"`,
    `"It's a real good thing, and tomorrow..."`,
    `"Tomorrow's gonna be a real good day!"`,
  ];

  panel[41] = [
    `No comment here, no comment at all.`,
    `We only wanted to introduce you to one of our very special citizens.`,
    `If by any chance you ever run across Anthony Fremont...`,
    `You will know that you have entered The Twilight Zone.`,
  ];
}

function draw() {
  background(backgroundimage);

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

function instructions() {
  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

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
      panel[currentPanel][currentSlide].substring(0, n),
      width / 2,
      height / 2
    );
  } else {
    // The Current text displayed.
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(panel[currentPanel][currentSlide].substring(0, n), width / 2, 625);
  }

  // Typewriter code.
  if (n < panel[currentPanel][currentSlide].length) {
    n++;
  } else {
    n = panel[currentPanel][currentSlide].length;
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
      currentPanel = 41;
      fade = 0;
      // Sound effect.
      messagesound.play();
    }
  }

  // Movie.
  if (keyCode == 32) {
    if (state === "movie") {
      // Sound player for specific slides.
      if (currentPanel == 7 && currentSlide == 4) {
        if (n == panel[7][4].length) {
          // Plays sound.
          settingsound.play();
        }
      }
      if (currentPanel == 10 && currentSlide == 1) {
        if (n == panel[10][1].length) {
          // Plays sound.
          magic1sound.play();
        }
      }
      if (currentPanel == 13 && currentSlide == 2) {
        if (n == panel[13][2].length) {
          // Plays sound.
          dogsound.play();
        }
      }
      if (currentPanel == 13 && currentSlide == 3) {
        if (n == panel[13][3].length) {
          // Plays sound.
          dogsound.play();
        }
      }
      if (currentPanel == 14 && currentSlide == 0) {
        if (n == panel[14][0].length) {
          // Plays sound.
          dogsound.play();
        }
      }
      if (currentPanel == 14 && currentSlide == 1) {
        if (n == panel[14][1].length) {
          // Plays sound.
          magic1sound.play();
        }
      }
      if (currentPanel == 14 && currentSlide == 5) {
        if (n == panel[14][5].length) {
          // Plays sound.
          settingsound.play();
        }
      }
      if (currentPanel == 16 && currentSlide == 1) {
        if (n == panel[16][1].length) {
          // Plays sound.
          unwrapsound.play();
        }
      }
      if (currentPanel == 20 && currentSlide == 0) {
        if (n == panel[20][0].length) {
          // Plays sound.
          chugsound.play();
        }
      }
      if (currentPanel == 21 && currentSlide == 0) {
        if (n == panel[21][0].length) {
          // Plays sound.
          swoopsound.play();
        }
      }
      if (currentPanel == 22 && currentSlide == 3) {
        if (n == panel[22][3].length) {
          // Plays sound.
          swoopsound.play();
        }
      }
      if (currentPanel == 23 && currentSlide == 1) {
        if (n == panel[23][1].length) {
          // Plays sound.
          glasssound.play();
        }
      }
      if (currentPanel == 25 && currentSlide == 2) {
        if (n == panel[25][2].length) {
          // Plays sound.
          bang1sound.play();
        }
      }
      if (currentPanel == 26 && currentSlide == 1) {
        if (n == panel[26][1].length) {
          // Plays sound.
          bang2sound.play();
        }
      }
      if (currentPanel == 27 && currentSlide == 3) {
        if (n == panel[27][3].length) {
          // Plays sound.
          bang3sound.play();
        }
      }
      if (currentPanel == 28 && currentSlide == 1) {
        if (n == panel[28][1].length) {
          // Plays sound.
          bang1sound.play();
        }
      }
      if (currentPanel == 29 && currentSlide == 1) {
        if (n == panel[29][1].length) {
          // Plays sound.
          magic2sound.play();
        }
      }
      if (currentPanel == 36 && currentSlide == 1) {
        if (n == panel[36][1].length) {
          // Plays sound.
          settingsound.play();
        }
      }
      if (currentPanel == 38 && currentSlide == 1) {
        if (n == panel[38][1].length) {
          // Plays sound.
          bang1sound.play();
        }
      }
      if (currentPanel == 39 && currentSlide == 3) {
        if (n == panel[39][3].length) {
          // Plays sound.
          swoopsound.play();
        }
      }

      // Final panel.
      if (currentPanel == 41 && currentSlide == 3) {
        if (n == panel[41][3].length) {
          state = "end";
        }
      }

      // Switches to next slide.
      if (n == panel[currentPanel][currentSlide].length) {
        if (paneltimeleft <= 0) {
          // Current Sldie;
          currentSlide = currentSlide + 1;
          n = 0;

          // Slide effects.
          if (n == panel[10][1].length) {
            paneltimeleft = 3;
          }
          if (n == panel[14][1].length) {
            paneltimeleft = 3;
          }
        }
      }

      // If it's the last slide it'll switch over to the next panel.
      if (currentSlide == panel[currentPanel].length) {
        if (paneltimeleft <= 0) {
          // Panel effects.
          if (currentSlide == panel[29].length) {
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
