// create a game function
var gameStatus = false;

var startGame = function() {
  setTimeout(moleTimer, 1000);
  gameStatus = true;
};
var gameOver = function() {
  this.canvas = document.getElementById("field");
  this.ctx = this.canvas.getContext("2d");
  alert("Gameover !");
  this.cumulaM = 0;
  this.molexTotal = [];
  this.moleyTotal = [];
  this.ctx.clearRect(0, 0, 500, 500);
  gamestatus = false;
  moleTimer.i = 0
};

// TODO creating a Gameplay object

// TODO creating a player object

function Player() {
  this.arearadius = 50;
  this.attackMoles = function() {};
}

// TODO creating a Mole object

function Mole() {
  this.canvas = document.getElementById("field");
  this.ctx = this.canvas.getContext("2d");

  this.x = moleXGenerator();
  this.y = moleYGenerator();

  this.total = 0;

  this.draw = function() {
    var img = new Image();
    img.onload = function() {
      this.ctx.drawImage(img, this.x, this.y, 34, 56);
    }.bind(this);
    img.src = "./img/1Mole.png";
    molexTotal.push(this.x);
    moleyTotal.push(this.x);
  };
}

var moleXGenerator = function() {
  var moleX = Math.floor(Math.random() * 500);
  if (moleX > 500 - 34) return 500 - 33;
  else return moleX;
};

var moleYGenerator = function() {
  var moleY = Math.floor(Math.random() * 500);
  if (moleY > 500 - 46) return 500 - 57;
  return moleY;
};

var cumulaM = 0;

var cumulaT = 0;

var molexTotal = [];

var moleyTotal = [];

//time functions

randomTimeL1 = function() {
  var randT = Math.floor(Math.random() * 2000);

  if (randT < 1000) {
    cumulaT.push(1000);
    return 1000;
  } else {
    cumulaT.push(randT);
    return randT;
  }
};

function moleTimer() {
  var rand = Math.round(Math.random() * 500); //+ 500;
  this.i = 0
  
  do {
    var newMole = new Mole();
    i ++;
  } while (
    ((molexTotal[i] < (newMole.x + 150)) && (molexTotal[i] > (newMole.x - 150))) ||
    ((molexTotal[i] < (newMole.x + 150)) && (molexTotal[i] > (newMole.x - 150)))
  );

  newMole.draw();

  cumulaT += rand;
  cumulaM++;
  console.log(newMole.x );
  if (cumulaM >= 10) {
    gameOver();
  } else {
    setTimeout(moleTimer, rand);
  }
}
