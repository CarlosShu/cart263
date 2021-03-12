// Makes prisoner element draggable.
$(`#prisoner`).draggable({
  // contains to prison.
  containment: "#prison",
  // prisoner gets underline when clicked.
  start: function (event, ui) {
    $(this).css("text-decoration", "underline");
  },
  // undeline removed when unclicked.
  stop: function (event, ui) {
    $(this).css("text-decoration", "none");
  },
});

// Removes prisoner when dropped into tunnel.
$(`#escape-tunnel`).droppable({
  drop: function (event, ui) {
    ui.draggable.remove();
  },
});

// can only pace on x axis.
//  axis: "x",

// // Disables draggable nature of prisoner after 5 seconds.
// setTimeout(function () {
//   $("#prisoner").draggable("disable");
// }, 5000);
