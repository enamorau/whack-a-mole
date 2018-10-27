// create a stargame function

// TODO creating a Gameplay object

// TODO creating a player object

function Player() {
  this.area = 50;
}

// TODO creating a Mole object

function Mole() {
  this.canvas = document.getElementById("field");
  this.ctx = this.canvas.getContext("2d");

  this.x = moleXGenerator();
  this.y = moleYGenerator();
  
  this.draw = function() {
    var img = new Image();
    img.onload = function() {
      console.log("bye")
      this.ctx.drawImage(img, this.x, this.y, 34, 56);
    }.bind(this);
    img.src = "./img/1Mole.png";
    console.log("hello")
  };
}

moleXGenerator = function() {
  var moleX = Math.floor(Math.random() * 500);
  if (moleX > (500 - 34)) return (500 - 33);
  else return moleX;
};

moleYGenerator = function() {
  var moleY = Math.floor(Math.random() * 500);
  if (moleY > (500 - 46)) return (500 - 57);
  return moleY;
};
