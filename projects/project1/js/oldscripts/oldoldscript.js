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

// Slide 2.
var slide1_01 = "You're travelling to another dimension...";
var slide1_02 = "One not only of sight and sound but of mind...";
var slide1_03 = "Your next stop...";
var slide1_04 = "The Twilight Zone...";

// Slide 2.
var slide2_01 = "Hello, my name is Rob Sterling.";
var slide2_02 =
  "In tonight's story, we'll be exploring a little Town called Peaksville.";
var slide2_03 =
  "You see, not too long ago, Peaksville was isolated from the rest of the world...";

// Slide 3.
var slide3_01 =
  "Its inhabitants were never sure what happened to everyone else...";
var slide3_02 =
  "...they were however sure of one thing, the cause. A Monstern had arrived.";

// Slide 4.
var slide4_01 =
  "With one fell swoop he took away all technology simply because it displeased him...";
var slide4_02 = "and he reduced humanity back into the dark ages...";

// Slide 5.
var slide5_01 =
  "Now, I'd like to introduce you to some of the residents in Peaksville.";
var slide5_02 = "These are Mr. and Ms. Fremont, they house the Monster.";

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
    text(slide1_01.substring(0, n), width / 2, 625);

    if (n < slide1_01.length) {
      n++;
    } else {
      n = slide1_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide1_02.substring(0, n), width / 2, 625);

    if (n < slide1_02.length) {
      n++;
    } else {
      n = slide1_02.length;
    }
  } else if (slide == 3) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide1_03.substring(0, n), width / 2, 625);

    if (n < slide1_03.length) {
      n++;
    } else {
      n = slide1_03.length;
    }
  } else if (slide == 4) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide1_04.substring(0, n), width / 2, 625);

    if (n < slide1_04.length) {
      n++;
    } else {
      n = slide1_04.length;
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
    text(slide2_01.substring(0, n), width / 2, 625);

    if (n < slide2_01.length) {
      n++;
    } else {
      n = slide2_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide2_02.substring(0, n), width / 2, 625);

    if (n < slide2_02.length) {
      n++;
    } else {
      n = slide2_02.length;
    }
  } else if (slide == 3) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide2_03.substring(0, n), width / 2, 625);

    if (n < slide2_03.length) {
      n++;
    } else {
      n = slide2_03.length;
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
    text(slide3_01.substring(0, n), width / 2, 625);

    if (n < slide3_01.length) {
      n++;
    } else {
      n = slide3_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide3_02.substring(0, n), width / 2, 625);

    if (n < slide3_02.length) {
      n++;
    } else {
      n = slide3_02.length;
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
    text(slide4_01.substring(0, n), width / 2, 625);

    if (n < slide4_01.length) {
      n++;
    } else {
      n = slide4_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide4_02.substring(0, n), width / 2, 625);

    if (n < slide4_02.length) {
      n++;
    } else {
      n = slide4_02.length;
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
    text(slide5_01.substring(0, n), width / 2, 625);

    if (n < slide5_01.length) {
      n++;
    } else {
      n = slide5_01.length;
    }
  } else if (slide == 2) {
    textAlign(CENTER, CENTER);
    textFont(courierfont);
    textSize(18);
    fill(255, 255, 255);
    text(slide5_02.substring(0, n), width / 2, 625);

    if (n < slide5_02.length) {
      n++;
    } else {
      n = slide5_02.length;
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
      if (n == slide1_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches to next slide.
    if (slide == 2) {
      if (n == slide1_02.length) {
        if (keyCode == 32) {
          slide = 3;
          n = 0;
        }
      }
    }
    // Switches to next slide.
    if (slide == 3) {
      if (n == slide1_03.length) {
        if (keyCode == 32) {
          slide = 4;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 4) {
      if (n == slide1_04.length) {
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
      if (n == slide2_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches to next slide.
    if (slide == 2) {
      if (n == slide2_02.length) {
        if (keyCode == 32) {
          slide = 3;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 3) {
      if (n == slide2_03.length) {
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
      if (n == slide3_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }

    // Switches last slide to next Panel.
    if (slide == 2) {
      if (n == slide3_02.length) {
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
      if (n == slide4_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 2) {
      if (n == slide4_02.length) {
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

  // Panel 05.
  if (state === "panel_05") {
    // Switches to next slide.
    if (slide == 1) {
      if (n == slide5_01.length) {
        if (keyCode == 32) {
          slide = 2;
          n = 0;
        }
      }
    }
    // Switches last slide to next Panel.
    if (slide == 2) {
      if (n == slide5_02.length) {
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
