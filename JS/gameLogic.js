// global variables

var t1; //main timeOut

var t0; //first  timeOut

var tb; //start timeOut

var cumulaM = 0; // number of moles displayed 

var cumulaT = 0; // time to display each mole cumulated

var molexTotal = []; // X positions for each mole generated

var moleyTotal = []; // Y positions for each mole generated

var rand = Math.round(Math.random() * 500); //+ 500; Random time between each mole

var smash = new Audio('Sound/zapsplat_cartoon_punch_004_17902.mp3');

var pop = new Audio('Sound/zapsplat_cartoon_squeeze_pop_002_18163.mp3');

var looser = new Audio('Sound/zapsplat_multimedia_game_retro_musical_descend_fail_negative_21484.mp3');

var champion = ""

var highScore = 0



$(document).ready(function () {
  var gameStatus = false;

  $("#start-game").click(function () {

    dispChampion()

    if (gameStatus == false) {
      startGame()
      $("#start-game").html("stop")
      $("#start-game").toggleClass(".clicked")
    }
    else if (gameStatus == true) quitGame();
  });

  // Game functions



  var startGame = function () {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    tb = setTimeout(moleTimer, 1000);
    gameStatus = true;
    victoriesDisp(0)
    dispChampion()
  };

  var gameOver = function () {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    looser.play()
    cumulaM = -1;
    molexTotal = [];
    moleyTotal = [];
    clearTimeout(t1)
    gameStatus = false;
    $("#start-game").html("new game ?")
    console.log("Gameover !");
    ctx.font = "80px helvetica";
    ctx.fillStyle = "white"
    ctx.fillText("GAMEOVER", 15, 270);
    getChampion()
    highScore = victories
    dispChampion()
    // moleTimer.i = 0
  };

  var quitGame = function () {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    cumulaM = -1;
    molexTotal = [];
    moleyTotal = [];
    clearTimeout(t1)
    clearTimeout(t0)
    clearTimeout(tb)
    var erase = ctx.clearRect(0, 0, 500, 500);
    setTimeout(erase, 10000);
    gameStatus = false;
    $("#start-game").html("new game ?")
  };

  function getChampion() {
    if (victories > highScore) {
      champion = "Highscore : " + prompt("New High Score !!!", "Please enter your name") + " - " + victories;
    }
  }

  function dispChampion() {

    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    if (champion != null) {
      ctx.font = "bold 25px helvetica";
      ctx.fillStyle = "white"
      ctx.fillText(champion, 15, 50);
    }
    else {
      ctx.font = "20px helvetica";
      ctx.fillStyle = "white"
      ctx.fillText("Unknown Champ", 15, 50);
    }
  }


  /* // Gameover countdown
  
  var preGameOver = function () {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    ctx.font = "100px helvetica";
    ctx.fillText(i, 200, 250);
  }
  console.log(countdown)
  var countDown = function () {
    var timeleft = 5;
    var Timer = setInterval(function () {
      timeleft --
      if (timeleft <= 0) clearInterval(countDown);
      console.log(timeleft) 
    }
    , 1000);
  }
  
  */
  // TODO creating a Gameplay object


  // event listener for click event

  var canvas = field;  //store canvas outside event loop
  var isDown = false;     //flag we use to keep track
  var x1, y1, x2, y2;     //to store the coords


  $('#field').on('mousedown', function (e) { // when mouse button is clicked and held 
    if (isDown === false) {

      isDown = true;

      var pos = getMousePos(canvas, e);
      x1 = pos.x;
      y1 = pos.y;
    }
  });


  $(window).on('mouseup', function (e) { // when mouse button is released (note: window, not canvas here)

    if (isDown === true) {

      var pos = getMousePos(canvas, e);
      x2 = pos.x;
      y2 = pos.y;

      isDown = false;

      //we got two sets of coords, process them
      //alert(x1 + ',' + y1 + ',' + x2 + ',' + y2);
    }
  });



  function getMousePos(canvas, evt) { // get mouse pos relative to canvas 
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  // score

  var victories = 0

  function victoriesDisp(victories) {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    ctx.font = "40px helvetica";
    ctx.fillStyle = "white"
    ctx.fillText(victories, 450, 50);
  }

  function clearOldVictories() {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(450, 21, 45, 40);
  }
  //Mole Killer

  $('#field').on('mousedown', function (e) {

    for (var i = 0; i < molexTotal.length; i++) {
      if (
        (Math.abs(x1 - molexTotal[i]) < 35) &&
        (Math.abs(y1 - moleyTotal[i]) < 50)
      ) {
        smash.play()
        victories++;
        clearOldVictories();
        victoriesDisp(victories);
        console.log("you hit a mole ! x =" + x1 + " & y =" + y1);
        clearMole(i);
        cumulaM--;
        break
      }
      else {
        console.log("did not hit a mole ! x =" + x1 + " & y =" + y1)
      }
    }

  });

  function clearMole(i) {
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(molexTotal[i], moleyTotal[i], 34, 56);
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
    if (moleY < 50) moleY = 50;
    return moleY;
  };


  // Function to check a Mole's coordinates for overlap
  function MoleCoordsOK(x, y) {
    /* IMPORTANT: This loop will FAIL if:
     molexTotal.length != moleyTotal.length (both arrays should always have same number of entries)
     OR if molexTotal/moleyTotal contain OBSOLETE coordinate pairs ("whacked" moles)
    */

    for (var i = 0; i < molexTotal.length; i++) {

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

    rand = Math.round(Math.random() * 500) + 500;
    var newMole = new Mole();

    // Case 1: no Moles drawn yet, we know we can draw this one
    if (cumulaM == 0) {
      console.log("*** first Mole");
      pop.play();
      newMole.draw();
      cumulaT += rand;
      cumulaM++;
      molexTotal.push(newMole.x);
      moleyTotal.push(newMole.y);
      t0 = setTimeout(moleTimer, rand);
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
        pop.play();
        newMole.draw();
        cumulaT += rand;
        cumulaM++;
        molexTotal.push(newMole.x);
        moleyTotal.push(newMole.y);

        if (cumulaM >= 5) {
          //preGameOver()
          setTimeout(gameOver, 1000)
        } else {
          t1 = setTimeout(moleTimer, rand);
        }
      }
    }
  }


  var t1;

});