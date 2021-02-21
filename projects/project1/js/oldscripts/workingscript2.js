"use strict";

/**************************************************
Project 1: A Night at the Movies
Carlos-Enrique Salazar Aguilar

A re-telling of the classic Twilight Zone Episode "It's a Good Life".
**************************************************/
// Font variable.
let courierfont;

// Visuals variables.
let backgroundimage;
let headerimage;
let titleimage;

// Panels variables.
let panel01image;
let panel02image;
let panel03image;
let panel04image;
let panel05image;
let panel06image;
let panel07image;
let panel08image;
let panel09image;
let panel10image;
let panel11image;
let panel12image;

// FPS variable.
let fr = 15;

// Number Variables.
let counter = 0;

// Panel time.
let paneltimecounter = 0;
let paneltimeleft = 0;

// Fade variables.
var fade;
var fadeAmount = 18;

// Fade text variables.
var fadeText;
var fadeTextAmount = 18;

// State Variable.
let state = "titlemenu";

// Sentence starts at zero characters. Ettiene helped.
let n = 0;

// Slide number.
let slide = 1;

// Dialogues.

// Slide Blank.
var slideblank_01 = "Sometime in the Year 1963...";
var slideblank_02 = "Later that day...";
var slideblank_03 = "A little while later...";
var slideblank_04 = "Later that night...";

// Slide 01.
var slide01_01 = "You're travelling to another dimension...";
var slide01_02 = "One not only of sight and sound but of mind...";
var slide01_03 = "Your next stop...";
var slide01_04 = "The Twilight Zone...";

// Slide 02.
var slide02_01 = "Hello, my name is Rob Sterling.";
var slide02_02 =
  "In tonight's story, we'll be exploring a little Town called Peaksville.";
var slide02_03 =
  "You see, not too long ago, Peaksville was isolated from the rest of the world...";

// Slide 03.
var slide03_01 =
  "Its inhabitants were never sure what happened to everyone else...";
var slide03_02 =
  "...they were however sure of one thing, the cause. A Monstern had arrived.";

// Slide 04.
var slide04_01 =
  "With one fell swoop he took away all technology simply because it displeased him...";
var slide04_02 = "and he reduced humanity back into the dark ages...";

// Slide 05.
var slide05_01 =
  "Now, I'd like to introduce you to some of the residents in Peaksville.";
var slide05_02 = "These are Mr. and Ms. Fremont, they house the Monster.";

// Slide 06.
var slide06_01 =
  "The Mnster can read minds, and wish away anyone whom he doesn't like.";
var slide06_02 =
  "To avoid this, the residents must always cloud their minds with happy thoughts.";

// Slide 07.
var slide07_01 = "This is the Monster. Six year old Anthony Fremont.";
var slide07_02 =
  "He looks innocent, but if he looks your way you better think happy thoughts...";
var slide07_03 =
  "For the mind behind him is absolutely merciless and in charge.";

// Slide 07.
var slide07_01 = "This is the Monster. Six year old Anthony Fremont.";
var slide07_02 =
  "He looks innocent, but if he looks your way you better think happy thoughts...";
var slide07_03 =
  "For the mind behind him is absolutely merciless and in charge.";

// Slide 08.
var slide08_01 = `"Hello Anthony, it sure is a good day today isn't it?"`;
var slide08_02 = `"What'd you got there?"`;

// Slide 09.
var slide09_01 = `"I made a three-headed Gopher, but I'm tired of playing with him now."`;
var slide09_02 = `"Gopher, you be dead!"`;

// Slide 10.
var slide10_01 = `"My- it's...."`;
var slide10_02 = `"It's a good thing you did that!"`;
var slide10_03 = `"We all love you Anthony!"`;

// Slide 11.
var slide11_01 = `"Woaw- I didn't see you there son!"`;
var slide11_02 = `"Can I get you anything?"`;
var slide11_03 = `"Dad, how come no one ever wants to play with me?"`;

// Slide 12.
var slide12_01 = `"Well son, don't you remember the last you played with children?"`;
var slide12_02 = `"You wished them all away, their parents were really upset!"`;
var slide12_03 = `"....but they deserved it you did a good thing that day..."`;
var slide12_04 = `*Bark!* *Bark!*`;

// Slide 13.
var slide13_01 = `"That Dog, he doesn't like me! He's a bad a dog!"`;
var slide13_02 = `"What did you do son?"`;
var slide13_03 = `"I sent him away."`;
var slide13_04 = `"...It's- it's a good thing you did that... you're a good boy Anthony..."`;

// Slide 14.
var slide14_01 = `"As you all know, today is Dan's birthday!"`;
var slide14_02 = `"So let's get on with opening some presents!"`;

// Slide 15.
var slide15_01 = `"Is this Perry Como? My- I haven't heard Perry Como in years!"`;
var slide15_02 = `"Happy Birthday Honey."`;
var slide15_03 = `"Do you think we can play it?"`;

// Slide 16.
var slide16_01 = `"I don't think we should Dan, you know Anthony doesn't like singing."`;
var slide16_02 = `"You're right, it's a good thing that I can't play it! Real good thing!"`;

// Slide 17.
var slide17_01 = `*Music is playing.*`;

// Slide 18.
var slide18_01 = `*Gulp* *Gulp* *Gulp*`;

// Slide 19.
var slide19_01 = `"You know everyone, this is really good brandy..."`;
var slide19_02 = `"In fact, it's the last bottle that exists, once it's gone..."`;
var slide19_03 = `"......"`;

// Slide 20.
var slide20_01 = `"It's my birthday today...."`;
var slide20_02 = `"It's my birthday today and I can't even listen to good music!!"`;

// Slide 22.
var slide22_01 = `"You....!!!"`;
var slide22_02 = `"This is all your fault...!!"`;
var slide22_03 = `"Because you gave birth to that monster!!"`;

// Slide 23.
var slide23_01 = `"Dan stop please!!"`;
var slide23_02 = `"Just stop talking!!"`;

// Slide 24.
var slide24_01 = `"And you... you little murderer...!!"`;
var slide24_02 = `"You watch yourself, because maybe... maybe someone with guts...!!"`;
var slide24_03 = `"...will sneak up behind you... smash you upon your skull...!!"`;
var slide24_04 = `"...and put an end to this once and for all!!"`;

// Slide 25.
var slide25_01 = `"YOU'RE A BAD MAN!!"`;
var slide25_02 = `"YOU'RE A VERY BAD MAN!!"`;

// Slide 26.
var slide26_01 = `"WILL SOMEBODY GRAB A LAMP OR A BOTTLE OR SOMETHING!?"`;
var slide26_02 = `"PUT AND END TO THIS NIGHTMARE WHILE HE'S FOCUSED ON ME!!"`;

// Slide 31.
var slide31_01 = `"Send it away son!"`;
var slide31_02 = `"Please son, please send it away!"`;

// Slide 33.
var slide33_01 = `"Let this be a warning to everyone."`;
var slide33_02 = `"You better not think bad things about me, or I'll do the same to you!"`;

// Slide 34.
var slide34_01 = `"What's going on?"`;
var slide34_02 = `"Is it- is it snowing!?"`;

// Slide 35.
var slide35_01 = `"Son, are you making it snow!?"`;
var slide35_02 = `"Yes, I am."`;
var slide35_03 = `"But that'll kill all the crops..!!"`;
var slide35_04 = `"That'll kill all the crops and-!"`;

// Slide 36.
var slide36_01 = `"I mean... it's a good thing that you're making it snow!"`;
var slide36_02 = `"It's a good thing, and tomorrow..."`;
var slide36_03 = `"Tomorrow's gonna be a real good day!"`;

// Slide 37.
var slide37_01 = `No comment here, no comment at all.`;
var slide37_02 = `We only wanted to introduce you to one of our very special citizens.`;
var slide37_03 = `If by any chance you ever run across Anthony Fremont...`;
var slide37_04 = `You will know that you have entered The Twilight Zone.`;

function preload() {
  // Font.
  courierfont = loadFont("assets/courier.otf"); // Practically the Nintendo Logo Font.

  // Visuals.
  backgroundimage = loadImage("assets/images/background.png");
  headerimage = loadImage("assets/images/header.png");
  titleimage = loadImage("assets/images/title.png");

  // Visual Panels.
  panel01image = loadImage("assets/images/panels/01.gif");
  panel02image = loadImage("assets/images/panels/02.png");
  panel03image = loadImage("assets/images/panels/03.png");
  panel04image = loadImage("assets/images/panels/04.png");
  panel05image = loadImage("assets/images/panels/05.png");
  panel06image = loadImage("assets/images/panels/06.png");
  panel07image = loadImage("assets/images/panels/07.png");
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

  // Fade Text.
  fadeText = 0;
}

function draw() {
  background(backgroundimage);

  if (state === "titlemenu") {
    titlemenu();
  } else if (state === "panel_01") {
    panel01();
  } else if (state === "panel_02") {
    panel02();
  } else if (state === "panel_03") {
    panel03();
  } else if (state === "panel_04") {
    panel04();
  } else if (state === "panel_05") {
    panel05();
  } else if (state === "panel_06") {
    panel06();
  } else if (state === "panel_07") {
    panel07();
  } else if (state === "panel_08") {
    panel08();
  } else if (state === "panel_09") {
    panel09();
  } else if (state === "panel_10") {
    panel10();
  }

  // Panel Timer.
  if (paneltimecounter == 10) {
    paneltimecounter = 0;
    paneltimeleft--;
  }
  paneltimecounter++;
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
  if (counter == 18) {
    // This only happens every second.
    counter = 0;
  }
  counter++;
}

// Panel 01.
function panel01() {
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel01image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (slide == 1) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide01_01.substring(0, n), width / 2, 625);

    if (n < slide01_01.length) {
      n++;
    } else {
      n = slide01_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide01_02.substring(0, n), width / 2, 625);

    if (n < slide01_02.length) {
      n++;
    } else {
      n = slide01_02.length;
    }
  } else if (slide == 3) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide01_03.substring(0, n), width / 2, 625);

    if (n < slide01_03.length) {
      n++;
    } else {
      n = slide01_03.length;
    }
  } else if (slide == 4) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide01_04.substring(0, n), width / 2, 625);

    if (n < slide01_04.length) {
      n++;
    } else {
      n = slide01_04.length;
    }
  }

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;
}

// Panel 02.
function panel02() {
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel02image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  if (slide == 1) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide02_01.substring(0, n), width / 2, 625);

    if (n < slide02_01.length) {
      n++;
    } else {
      n = slide02_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide02_02.substring(0, n), width / 2, 625);

    if (n < slide02_02.length) {
      n++;
    } else {
      n = slide02_02.length;
    }
  } else if (slide == 3) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide02_03.substring(0, n), width / 2, 625);

    if (n < slide02_03.length) {
      n++;
    } else {
      n = slide02_03.length;
    }
  }
}

/// Panel 03.
function panel03() {
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel03image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  if (slide == 1) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide03_01.substring(0, n), width / 2, 625);

    if (n < slide03_01.length) {
      n++;
    } else {
      n = slide03_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide03_02.substring(0, n), width / 2, 625);

    if (n < slide03_02.length) {
      n++;
    } else {
      n = slide03_02.length;
    }
  }
}

// Panel 04.
function panel04() {
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel04image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  if (slide == 1) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide04_01.substring(0, n), width / 2, 625);

    if (n < slide04_01.length) {
      n++;
    } else {
      n = slide04_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide04_02.substring(0, n), width / 2, 625);

    if (n < slide04_02.length) {
      n++;
    } else {
      n = slide04_02.length;
    }
  }
}

function panel05() {
  /// Panel 05.
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel05image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  if (slide == 1) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide05_01.substring(0, n), width / 2, 625);

    if (n < slide05_01.length) {
      n++;
    } else {
      n = slide05_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide05_02.substring(0, n), width / 2, 625);

    if (n < slide05_02.length) {
      n++;
    } else {
      n = slide05_02.length;
    }
  }
}

function panel06() {
  /// Panel 06.
  push();
  imageMode(CENTER);
  tint(255, fade);
  image(panel06image, width / 2, height / 2, width, height);
  pop();

  // Header.
  push();
  imageMode(CENTER);
  image(headerimage, width / 2, height / 2, width, height);
  pop();

  if (fade < 0) fadeAmount = 1;
  fade += fadeAmount;

  if (fadeText < 0) fadeTextAmount = 1;
  fadeText += fadeTextAmount;

  if (slide == 1) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide06_01.substring(0, n), width / 2, 625);

    if (n < slide06_01.length) {
      n++;
    } else {
      n = slide06_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide06_02.substring(0, n), width / 2, 625);

    if (n < slide06_02.length) {
      n++;
    } else {
      n = slide06_02.length;
    }
  }
}

// Keypress function.
function keyPressed() {
  // Switch from titlemenu to game.
  if (state === "titlemenu") {
    if (keyCode == 13) {
      state = "panel_01";
      fade = 0;
      fadeText = 0;
      paneltimeleft = 3;
    }
  }

  // Panel 01.
  if (state === "panel_01") {
    // Switches to next slide.
    if (slide == 1) {
      if (n == slide01_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches to next slide.
    if (slide == 2) {
      if (n == slide01_02.length) {
        if (keyCode == 32) {
          slide = 3;
          n = 0;
        }
      }
    }
    // Switches to next slide.
    if (slide == 3) {
      if (n == slide01_03.length) {
        if (keyCode == 32) {
          slide = 4;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 4) {
      if (n == slide01_04.length) {
        if (keyCode == 32) {
          state = "panel_02";
          slide = 1;
          fade = 0;
          fadeText = 0;
          paneltimeleft = 3;
          n = 0;
        }
      }
    }
  }

  // Panel 02.
  if (state === "panel_02") {
    // Switches to next slide.
    if (slide == 1) {
      if (n == slide02_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches to next slide.
    if (slide == 2) {
      if (n == slide02_02.length) {
        if (keyCode == 32) {
          slide = 3;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 3) {
      if (n == slide02_03.length) {
        if (keyCode == 32) {
          state = "panel_03";
          slide = 1;
          fade = 0;
          fadeText = 0;
          paneltimeleft = 3;
          n = 0;
        }
      }
    }
  }

  // Panel 03.
  if (state === "panel_03") {
    // Switches to next slide.
    if (slide == 1) {
      if (n == slide03_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }

    // Switches last slide to next Panel.
    if (slide == 2) {
      if (n == slide03_02.length) {
        if (keyCode == 32) {
          state = "panel_04";
          slide = 1;
          fade = 0;
          fadeText = 0;
          paneltimeleft = 3;
          n = 0;
        }
      }
    }
  }

  // Panel 04.
  if (state === "panel_04") {
    // Switches to next slide.
    if (slide == 1) {
      if (n == slide04_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 2) {
      if (n == slide04_02.length) {
        if (keyCode == 32) {
          state = "panel_05";
          slide = 1;
          fade = 0;
          fadeText = 0;
          paneltimeleft = 3;
          n = 0;
        }
      }
    }
  }

  // Panel 06.
  if (state === "panel_06") {
    // Switches to next slide.
    if (slide == 1) {
      if (n == slide06_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 2) {
      if (n == slide06_02.length) {
        if (keyCode == 32) {
          state = "panel_06";
          slide = 1;
          fade = 0;
          fadeText = 0;
          paneltimeleft = 3;
          n = 0;
        }
      }
    }
  }
}
