var data = "You're a bad man! You're a very bad man!";
var data2 = "This is a second sentence";

function setup() {
  createCanvas(400, 400);
  typeWriter(data, 0, 20, 30, 50);
  typeWriter(data2, 0, 20, 50, 500);
}

function draw() {}

function typeWriter(sentence, n, x, y, speed) {
  if (n < sentence.length) {
    text(sentence.substring(0, n + 5), x, y);
    n++;
    setTimeout(function () {
      typeWriter(sentence, n, x, y, speed);
    }, speed);
  }
}
