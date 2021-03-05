// Shows whatever you typed in at click of button.
$(`#example-button`).on(`click`, function (event) {
  // Use .val() to get the current value in the text input
  let input = $(`#example-text-input`).val();
  alert(input);
});

// // Removes button whenever it gets clicked.
// $(`#example-button`).on(`click`, function (event) {
//   $(this).hide();
// });
