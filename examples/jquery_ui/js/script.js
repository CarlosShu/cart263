$("#escape-tunnel").hide();

$(`#introduction-dialog`).dialog({
  modal: true,
  resizable: false,
  buttons: {
    Imagination: function () {
      // Disable the walls!
      $(`#prisoner`).draggable("option", "containment", "none");
      $(this).dialog("close");
    },
    "Escape Tunnel": function () {
      $("#escape-tunnel").show({ effect: "blind" });
      $(this).dialog("close");
    },
  },
});

// Prisoner shake effect.
$(`#prisoner`).effect({
  effect: "shake",
  duration: 2000,
  times: 15,
  distance: 7,
  complete: makePrisonerDraggable,
});

// Removes prisoner when dropped into tunnel.
$(`#escape-tunnel`).droppable({
  drop: function (event, ui) {
    ui.draggable.remove();
    $(this).hide({ effect: "blind", duration: 500 });
  },
});

function makePrisonerDraggable() {
  // Makes prisoner element draggable.
  $(`#prisoner`).draggable({
    // contains to prison.
    containment: "#prison",
    // adds a class.
    start: function (event, ui) {
      $(this).addClass("prisoner-dragging", 750);
    },
    // removes a class.
    stop: function (event, ui) {
      $(this).removeClass("prisoner-dragging", 750);
    },
  });
}

// can only pace on x axis.
//  axis: "x",

// // Disables draggable nature of prisoner after 5 seconds.
// setTimeout(function () {
//   $("#prisoner").draggable("disable");
// }, 5000);
