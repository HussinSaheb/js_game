$(function(){

$(".game").hide();
startGame();

  function startGame() {
    askPlayerAmount();
    displayGuesses();

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
