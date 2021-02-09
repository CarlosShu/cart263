function setup() {
  createCanvas(600, 300);
}

function onInput() {
  // create input box
  let inputElem = createInput("");
  inputElem.input(onInput);
  inputElem.position(0, 0);

  push();
  fill("grey");
  rectMode(CENTER);
  rect(width / 2, height / 2, 600, 100);
  pop();

  // get the text entered
  push();
  textSize(28);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  text(this.value(), width / 2, height / 2);
  pop();
}

function draw() {
  background(0);

  onInput();
}

// function setup() {
//   createCanvas(600, 300);
// }
//
// function onInput() {
//   // create input box
//   let inputElem = createInput("");
//   inputElem.input(onInput);
//   inputElem.position(width / 2, height / 2);
//
//   textSize(28);
//
//   fill("GREY");
//   strokeWeight(10);
//   rect(0, 80, 600, 100);
//
//   // get the text entered
//   fill(0, 255, 0);
//
//   text(this.value(), width / 2, height / 2);
// }
//
// function draw() {
//   background(0);
//
//   onInput();
// }
