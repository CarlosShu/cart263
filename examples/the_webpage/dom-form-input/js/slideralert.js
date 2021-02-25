let slider = document.getElementById(`range-slider`);

// Listen for changes to the slider
slider.addEventListener(`change`, function (event) {
  // Print out the current value
  let value = event.target.value;
  alert(value);
});
