$(document).ready(startWhenLoaded); 
var gameCounter = 1;
var cardFlipCount = 0; 
var selectedCardArray = [];
var cardArray = 
["url('Images/apple.png')", "url('Images/apple.png')", "url('Images/cheekyChocolate.png')", "url('Images/cheekyChocolate.png')",
"url('Images/coco.png')", "url('Images/coco.png')", "url('Images/cookieCookie.png')", "url('Images/cookieCookie.png')",
"url('Images/donut.png')", "url('Images/donut.png')", "url('Images/kissingBinky.png')", "url('Images/kissingBinky.png')",
"url('Images/kisStrawberry.png')", "url('Images/kisStrawberry.png')", "url('Images/libylips.png')", "url('Images/libylips.png')",
"url('Images/pinapple.png')", "url('Images/pinapple.png')"];
var wrongMatchCounter = 0;
var correctMatchCounter = 0;
var newSeccessRate = correctMatchCounter/(wrongMatchCounter+correctMatchCounter);

function startWhenLoaded(){
    randomCardArray();
    setupCardAttr();
    
    $(".card").click(flipCard);
    $(".reset").click(resetGame);
    $(".new-game").click(newGame);
    $(".pop-up-wrapper").click(toggleGameCompleted);
    $(".about-me").click(aboutMe);
    $(".about-me-text").click(resetAboutMe);


};

function randomCardArray() {
    var cardIndex = cardArray.length;
    var tempStorage = "";
    var randomIndex = 0; 

    while (0 !== cardIndex) {
        randomIndex = Math.floor(Math.random() * cardIndex);
        cardIndex -= 1; 
        tempStorage = cardArray[cardIndex];
        cardArray[cardIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = tempStorage;
    }; 
};

function setupCardAttr(){
    $(".card").addClass("back-of-card no-match");
    var row1Index = 1;
    var row2Index = 1; 
    var row3Index = 1; 

    for (var cardIdIndex = 0; cardIdIndex < cardArray.length; cardIdIndex++){
        var cardImage = cardArray[cardIdIndex];
        if (cardIdIndex < 6){
            $(".row1 .card:nth-child("+row1Index+")").attr("id", cardImage);
            row1Index++;
        } else if (cardIdIndex > 5 && cardIdIndex < 12) {
            $(".row2 .card:nth-child("+row2Index+")").attr("id", cardImage);
            row2Index++;
        }else {
            $(".row3 .card:nth-child("+row3Index+")").attr("id", cardImage);
            row3Index++;
        };
    };
};

function flipCard() { 
    console.log("flipCard Function");
    flipCardSound();
    $(this).removeClass("back-of-card");
    $(this).addClass("front-of-card");
    var imageID = $(this).attr("id");

    $(this).css("background-image", imageID);
    cardFlipCount++
    selectedCardArray.push(this);
    cardMatchCheck(selectedCardArray);
    gameCompletedSound();
 };

function cardMatchCheck() { 
    var arrayLength = selectedCardArray.length;
    var div1 = selectedCardArray[0];
    

    if (arrayLength === 1 && $(div1).hasClass("front-of-card") && !$(div1).hasClass("no-match")) {
        cardFlipCount = 0;
        selectedCardArray.pop(0);
    } else if (arrayLength === 2){
        var div2 = selectedCardArray[1];
        var div1image = $(div1).attr("id");
        var div2image = $(div2).attr("id");
        if ($(div2).hasClass("front-of-card") && !$(div2).hasClass("no-match")){
            cardFlipCount = 1;
            selectedCardArray.pop(1);
        }else if (div1 === div2){
            cardFlipCount = 1;
            selectedCardArray.pop(1);
        } else if (div1image === div2image){
            $(div1).removeClass("no-match");
            $(div2).removeClass("no-match");
            correctMatchCounter++;
            clearCardMatchCheck();
            matchFoundSound()
        } 
    } else if (arrayLength === 3) {
        $(".no-match").addClass("back-of-card");
        $(".no-match").removeAttr("style");
        $(".no-match").removeClass("front-of-card");
        $(".about-hidden").removeClass("front-of-card");
        wrongMatchCounter++;
        clearCardMatchCheck();
    };
};

function clearCardMatchCheck(){
    selectedCardArray = [];
    cardFlipCount = 0;
    arrayLength = 0; 
};

function resetGame() { 
    console.log("resetGame function");
    wrongMatchCounter = 0;
    correctMatchCounter = 0;
    $(".stats-container div:first-child").text("Game: 1");
    $(".stats-container div:nth-child(2)").text("Success Rate: 00.0%");

    cardReset();
};

function newGame(){
    console.log("NewGame Function")
    var completedGameValue = verifyGameCompleted();
    if (completedGameValue === false){
        var newSuccessRate = correctMatchCounter/(wrongMatchCounter+correctMatchCounter);
        gameCounter++;
        var gameString = "Game: "+gameCounter;
        newSuccessRate = "Success Rate: "+newSuccessRate.toFixed(4)*100+"%";
        
        $(".stats-container div:first-child").text(gameString);
        $(".stats-container div:nth-child(2)").text(newSuccessRate);
        cardReset();
    };
};

function cardReset() { 
    
    $(".card").removeAttr("style");
    $(".card").removeClass("front-of-card");

    randomCardArray();
    setupCardAttr();
    clearCardMatchCheck();
 };

function verifyGameCompleted(){
    console.log("verify Game completed function");
    var valueCheck = $(".card").hasClass("no-match");
        console.log("Value Check is: ", valueCheck);
    if (valueCheck === true){
        toggleGameCompleted();
        $(".new-game-popup").text("Complete game before starting new one! Click to continue.");
        return true; 
    } else {
        return false;
    };
};

function toggleGameCompleted(){
    console.log("toggleGameComplete Function")
    $(".pop-up-wrapper").toggle("display");
};

function aboutMe() { 
    console.log("aboutMe function")
    $(".ok-read-me").toggle("display");
    $(".top-container").toggle("display"); 
    $(".card-layout").toggle("display");
    $(".about-me-text").toggle("display"); 
    $(".ok-read-me").toggle("display");
    $(".about-me").toggle("display");

    $(".foot-wrapper div").addClass("about-hidden");
    $(".foot-wrapper div").removeClass("about-me");
 }

 function resetAboutMe() { 
     console.log("resetAboutMe function")
    
    $(".foot-wrapper div").removeClass("about-hidden");
    $(".foot-wrapper div").addClass("about-me");

    $(".ok-read-me").toggle("display");
    $(".about-me-text").toggle("display"); 
    $(".card-layout").toggle("display");
    $(".top-container").toggle("display"); 
    $(".ok-read-me").toggle("display");
    $(".about-me").toggle("display");

  }

function flipCardSound() { 
    var cardFlipSound = new Audio("sound/Card-flip-sound-effect.mp3");
    cardFlipSound.play();
 };

 function matchFoundSound() { 
    var matchFound = new Audio("sound/yay.wav");
    matchFound.play();
 };

 function gameCompletedSound() { 
    var allCardsMatchedCheck = $(".card").hasClass("front-of-card");
    var noChardUnMatchedCheck = $(".card").hasClass("no-match");
    if (allCardsMatchedCheck === true && noChardUnMatchedCheck === false) {
        var gameFinished = new Audio("sound/gameCompleted.wav");
    gameFinished.play();
    };
  };