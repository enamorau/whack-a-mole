var onClickMole = function() {
  (function loop() {
    var rand = Math.round(Math.random() * (800 - 500)) + 500;
    setTimeout(function() {
      var newMole = new Mole();
      newMole.draw();
      loop();
    }, rand);
  })();
};

$(document).ready(function() {
  $("#start-game").click(onClickMole);
});
