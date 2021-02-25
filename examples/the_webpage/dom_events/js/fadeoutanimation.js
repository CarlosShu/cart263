let paragraph = document.getElementById("paragraph");
let opacity = 1;

fadeOut();

function fadeOut() {
  opacity -= 0.01;
  paragraph.style["opacity"] = opacity;

  if (opacity > 0) {
    requestAnimationFrame(fadeOut);
  }
}
