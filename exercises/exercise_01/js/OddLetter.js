class OddLetter extends Letter {
  // Extends the Letter class.
  constructor(x, y, font) {
    super(x, y, font); // passes parameters.
    this.found = false;
    this.rotationSpeed = 0.25;
    this.size = -60;
  }
  update() {
    super.update();
    if (this.found) {
      state = "won";
      this.found = false;
    }
  }

  mousePressed() {
    // has to be within font.
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
