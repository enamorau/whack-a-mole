// Game functions
var gameStatus = false;

var startGame = function () {
  setTimeout(moleTimer, 1000);
  gameStatus = true;
};

var gameOver = function () {
  this.canvas = document.getElementById("field");
  this.ctx = this.canvas.getContext("2d");
  this.cumulaM = -1;
  this.molexTotal = [];
  this.moleyTotal = [];
  this.erase = ctx.clearRect(0, 0, 500, 500);
  this.setTimeout(this.erase, 10000);
  this.gameStatus = false;
  $("#start-game").html("new game ?")
  console.log("Gameover !");
  // moleTimer.i = 0
};


var preGameOver = function () {
  var canvas = document.getElementById("field");
  var ctx = canvas.getContext("2d");
  ctx.font = "100px helvetica";
  ctx.fillText(countDown(), 100, 100);
}

var countDown = function () {
  var timeleft = 5;
  var Timer = setInterval(function () {
    timeleft --
    if (timeleft <= 0) clearInterval(Timer);
    else return timeleft
  }
  , 1000);
}
// TODO creating a Gameplay object

// TODO creating a player object

function Player() {
  this.arearadius = 50;
  this.attackMoles = function () { };
}

// Mole prototype

function Mole() {
  this.canvas = document.getElementById("field");
  this.ctx = this.canvas.getContext("2d");

  this.x = moleXGenerator();
  this.y = moleYGenerator();

  this.total = 0;

  this.draw = function () {
    var img = new Image();
    img.onload = function () {
      this.ctx.drawImage(img, this.x, this.y, 34, 56);
    }.bind(this);
    img.src = "./img/1Mole.png";
    //molexTotal.push(this.x);
    //moleyTotal.push(this.y);
  };
}

var moleXGenerator = function () {
  var moleX = Math.floor(Math.random() * (500 - 34));
  return moleX;
};

var moleYGenerator = function () {
  var moleY = Math.floor(Math.random() * (500 - 56));
  return moleY;
};

// global variables

var moleId = []

var cumulaM = 0; // number of moles displayed 

var cumulaT = 0; // time to display each mole cumulated

var molexTotal = []; // X positions for each mole generated

var moleyTotal = []; // Y positions for each mole generated

var rand = Math.round(Math.random() * 500); //+ 500; Random time between each mole

// Function to check a Mole's coordinates for overlap
function MoleCoordsOK(x, y) {
  /* IMPORTANT: This loop will FAIL if:
   molexTotal.length != moleyTotal.length (both arrays should always have same number of entries)
   OR if molexTotal/moleyTotal contain OBSOLETE coordinate pairs ("whacked" moles)
  */
  /* NOTE:
   The logic of your original coordinate test was wrong. Here is
   your original boolean condition:
    if (
    ((x > (molexTotal[i] + 35)) || (x < (molexTotal[i] - 35))) &&
    ((y > (moleyTotal[i] + 50)) || (y < (moleyTotal[i] - 50)))
   )
  Compare this to the if() test below. Take the time to think through coordinate
  arithmetic. Work it out on a sheet of paper if necessary!
  */
  for (var i = 0; i < molexTotal.length; i++) {
    /*
     We use Math.abs() (abslute value) in if() test
     for convenience of comparing positive values.
     makes for a simpler boolean expression.
     General principle: formula
      Math.abs(A -B) < X
     means
      "A is within X of B"
    */
    if (
      (Math.abs(x - molexTotal[i]) < 35) &&
      (Math.abs(y - moleyTotal[i]) < 50)
    ) {
      console.log("  BAD: " + x + "," + y + " conflicts with " + molexTotal[i] + "," + moleyTotal[i])
      return false;
    }
  }
  // We checked all existing Moles, these coordinates are OK
  return true;
}


//Mole generator 


function moleTimer() {

  rand = Math.round(Math.random() * 1000) + 500;
  var newMole = new Mole();

  // Case 1: no Moles drawn yet, we know we can draw this one
  if (cumulaM == 0) {
    console.log("*** first Mole");
    newMole.draw();
    cumulaT += rand;
    cumulaM++;
    molexTotal.push(newMole.x);
    moleyTotal.push(newMole.y);
    setTimeout(moleTimer, rand);
  }
  else {
    // Case 2: find coordinates that do not overlap any existing Mole
    console.log(cumulaM)
    var draw = true;
    // LOOP: Test coordinates, keep regenerating new random-coordinates pair
    //    until we find a pair that do NOT overlap existing moles
    while (!MoleCoordsOK(newMole.x, newMole.y)) {
      console.log("  Bad coords " + newMole.x + "," + newMole.y + " - regenerating");
      newMole.x = moleXGenerator();
      newMole.y = moleYGenerator();
    }

    if (draw) {
      newMole.draw();
      cumulaT += rand;
      cumulaM++;
      molexTotal.push(newMole.x);
      moleyTotal.push(newMole.y);

      if (cumulaM >= 10) {
        preGameOver()
        setTimeout(gameOver, 1000)
      } else {
        setTimeout(moleTimer, rand);
      }
    }
  }
}


/*
  for(var i = 0; i< 10; i++) {
  if (((molexTotal[i] - newMole.x) < 50) || ((moleyTotal[i] - newMole.y) < 50))) {
   moleTimer()
   break;
  }
 }
}

else {
​
 rand = Math.round(Math.random() * 2000);
 newMole.draw();
 cumulaT += rand;
 cumulaM++;
 molexTotal.push(newMole.x)
 moleyTotal.push(newMole.y)
​
 if (cumulaM >= 10) {
  gameOver();
 } else {
  setTimeout(moleTimer, rand);
 }

}
}

*/
/*
 //click Locator !Not working!

 function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  console.log("x: " + x + " y: " + y);
 }

 // score

 var victories = 0

 function victoriesDisp() {
  var canvas = document.getElementById("field");
  var ctx = canvas.getContext("2d");
  ctx.font = "30px helvetica";
  ctx.fillText(victories, 480, 20);
 }

 // Mole killer !Not working!

 canvas.addEventListener("mousedown", function (e) {

  for (var i = 0; i < 10; i++) {
   if (
    ((getCursorPosition().x < (molexTotal[i] + 150)) && (getCursorPosition.x > (molexTotal[i] - 150))) ||
    ((getCursorPosition.y < (moleyTotal[i] + 150)) && (getCursorPosition.y > (moleyTotal[i] - 150)))
   ) {
    ctx.clearRect(molexTotal[i], moleyTotal[i], 34, 56);
    victories++;
    victoriesDisp();
   }
  }

 });

*/