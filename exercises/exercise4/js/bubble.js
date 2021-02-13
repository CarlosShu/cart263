class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.vx = 0;
    this.vy = 0;
    this.marginx = 40;
    this.marginy = 40;
    this.speed = 1;
    this.maxspeed = 1;
  }

  update() {
    // Update method call display method.
    this.movebubble();
    this.display();
  }

  movebubble() {
    this.vy = random(-this.speed, -this.maxspeed);
    let change = random(0, 100);
    if (change < 0.1) {
      this.vx = random(-this.speed, this.speed);
    }

    // Move the bubble
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain the bubble to the canvas
    this.x = constrain(this.x, -this.marginx, width + this.marginx);
    this.y = constrain(this.y, -this.marginy, height + this.marginy);

    // If bubbles leaves the canvas then new ones are generated.
    if (this.y === -this.marginy) {
      this.x = random(-this.marginx, width + this.marginx);
      this.y = height + this.marginy;
    }

    let bubbled = dist(this.x, this.y, mouseX, mouseY);
    if (state === "simulation") {
      if (mouseIsPressed) {
        if (bubbled < this.size / 1.5) {
          score = score + 1;
          this.x = random(-this.marginx, width + this.marginx);
          this.y = height + this.marginy;
          //  bubblepop.play();
        }
      }
    }
  }

  display() {
    push();
    imageMode(CENTER);
    image(bubbleimage, this.x, this.y, this.size, this.size);
    pop();
  }
}
