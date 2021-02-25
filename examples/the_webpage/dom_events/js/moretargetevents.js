let mainHeading = document.getElementById("main-heading");
let subHeading = document.getElementById("sub-heading");
let paragraph = document.getElementById("paragraph");

mainHeading.addEventListener("click", setRedTextColor);
subHeading.addEventListener("click", setRedTextColor);
paragraph.addEventListener("click", setRedTextColor);

function setRedTextColor(event) {
  event.target.style["color"] = "#ff0000";
}
