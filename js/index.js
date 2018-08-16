$(function(){
  var drawWord = new Word();
  var guessed;
  // get the current players
  var playCount = 4;
  // hide the game div at start
  $(".game").hide();
  // call the functon to gather player details
  askPlayerAmount();
  // initialise the leaderoard
  var leaderboard = new Leaderboard();
  // start a game
  function startGame(Leaderboard) {
    var player;
    switch (playCount) {
      case 1:
        player = Leaderboard.getScores()[1];
        $("#PlayerTurn").text("Player two's turn to guess");
        $(".player"+"#"+player.name+"").addClass("drawing");  
        // call game function with the player object passed as argument.
        game(player);
        break;
      case 2:
        player = Leaderboard.getScores()[0];
        $("#PlayerTurn").text("Player one's turn to guess")
        $(".player"+"#"+player.name+"").addClass("drawing");
        game(player);
        break;
      case 3:
        player = Leaderboard.getScores()[1];
        $("#PlayerTurn").text("Player two's turn to guess")
        $(".player"+"#"+player.name+"").addClass("drawing");
        game(player);
        break;
      case 4:
        player = Leaderboard.getScores()[0];
        $("#PlayerTurn").text("Player one's turn to guess")
        $(".player"+"#"+player.name+"").addClass("drawing");
        game(player);
        break;
      default:
    }
    function game(player) {
      drawCanvas();
      displayWord(true);
      displayGuesses(player)
      var counter = 0;
      //stat timer to replace the word with underscores
      var wordTimer = setInterval(function() {
        counter++;
        if (counter == 5) {
          replaceWord();
          // remove the timer
          clearInterval(wordTimer);
        }
      }, 1000);
      // if the correct word is guessed
    }
    $("#words").text("Game Finished");
    }
  // function to retrieve the values from inputs
  function askPlayerAmount() {
    var playerArray = [];
    var numberOfPlayers;
    // when player enters the amount of Players
    $("#getPlayers").on("keydown", function(){
      // if the form already has input fields for names
      // and the player wants to readjust the player values
      if ($(".playerName").length >= 0) {
        // remove all the input fields for names
        $(".playerName").remove();
        $("#enterGameBtn").remove();
      }
      //if enter key has been pressed
      if (event.keyCode == 13){
        // create new input fields for player names
        for (var i = 1; i <= $("#getPlayers").val(); i++) {
          // assign each input a class of playerName
          $(".getPlayersForm").append("<input type='text' name='"+i+"' class='playerName' placeholder='player name "+ i +"'>");
        }
        numberOfPlayers = $("#getPlayers").val();
        $(".getPlayersForm").append("<button type='button' id='enterGameBtn' name='button'>Enter Game</button>");
        //when the button is pressed
        $("#enterGameBtn").click(function(){
          // loop over all player names
          $(".playerName").each(function(index){
            // add them to an array
            playerArray[index]= $(this).val();
          })
          addPlayers(numberOfPlayers, playerArray);
        })
      }
    });
  }
  // add function to populate the player section of the game
  function addPlayers(num,playerNames) {
    // create player div
    for (var i = 0; i < num; i++) {
      // add div with person name to player columns
      $(".playerDisplay").append("<div class='player'></div>");
    }
    $(".player").each(function(index){
      //create a new player object
      // add the players name and score
      var person =  new Player(playerNames[index], 0);
      // display in the window the players name.
      $(this).text(playerNames[index]);
      // add an id of the name
      $(this).attr('id',playerNames[index]);
      // add the new player to the leaderboard
      leaderboard.addEntry(person);
    });
    // call leaderboard to be displayed
    displayLeaderboard(leaderboard);
    startGame(leaderboard);
    $(".mainMenu").hide();
    $(".game").show();
  }
  // display leaderboard on page
  function displayLeaderboard(leaderboard) {
    $(".leaderboard").append("<ul id='leaderboard'></ul>");
    for (var i = 0; i < leaderboard.getScores().length; i++) {
      $("#leaderboard").append("<li id="+leaderboard.getScores()[i].getName()+">"+leaderboard.getScores()[i].getName() +  "|"+leaderboard.getScores()[i].getScore()+"</li>")
    }
  }
  // displays the word on page//sets the objct word
  function displayWord() {
    // get word from the datamuse api using get restful
    $.get("https://api.datamuse.com/words?ml=&max=999&topics=furniture", function(result){
      // get a random number
      var number  = Math.floor(Math.random() * 30);
      var theWord = result[number].word;
      // set the word to word object
      drawWord.setWord(result[number].word);
      $("#words").text(theWord);
    })
  }
  // function to replace the word displayed with underscores to guess
  function replaceWord() {
    var theWord = $("#words").text();
    var temp ="";
    // loop over the word, replace the words letters with underscore
    for (var i = 0; i < theWord.length; i++) {
      temp += theWord[i].replace(theWord.charAt(i), "_ ");
    }
    $("#words").text(temp);
  }
  // function to show and deal with the canvas inputs
  // set param turn to true if current players turns
  // pass the player object if its their turn
  function drawCanvas() {
      var canvas = $("#canvas")[0].getContext('2d');
      // used to check if the mouse has been pressed or not
      var isDrawing;
      canvas.fillCircle = function(x, y, radius, fillColor) {
        this.fillStyle = fillColor;
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius, 0, Math.PI * 2, false);
        this.fill();
      };
      // compares the canvas
      function getMousePos(canvas, e) {
        var rect =  $("#canvas")[0].getBoundingClientRect();
        return {x: e.clientX - rect.left, y: e.clientY - rect.top};
      }
      // if the mouse is pressed we draw
      $("#canvas").mousedown(function(event){
        isDrawing = true;
      })
      //draw from the press to the nd
      $("#canvas").mousemove(function(event){
        if (!isDrawing) {
          return;
        }
        // get the mouse positon in relation to the canvas
        var pos = getMousePos(canvas, event);
        // assign x to the mouse
        var x =  pos.x - 10;
        // assign y to mouse
        var y = pos.y - 10;
        // set a radius of the drawn circles
        var radius = 2;
        // give it a colour
        var fillColor = '#ff0000';
        // call the function to draw
        canvas.fillCircle(x, y, radius, fillColor);
      })
      // if the mouse is released we stop the draw
      $("#canvas").mouseup(function(event){
        isDrawing = false;
      })
  }
  // displays the guesses from the input above in the same column
  function displayGuesses(Player) {
    $("#guess").on("keydown",function(event){
      if (event.keyCode == 13){
        $(".guesses").append("<p class='guessParagraph'>"+$("#guess").val()+"</p>");
        // currently only using the first person on list in wait for sockets.
        compareGuess(Player);
      }
    })
    // set the input box to the bottom of the page
    $("#guess").css({
      position:"relative",
      bottom:"0"
    })
    $(".guessForm").on("submit",function(event){
      event.preventDefault();
    })
  }
  // compare a guess from a player and the word on screen
  function compareGuess(Player) {
    // check if the word is the last one entered
    if ($(".guessParagraph:last-child").text() == drawWord.getWord()) {
      // if correct assign the player 100 points
      Player.score += 100;
      // if guess is correct assign green background
      $(".guessParagraph:last-child").css({
        backgroundColor: "green"
      })
      // call to updte the leaderboard
      updateScoreBoard(Player);
      guessed = true;
      $("#guess").unbind("keydown");
      if (guessed) {
        // reduce the playCount
        playCount--;
        startGame(leaderboard);
      }
    }else{
      // iff guess is wrong assign red background
      $(".guessParagraph:last-child").css({
        backgroundColor: "red"
      })
      guessed=false;
    }

  }
  // update score board
  function updateScoreBoard(Player) {
    $("#"+Player.getName()+"").text(""+Player.getName()+ "|" + Player.getScore());
  }
  // create Word Class
  function Word(word) {
    this.word = word;
    Word.prototype.getWord = function() {
      return this.word;
    }
    Word.prototype.setWord = function(word){
      this.word = word;
    }
  }
  //create the Player Class
  function Player(name, score) {
    this.name = name;
    this.score = score;
    // get the players name
    Player.prototype.getName = function () {
      return this.name;
    };
    //get the players score
    Player.prototype.getScore = function () {
      return this.score;
    };
  }
  // create Leaderboard class
  function Leaderboard(){
    this.scores = [];
    Leaderboard.prototype.getScores = function () {
      return this.scores
    };
    //change name as its confusing with the other function
    Leaderboard.prototype.addEntry = function(Player) {
      this.scores.push(Player);
    }
  }
})
