"use strict";

let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO); // Creates input or in this case webcam.
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let hand = predictions[0];
    let thumb = hand.annotations.thumb;
    let index = hand.annotations.indexFinger;

    let thumbTip = thumb[3];
    let indexTip = index[3];

    push();
    fill(255, 0, 0);
    ellipse(thumbTip[0], thumbTip[1], 10, 10);
    ellipse(indexTip[0], indexTip[1], 10, 10);
    pop();
  }
}
