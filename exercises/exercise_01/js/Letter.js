class Letter {
  constructor(x, y, font) {
    this.x = x;
    this.y = y;
    this.font = font;
    this.angle = 0;
    this.size = 60;
    this.hover = false;
  }

  update() {
    // Update method call display method.
    this.display();
  }
  display() {
    push();
    translate(this.x, this.y);
    textAlign(CENTER, CENTER);
    rotate(this.angle);
    textFont(this.font);
    textSize(this.size);
    fill(textred.r, textred.g, textred.b);
    text("R", 0, 0);
    pop();
  }

  overlap(x, y) {
    if (
      x > this.x - -this.size / 2 && // if mouse x is greater than left hand side of sausage dog minus half the width will give edge of sausagfe dog.
      x < this.x + -this.size / 2 && // right side.
      y > this.y - -this.size / 2 && // top.
      y < this.y + -this.size / 2 // bottom.)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
