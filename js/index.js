$(function(){
  showHide();
  // calling the function to test it with 2 users only.
  addPlayers(2, ["hussin", "mav"]);
  displayGuesses();

  function askPlayerAmount() {
    // when player enters the amount of Players
    $("#getPlayers").on("keydown", function(){
      //if enter has been pressed
      if (event.keyCode == 13){
        // create new input fields for player names
        for (var i = 1; i <= $("#getPlayers").val(); i++) {
          $(".getPlayersForm").append("<input type='text' name='"+i+"' class='playerName' placeholder='player name"+ i +"'>");
        }
      }
      $(".playerName").css({
        border:"1px solid black",
        display:"Block;"
      })
    })
  }
  // implement  dynamic show and hide function
  function showHide() {
    $(".game").hide();
  }
  // add function to populate the player section of the game
  function addPlayers(num,arrayNames) {
    // create player div
    for (var i = 0; i < num; i++) {
      // use the personName to a div inside the column for players
      $(".playerDisplay").append("<div class='player'></div>");
    }
    $(".player").each(function(index){
      $(this).text(arrayNames[index]);
    })
  }
  // displays the guesses from the input above in the same column
  function displayGuesses() {
    $("#guess").on("keydown",function(event){
      if (event.keyCode == 13){
        $(".guesses").append("<p>"+ $("#guess").val() +"</p>");
      }
    })
    $("form").on("submit",function(event){
      event.preventDefault();
    })
  }
})
