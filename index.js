var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red","blue","green","yellow"];
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").click(function (){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  animatePress(userChosenColour);
});

function playSound(name){
  var audio = new Audio(name+".mp3");
  audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
 },100);
}
$(document).keypress(function(){
  if(!started){
    $("h1").text("level "+level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  console.log("Y");

if(userClickedPattern.length===gamePattern.length){
  setTimeout(function(){
    nextSequence();
  },1000);
}
}else{
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("gameover press any key");
  setTimeout(function(){
    $("body").removeClass("game-over",1000);
    startOver();
  })
}
}

function startOver(){
  level = 0 ;
  gamePattern = [];
  started = false;

}
