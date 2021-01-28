// remembers username.

"use strict";

let userData = {
  name: "stranger",
};

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  background(255);

  push();
  textSize(64);
  textAlign(CENTER);
  text(`Hello, ${userData.name}!`, width / 2, height / 2);
  pop();
}
