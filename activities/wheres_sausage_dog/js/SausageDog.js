class SausageDog extends Animal {
  // Extends the animal class.
  constructor(x, y, image) {
    super(x, y, image); // passes parameters.
    this.found = false;
    this.rotationSpeed = 0.25;
  }
  update() {
    super.update();
    if (this.found) {
      this.angle += this.rotationSpeed = 0.25;
    }
  }

  mousePressed() {
    // has to be within image.
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}

// mousePressed() {
//   // has to be within image.
//   if (
//     mouseX > this.x - this.image.width / 2 && // if mouse x is greater than left hand side of sausage dog minus half the width will give edge of sausagfe dog.
//     mouseX < this.x + this.image.width / 2 && // right side.
//     mouseY > this.y - this.image.height / 2 && // top.
//     mouseY < this.y + this.image.height / 2 // bottom.
//   ) {
//     this.found = true;
//   }
// }
