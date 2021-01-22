"use strict";

let phrase = "Hello, world!";
let saying = ""; // Track what is being said.

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  push();
  textSize(32);
  textAlign(CENTER);
  text(saying, width / 2, height / 2);
  pop();
}

function mousePressed() {
  responsiveVoice.speak(phrase, "UK English Male", {
    onstart: showSpeaking,
    onend: hideSpeaking,
  });
}

function showSpeaking() {
  saying = phrase;
}

function hideSpeaking() {
  saying = "";
}

// "use strict";
//
// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(0);
// }
//
// function mousePressed() {
//   responsiveVoice.speak(
//     "My name is Rob. Robotic Operating Buddy.",
//     "UK English Male",
//     {
//       pitch: 2,
//       rate: 0.5,
//       volume: 1,
//     }
//   );
// }
