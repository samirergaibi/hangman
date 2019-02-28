

// --References--
// index.html
const gameExplanation = document.getElementById("game-explanation");
const nextBtn = document.getElementById("next-btn");
const hangmanHeading = document.getElementById("hangman-heading");
const executionerName = document.getElementById("executioner");
const playerName = document.getElementById("player");
const firstStage = document.getElementById("first-stage");
const secondStage = document.getElementById("second-stage");
const playerMsg = document.getElementById("player-msg")
const executionerMsg = document.getElementById("executioner-msg");
const errorMsg = document.getElementById("error-msg");

nextBtn.addEventListener("click", function(){
    if(checkStringContent(executionerName.value) || checkStringContent(playerName.value)){
        errorMsg.innerText = "Namnen får bara innehålla bokstäver!";
    }
    else if(!executionerName.value || !playerName.value){
        errorMsg.innerText = "Du måste fylla i namn för spelarna!";
    }
    else{
        errorMsg.style.display = "none";
        hangmanHeading.innerText = "HÄNGA " + playerName.value.toUpperCase();
        gameExplanation.style.display = "none";
        firstStage.style.display = "none";
        secondStage.style.display = "block";
        playerMsg.innerHTML = "<b>" + capitalizeFirstLetter(playerName.value) + "</b>" + " var god och blunda eller titta bort!";
        executionerMsg.innerHTML = "<b>" + capitalizeFirstLetter(executionerName.value) + "</b>" + " var god och välj ett ord!";
    }
}, false)

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