/**
Exercise 07
Carlos-Enrique SalazarAguilar

Jigsaw Puzzle
*/

("use strict");

$("#jigsaw").one("mouseover", function (event) {
  $("#piece01").draggable({ snap: "#puzzle > div" });
  $("#piece02").draggable({ snap: "#puzzle > div" });
  $("#piece03").draggable({ snap: "#puzzle > div" });
  $("#piece04").draggable({ snap: "#puzzle > div" });
  $("#piece05").draggable({ snap: "#puzzle > div" });
  $("#piece06").draggable({ snap: "#puzzle > div" });
  $("#piece07").draggable({ snap: "#puzzle > div" });
  $("#piece08").draggable({ snap: "#puzzle > div" });
  $("#piece09").draggable({ snap: "#puzzle > div" });
  $("#piece10").draggable({ snap: "#puzzle > div" });
  $("#piece11").draggable({ snap: "#puzzle > div" });
  $("#piece12").draggable({ snap: "#puzzle > div" });
  $("#piece13").draggable({ snap: "#puzzle > div" });
  $("#piece14").draggable({ snap: "#puzzle > div" });
  $("#piece15").draggable({ snap: "#puzzle > div" });
  $("#piece16").draggable({ snap: "#puzzle > div" });
});

$("#puzzle > div").droppable({});

$("#solved-dialog").dialog({
  autoOpen: true,
});
