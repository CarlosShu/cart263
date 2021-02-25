let mainHeading = document.getElementById("main-heading");

window.addEventListener("offline", function (event) {
  mainHeading.innerText = "...porque..?";
});

// 1.
// let paragraph = document.getElementById("paragraph");
// let originalText = paragraph.innerText;
//
// paragraph.addEventListener("mouseenter", function (event) {
//   event.target.style["color"] = "#ff0000";
// });

// 2.
// let paragraph = document.getElementById("paragraph");
// let originalText = paragraph.innerText;
//
// paragraph.addEventListener("mousenter", function (event) {
//   paragraph.innerText = "SECRET MESSAGE!!! TOAST IS GREAT!!!";
// });
//
// paragraph.addEventListener("mouseleave", function (event) {
//   paragraph.innerText = originalText;
// });

// 3.
// let paragraph = document.getElementById("paragraph");
// let originalText = paragraph.innerText;
//
// paragraph.addEventListener("contextmenu", function (event) {
//   paragraph.innerText = "SECRET MESSAGE!!! TOAST IS GREAT!!!";
// });
//
// paragraph.addEventListener("mouseleave", function (event) {
//   paragraph.innerText = originalText;
// });

// 4.
// document.addEventListener("keydown", function (event) {
//   if (event.keyCode === 32) {
//     paragraph.style["color"] = "#ff0000";
//   }
// });

// 5.
// document.addEventListener("keydown", function (event) {
//   paragraph.innerText = paragraph.innerText + event.key;
// });

// 6.
// document.addEventListener("keyup", function (event) {
//   paragraph.style["color"] = "#ff0000";
// });

// 7.
// document.addEventListener("keydown", function (event) {
//   paragraph.style["color"] = "#ff0000";
// });
//
// document.addEventListener("keyup", function (event) {
//   paragraph.style["color"] = "#000000";
// });
