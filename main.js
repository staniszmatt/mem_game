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

function startWhenLoaded(){
    randomCardArray();
    createCards();
    $(".card").click(flipCard);
    $(".reset").click(resetGame);
    $(".new-game").click(newGame);
 
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

function createCards(){
    $(".card").addClass("back-of-card no-match");
};

function flipCard() { 
    var clickedCard = $(this);
    $(clickedCard).removeClass("back-of-card");
    cardFlipCount++
    selectedCardArray.push(clickedCard);
    cardMatchCheck();
 };

function cardMatchCheck() { 
var arrayLength = selectedCardArray.length;
console.log("Check card length ", arrayLength);
    if (arrayLength === 2){
        //verify image matches 
        //if matches remove no-match class
        //Make sure to remove if same card is clicked
    } else if (arrayLength === 3) {
        $(".no-match").addClass("back-of-card");
        selectedCardArray = [];
        cardFlipCount = 0;
        arrayLength = 0; 
        console.log("close array ",selectedCardArray);
        console.log("card flip count close ",cardFlipCount);
    };
};

function resetGame() { 
    //setup to clear everything out and run the document.ready to properly reset.
    console.log
    location.reload();
};

function newGame(){
    gameCounter++;
    var gameString = "Game: "+gameCounter;
    $(".stats-container div:first-child").text(gameString);
};
  // using .find('img').attr(src) to pull the image address and compare if its the same or not