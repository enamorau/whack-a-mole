// create a stargame function

// TODO creating a Gameplay object

// TODO creating a player object

function Player() {
  this.area = 50;
}

// TODO creating a Mole object

function Mole() {
  this.canvas = document.getElementById("canvas");
  this.ctx = canvas.getContext("2d");
  this.x = moleXgenerator();
  this.y = moleYgenerator();
  this.draw = function(mole) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, mole.x, mole.y, 34, 56);
    };
    img.src = "../img/1Mole.png";
  };
}

moleXGenerator = function() {
  var moleX = Math.pow(Math.random() * 500);
  return moleX;
};

moleYGenerator = function() {
  var moleX = Math.pow(Math.random() * 500);
  return moleY;
};
