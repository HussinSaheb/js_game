$(function(){
  $(".game").hide();
  startGame();
  function startGame() {
    askPlayerAmount();
    displayGuesses();
    drawcanvas();
  }

  function drawcanvas() {
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
      var radius = 1;
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
      $(this).text(playerNames[index]);
    })
    $(".mainMenu").hide();
    $(".game").show();
  }
  // displays the guesse from the input above in the same column
  function displayGuesses() {
    $("#guess").on("keydown",function(event){
      if (event.keyCode == 13){
        $(".guesses").append("<p>"+ $("#guess").val() +"</p>");
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
})
