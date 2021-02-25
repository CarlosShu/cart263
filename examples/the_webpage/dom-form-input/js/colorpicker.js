let colorPicker = document.getElementById(`color-picker`);

// Set the background color of the document when the color
// picker is used
colorPicker.addEventListener(`input`, function (event) {
  let color = event.target.value;
  document.body.style[`background-color`] = color;
});
