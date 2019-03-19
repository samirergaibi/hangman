

// --References--
const gameExplanation = document.getElementById("game-explanation");
const nextBtn = document.getElementById("next-btn");
const hangmanHeading = document.getElementById("hangman-heading");
let executionerName = document.getElementById("executioner");
let playerName = document.getElementById("player");
const firstStage = document.getElementById("first-stage");
const secondStage = document.getElementById("second-stage");
const playerMsg = document.getElementById("player-msg")
const executionerMsg = document.getElementById("executioner-msg");
const errorMsg = document.getElementById("error-msg");
const startBtn = document.getElementById("start-btn");
const word = document.getElementById("word");

// Clicking home button resets sessionStorage
let home = document.getElementById("home");
home.addEventListener("click", function(){
    sessionStorage.clear();
}, false);

// Checks if there is a current game running or not
if(sessionStorage.playerName && sessionStorage.executionerName){
    playerName = sessionStorage.getItem("playerName");
    executionerName = sessionStorage.getItem("executionerName");
    errorMsg.style.visibility = "hidden";
    hangmanHeading.innerText = "HÄNGA " + playerName.toUpperCase();
    gameExplanation.style.display = "none";
    firstStage.style.display = "none";
    secondStage.style.display = "block";
    playerMsg.innerHTML = "<b>" + capitalizeFirstLetter(playerName) + "</b>" + " var god och blunda eller titta bort!";
    executionerMsg.innerHTML = "<b>" + capitalizeFirstLetter(executionerName) + "</b>" + " var god och välj ett ord!";
    word.focus();
}

nextBtn.addEventListener("click", function(){
    // checks so that the names only contain letters a-z +åäö
    if(checkStringContent(executionerName.value) || checkStringContent(playerName.value)){
        errorMsg.style.visibility = "visible";
        errorMsg.innerText = "Namnen får bara innehålla bokstäver!";
    }
    else if(!executionerName.value || !playerName.value){
        errorMsg.style.visibility = "visible";
        errorMsg.innerText = "Du måste fylla i namn för spelarna!";
    }
    else{
        errorMsg.style.visibility = "hidden";
        hangmanHeading.innerText = "HÄNGA " + playerName.value.toUpperCase();
        gameExplanation.style.display = "none";
        firstStage.style.display = "none";
        secondStage.style.display = "block";
        word.focus();
        playerMsg.innerHTML = "<b>" + capitalizeFirstLetter(playerName.value) + "</b>" + " var god och blunda eller titta bort!";
        executionerMsg.innerHTML = "<b>" + capitalizeFirstLetter(executionerName.value) + "</b>" + " var god och välj ett ord!";
    }
}, false)


startBtn.addEventListener("click", function(){
    // Checks so that the word only contains characters a-z+åäö
    if(checkStringContent(word.value)){
        errorMsg.style.visibility = "visible";
        errorMsg.innerText = "Du får endast använda bokstäver a-ö i ordet.";
    }
    else if(!word.value){
        errorMsg.style.visibility = "visible";
        errorMsg.innerText = "Du måste skriva in ett ord.";
    }
    else{
        sessionStorage.setItem("gameWord", word.value.toUpperCase());
        if(sessionStorage.playerName && sessionStorage.executionerName){
            window.location = "game.html";
        }
        else{
            sessionStorage.setItem("executionerName", executionerName.value);
            sessionStorage.setItem("playerName", playerName.value);
            window.location = "game.html";
        }
    }
}, false)

// -- Toggle Word button --

const wordToggle = document.getElementById("word-toggle");

["mousedown", "touchstart"].forEach(function(event){
    wordToggle.addEventListener(event, function(){
        word.type = "text";
        wordToggle.style.opacity = 1;
    }, false)
});
["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(event => {
    wordToggle.addEventListener(event, function(){
        word.type = "password";
        wordToggle.style.opacity = 0.5;
    }, false)
});


// Eventlistener for pressing enter in the input fields
let firstStageInput = document.getElementsByClassName("first-stage-input");

for(let i = 0; i < firstStageInput.length; i++){
    firstStageInput[i].addEventListener("keypress", function(event){
        if(event.which === 13){
            nextBtn.click();
        }
    }, false);
}

word.addEventListener("keypress", function(event){
    if(event.which === 13){
        startBtn.click();
    }
}, false);



// Checks if the string contains and invalid symbols, if it does it returns true
function checkStringContent(str){
    const regex = /[^a-zåäöA-ZÅÄÖ]/g;
    if(regex.test(str)){
        return true;
    }
    else{
        return false;
    }
}

function capitalizeFirstLetter(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}