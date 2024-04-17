var simonArray = [];
var playerArray = [];

function pushSimonColor() {
    var randomNumber = Math.floor(Math.random() * 4) + 1;

    if (randomNumber === 1) {var randomColor = "green";}
    if (randomNumber === 2) {var randomColor = "blue";}
    if (randomNumber === 3) {var randomColor = "yellow";}
    if (randomNumber === 4) {var randomColor = "red";};

    setTimeout(function(levelUp) {
        playSound(randomColor);
        flashButton(randomColor);
    }, 300);
    
    simonArray.push(randomColor);
}

function handleKeyPress(event) {
    if (simonArray.length === 0) {
    pushSimonColor();
    $("h1").text("Level " + simonArray.length);
    }
};

$(document).on('keydown', handleKeyPress);

function handleClick() {
    var buttonColor = this.id;
    playerArray.push(buttonColor);

    function arraysEqualInOrder(simonArray, playerArray) {
        var minLength = Math.min(simonArray.length, playerArray.length);
        for (let i = 0; i < minLength; i++) {
            if (simonArray[i] !== playerArray[i]) {
                return false;
            }
        }
        return true;
    };

    function arraysEqualLength(simonArray, playerArray) {
        return simonArray.length === playerArray.length;
    }

    var inOrderEqual = arraysEqualInOrder(simonArray, playerArray);
    var lengthEqual = arraysEqualLength(simonArray, playerArray);
    console.log(inOrderEqual);
    console.log(lengthEqual);

    if (inOrderEqual && !lengthEqual) {
        playSound(buttonColor);
        flashButton(buttonColor);
    }

    if (inOrderEqual && lengthEqual) {
        playSound(buttonColor);
        flashButton(buttonColor);
        playerArray = [];
        setTimeout(function() {
            pushSimonColor();
            $("h1").text("Level " + simonArray.length);
        },300);
    } 
    
    if ((!inOrderEqual && !lengthEqual) || (!inOrderEqual && lengthEqual)) {
        var audioWrong = new Audio('./sounds/wrong.mp3');
        audioWrong.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        playerArray = [];
        simonArray = [];
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
    }
};

function playSound(key) {
    switch (key) {
        case "green":
            var audioGreen = new Audio('./sounds/green.mp3');
            audioGreen.play();
            break;

        case "blue":
            var audioBlue = new Audio('./sounds/blue.mp3');
            audioBlue.play();
            break;

        case "yellow":
            var audioYellow = new Audio('./sounds/yellow.mp3');
            audioYellow.play();
            break;

        case "red":
            var audioRed = new Audio('./sounds/red.mp3');
            audioRed.play();
            break;

        default:
            console.log(buttonColor);
    }
}

function flashButton(buttonColor) {
    $("#" + buttonColor).addClass("pressed");
    setTimeout(function() {
        $("#" + buttonColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(handleClick);