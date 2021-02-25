let slider = document.getElementById(`range-slider`);
let button = document.getElementById(`print-button`);

button.addEventListener(`click`, function (event) {
  // We can get the current value set on the slider through its .value property
  let value = slider.value;
  alert(value);
});
