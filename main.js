$(document).ready(startWhenLoaded); 

var cardArray = 
["url('Images/apple.png')", "url('Images/apple.png')", "url('Images/cheekyChocolate.png')", "url('Images/cheekyChocolate.png')",
"url('Images/coco.png')", "url('Images/coco.png')", "url('Images/cookieCookie.png')", "url('Images/cookieCookie.png')",
"url('Images/donut.png')", "url('Images/donut.png')", "url('Images/kissingBinky.png')", "url('Images/kissingBinky.png')",
"url('Images/kisStrawberry.png')", "url('Images/kisStrawberry.png')", "url('Images/libylips.png')", "url('Images/libylips.png')",
"url('Images/pinapple.png')", "url('Images/pinapple.png')"];

var cardArrayHard = [
"url('Images/apple.png')", "url('Images/apple.png')", "url('Images/cheekyChocolate.png')", "url('Images/cheekyChocolate.png')",
"url('Images/coco.png')", "url('Images/coco.png')", "url('Images/cookieCookie.png')", "url('Images/cookieCookie.png')",
"url('Images/donut.png')", "url('Images/donut.png')", "url('Images/kissingBinky.png')", "url('Images/kissingBinky.png')",
"url('Images/kisStrawberry.png')", "url('Images/kisStrawberry.png')", "url('Images/libylips.png')", "url('Images/libylips.png')",
"url('Images/pinapple.png')", "url('Images/pinapple.png')", "url('Images/pancake.png')", "url('Images/pancake.png')",
"url('Images/cheery.png')", "url('Images/cheery.png')", "url('Images/present.png')", "url('Images/present.png')",
"url('Images/baloon.png')", "url('Images/baloon.png')", "url('Images/purse.png')", "url('Images/purse.png')"];

var gameDifficultyEasy = true; 
var gameCounter = 1;
var cardFlipCount = 0; 
var selectedCardArray = [];
var wrongMatchCounter = 0;
var correctMatchCounter = 0;
var newSeccessRate = correctMatchCounter/(wrongMatchCounter+correctMatchCounter);

function startWhenLoaded(){
    cardArray = randomCardArray(cardArray);
    cardArrayHard = randomCardArray(cardArrayHard);
    setupCardAttrEasy();
    clickHandler();
};

function clickHandler() { 
    $(".card-layout").on("click", ".card", flipCard);
    $(".reset").click(resetGame);
    $(".new-game").click(newGame);
    $(".pop-up-wrapper").click(toggleGameCompleted);
    $(".about-me").click(aboutMe);
    $(".about-me-text").click(resetAboutMe);
    $(".difficulty").click(chooseDifficulty)
    $(".easy").click(easyBoardSetup);
    $(".hard").click(hardBoardSetup);
 }

function randomCardArray(arrayToRandomize) {
    var cardIndex = arrayToRandomize.length;
    var tempStorage = "";
    var randomIndex = 0; 
    while (0 !== cardIndex) {
        randomIndex = Math.floor(Math.random() * cardIndex);
        cardIndex -= 1; 
        tempStorage = arrayToRandomize[cardIndex];
        arrayToRandomize[cardIndex] = arrayToRandomize[randomIndex];
        arrayToRandomize[randomIndex] = tempStorage;
    }; 
    return arrayToRandomize;
};

function setupCardAttrEasy(){
    
    var row1 = $("<div>").addClass("row1");
    var row2 = $("<div>").addClass("row2");
    var row3 = $("<div>").addClass("row3");
    // var row4 = $("<div>").addClass("row4");

    $(".card-layout").append(row1, row2, row3);
    for (addCardIndex = 0; addCardIndex < 6; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row1").append(card);
    };
    for (addCardIndex = 0; addCardIndex < 6; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row2").append(card);
    };
    for (addCardIndex = 0; addCardIndex < 6; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row3").append(card);
    };

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

function setupCardAttrHard(){
    var row1 = $("<div>").addClass("row1");
    var row2 = $("<div>").addClass("row2");
    var row3 = $("<div>").addClass("row3");
    var row4 = $("<div>").addClass("row4");

    $(".card-layout").append(row1, row2, row3, row4);
    for (addCardIndex = 0; addCardIndex < 7; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row1").append(card);
    };
    for (addCardIndex = 0; addCardIndex < 7; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row2").append(card);
    };
    for (addCardIndex = 0; addCardIndex < 7; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row3").append(card);
    };
    for (addCardIndex = 0; addCardIndex < 7; addCardIndex++){
        var card = $("<div>").addClass("card back-of-card no-match");
        $(".row4").append(card);
    };

    var row1Index = 1;
    var row2Index = 1; 
    var row3Index = 1; 
    var row4Index = 1; 
    for (var cardIdIndex = 0; cardIdIndex < cardArrayHard.length; cardIdIndex++){
        var cardImage = cardArrayHard[cardIdIndex];
        if (cardIdIndex < 7){
            $(".row1 .card:nth-child("+row1Index+")").attr("id", cardImage);
            row1Index++;
        } else if (cardIdIndex > 6 && cardIdIndex < 14) {
            $(".row2 .card:nth-child("+row2Index+")").attr("id", cardImage);
            row2Index++;
        }else if (cardIdIndex > 13 && cardIdIndex < 21) {
            $(".row3 .card:nth-child("+row3Index+")").attr("id", cardImage);
            row3Index++;
        } else {
            $(".row4 .card:nth-child("+row4Index+")").attr("id", cardImage);
            row4Index++;
        };
    };
};

function flipCard() { 
    flipCardSound();
    $(this).removeClass("back-of-card");
    $(this).addClass("front-of-card");
    // $(this).addClass("flip-card");
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
    wrongMatchCounter = 0;
    correctMatchCounter = 0;
    $(".stats-container div:first-child").text("Game: 1");
    $(".stats-container div:nth-child(2)").text("Success Rate: 00.0%");
    cardReset();
};

function newGame(){
    var completedGameValue = verifyGameCompleted();
    if (completedGameValue === false){
        var newSuccessRate = correctMatchCounter/(wrongMatchCounter+correctMatchCounter)*100;
        gameCounter++;
        var gameString = "Game: "+gameCounter;
        newSuccessRate = "Success Rate: "+newSuccessRate.toFixed(2)+"%";
        $(".stats-container div:first-child").text(gameString);
        $(".stats-container div:nth-child(2)").text(newSuccessRate);
        cardReset();
    };
};

function cardReset() { 
    cardArray = randomCardArray(cardArray);
    cardArrayHard = randomCardArray(cardArrayHard);
    clearCardMatchCheck();

    $(".card").remove();
    $(".row1").remove();
    $(".row2").remove();
    $(".row3").remove();
    $(".row4").remove();
    if (gameDifficultyEasy===true){
        setupCardAttrEasy();
    } else {
        setupCardAttrHard();
    }
    
 };
 
 function chooseDifficulty(){
    $(".drop-down-menu").toggle("display");
 };

function verifyGameCompleted(){
    var valueCheck = $(".card").hasClass("no-match");
    if (valueCheck === true){
        toggleGameCompleted();
        $(".new-game-popup").text("Complete game before starting new one! Click to continue.");
        return true; 
    } else {
        return false;
    };
};

function toggleGameCompleted(){
    $(".pop-up-wrapper").toggle("display");
};

function aboutMe() { 
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
    $(".foot-wrapper div").removeClass("about-hidden");
    $(".foot-wrapper div").addClass("about-me");
    $(".ok-read-me").toggle("display");
    $(".about-me-text").toggle("display"); 
    $(".card-layout").toggle("display");
    $(".top-container").toggle("display"); 
    $(".ok-read-me").toggle("display");
    $(".about-me").toggle("display");
  };
  
  function easyBoardSetup(){
    $(".drop-down-menu").toggle("display");
    gameDifficultyEasy = true;
    resetGame();
  };

  function hardBoardSetup(){
    $(".drop-down-menu").toggle("display");
    cardArrayHard = randomCardArray(cardArrayHard);
    clearCardMatchCheck();

    $(".card").remove();
    $(".row1").remove();
    $(".row2").remove();
    $(".row3").remove();
    $(".row4").remove();
    setupCardAttrHard();
    gameDifficultyEasy = false; 
  };
  
  
  
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