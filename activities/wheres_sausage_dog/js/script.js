"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  // i starts at 0, while i is less than num_animal_images i will go up by 1.

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the animals.
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width); // random x position.
    let y = random(0, height); // random y position.
    let animalImage = random(animalImages); // animal image number.
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  background(255, 255, 0);

  for (let i = 0; i < animals.length; i++) {
    // dynamically calculated.

    animals[i].update(); // calls update method.
  }

  sausageDog.update();
}

function mousePressed() {
  sausageDog.mousePressed(); // mouse pressed within sausage dog image.
}
