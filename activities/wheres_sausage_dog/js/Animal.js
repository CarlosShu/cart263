class Animal {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.angle = 0;
  }

  update() {
    // Update method call display method.
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0); // Origin has been moved to translate.
    pop();
  }

  overlap(x, y) {
    if (
      x > this.x - this.image.width / 2 && // if mouse x is greater than left hand side of sausage dog minus half the width will give edge of sausagfe dog.
      x < this.x + this.image.width / 2 && // right side.
      y > this.y - this.image.height / 2 && // top.
      y < this.y + this.image.height / 2 // bottom.)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
