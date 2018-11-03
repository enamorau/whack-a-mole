$(document).ready(function() {
  $("#start-game").click(function() { // if I don't "unclick" the button it does not stop ...
  if (gameStatus == false) {
  startGame()
  $( "#start-game" ).html("stop")
  $( "#start-game" ).toggleClass(".clicked")
  }
});

});
