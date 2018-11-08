$(document).ready(function() {
  $("#start-game").click(function() { 
  if (gameStatus == false) {
  startGame()
  $( "#start-game" ).html("stop")
  $( "#start-game" ).toggleClass(".clicked")
  }
});

});
