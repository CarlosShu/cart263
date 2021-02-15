function setup() {
  createCanvas(400, 400);
}

function draw() {
  panel01();
}

function panel01() {
  typeWriter("You're a bad man! You're a very bad man!", 0, 20, 30, 50);
}

function typeWriter(sentence, n, x, y, speed) {
  if (n < sentence.length) {
    text(sentence.substring(0, n + 5), x, y);
    n++;
    setTimeout(function () {
      typeWriter(sentence, n, x, y, speed);
    }, speed);
  }
}
