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
    molexTotal.push(this.x);
    moleyTotal.push(this.x);
  };
}

var moleXGenerator = function () {
  var moleX = Math.floor(Math.random() * 500);
  if (moleX > 500 - 34) return 500 - 33;
  else return moleX;
};

var moleYGenerator = function () {
  var moleY = Math.floor(Math.random() * 500);
  if (moleY > 500 - 46) return 500 - 57;
  return moleY;
};

// global variables

var cumulaM = 0; // number of moles displayed 

var cumulaT = 0; // time to display each mole cumulated

var molexTotal = []; //  X positions for each mole generated

var moleyTotal = []; //  Y positions for each mole generated

var rand = Math.round(Math.random() * 500); //+ 500; Random time between each mole

//Mole generator not working properly below 


function moleTimer() {
  console.log(cumulaM + "&" + cumulaT)
  var newMole = new Mole();

  for (var i = 0; i < 10; i++) {
    if (cumulaM == 0) {
      rand = Math.round(Math.random() * 2000); + 500;
      newMole.draw();
      cumulaT += rand;
      cumulaM++;
      setTimeout(moleTimer, rand);
      break
    }
    else if (
      ((newMole.x < (molexTotal[i] + 150)) && (newMole.x > (molexTotal[i] - 150))) ||
      ((newMole.y < (moleyTotal[i] + 150)) && (newMole.y > (moleyTotal[i] - 150)))
    ) {
      //console.log("" + molexTotal[i] + "&" + (newMole.x + 150))
      continue
    }
    else {
      rand = Math.round(Math.random() * 2000); + 500;
      newMole.draw();
      cumulaT += rand;
      cumulaM++;
      if (cumulaM >= 10) {
        gameOver();
      } else {
        setTimeout(moleTimer, rand);
      }
      break;
    }
  }
}

