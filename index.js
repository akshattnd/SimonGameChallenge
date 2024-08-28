let btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userChoice = [];
let started = false;
let level = 0;
function restart() {
  started = false;
  gamePattern = [];
  level = 0;
}
function checker(currLvl) {
  if (userChoice[currLvl] == gamePattern[currLvl]) {
    console.log("success\n", gamePattern, userChoice);
    if (userChoice.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 900);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    restart();
  }
}
function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
function glow(userColor) {
  $("#" + userColor).toggleClass("pressed");
  setTimeout(function () {
    $("#" + userColor).toggleClass("pressed");
  }, 100);
}
function nextSequence() {
  userChoice = [];
  $("#level-title").text("Level : "+ level++);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomColor = btnColors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // playSound(randomColor);
}
$(".btn").click(function (e) {
  let userColor = $(this).attr("id");
  userChoice.push(userColor);
  playSound(userColor);
  glow(userColor);
  checker(userChoice.length - 1);
});
$(document).keypress(function (e) {
  if (!started) {
    setTimeout(() => {
      nextSequence();
      started = true;
    }, 100);
  }
});
