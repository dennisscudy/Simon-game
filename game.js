//Variables

var buttonColors  = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Beautifing functions

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("div #" + currentColour).addClass("pressed");
  setTimeout(function (){
    $("div #" + currentColour).removeClass("pressed");
  }, 100);
}

// Functions that make the game work


$(document).keydown(function() {
  nextSequence();
});

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
}


$("div.btn").click(function (/*event*/) {
  var userChosenColour = $(this).attr("id"); //event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("right");
    if (gamePattern.length-1 === userClickedPattern.length-1) {
      console.log("pattern is finished");
      setTimeout(function(){
        nextSequence();
      }, 1000);
      }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
