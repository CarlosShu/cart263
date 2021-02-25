let paragraph = document.getElementById("paragraph");

paragraph.addEventListener("click", function (event) {
  event.target.innerText = `${event.clientX}, ${event.clientY}`;
  // document.body.style["background-color"] = "#ff0000";
  // console.log(event);
});
