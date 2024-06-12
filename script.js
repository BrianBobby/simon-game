$(document).ready(function() {
    var btnColor = ["green", "red", "yellow", "blue"];
    var btnArray = [];
    var userArray = [];
    var started = false;
    var level = 0;
    
    $(document).keydown(function(){
        if(!started){
            started = true;
            colorSequence();
        }
        
    })
    
    $(".btn").click(function(){
        var chosenColor = $(this).attr("id");
        userArray.push(chosenColor);

        playSound(chosenColor);
        animatePress(chosenColor);

        checkAnswer(userArray.length-1);
    })

    function checkAnswer(currentLevel){
        if (userArray[currentLevel]===btnArray[currentLevel]){
            if (userArray.length===btnArray.length){
                setTimeout(function (){
                    colorSequence();
                },1000);
            }
        }
        else{
            $("body").addClass("game-over");
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function (){
                $("body").removeClass("game-over");
            },200);
            startOver();
        }
    }
    function colorSequence() {
        level++;
        $("#level-title").text("Level "+level);
        userArray=[];
        var random = Math.floor(Math.random() * 4);
        var randomColor = btnColor[random];
        btnArray.push(randomColor);

        $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomColor);
    }

    function animatePress(colour){
        $("#"+colour).addClass("pressed");
        setTimeout(function(){
            $("#"+colour).removeClass("pressed");
        },100);
    }
    function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    
    function startOver() {
        level = 0;
        btnArray = [];
        userArray=[];
        started = false;
      }
});


