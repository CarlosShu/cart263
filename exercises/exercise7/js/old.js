/**
Exercise 07
Carlos-Enrique SalazarAguilar

Jigsaw Puzzle
*/

"use strict";

// Draggable pieces that snap to the jigsaw grid.
$("#jigsaw").one("mouseover", function (event) {
  $("#piece01").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece02").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece03").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece04").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece05").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece06").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece07").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece08").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece09").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece10").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece11").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece12").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece13").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece14").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece15").draggable({ snap: "#puzzle > div", revert: "invalid" });
  $("#piece16").draggable({ snap: "#puzzle > div", revert: "invalid" });
});

// Makes the puzzle div droppable.
$("#puzzle > div").droppable({});

// Makes the jigsaw div droppable.
$("#jigsaw").droppable({
  drop: function (event, ui) {},
});

$("#solved-dialog").dialog({
  autoOpen: true,
});
