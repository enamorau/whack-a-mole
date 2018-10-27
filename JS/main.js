$(document).ready (function(){

  var onClickMole = function(){
    var newMole = new Mole();
    console.log("4444")
    newMole.draw()
    }

$("#field").click(onClickMole);

});

