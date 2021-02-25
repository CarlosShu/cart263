let textInput = document.getElementById(`example-text-input`);

textInput.addEventListener(`keydown`, function (event) {
  // Check if they hit return
  if (event.keyCode === 13) {
    // Show the content of the text input
    let input = event.target.value;
    alert(input);
  }
});
