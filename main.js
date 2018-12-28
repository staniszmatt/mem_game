$(document).ready(startWhenLoaded); 

function startWhenLoaded(){
   backOfCards();
};

function backOfCards(){
    $(".card").addClass("back-of-card");
};
// using .find('img').attr(src) to pull the image address and compare if its the same or not