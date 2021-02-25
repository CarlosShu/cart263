let paragraph = document.getElementById("paragraph");

setInterval(blink, 500);

function blink() {
  let opacity = paragraph.style["opacity"];

  if (opacity === "1") {
    paragraph.style["opacity"] = "0";
  } else {
    paragraph.style["opacity"] = "1";
  }
}
