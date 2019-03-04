

// --References--
const hangmanHeading = document.getElementById("hangman-heading");
const executionerName = localStorage.getItem("executionerName");
const playerName = localStorage.getItem("playerName");
const gameWord = localStorage.getItem("gameWord");
const completeWord = document.getElementById("complete-word");


function startGame(){
    if(playerName){
        hangmanHeading.innerText = "HÄNGA " + playerName.toUpperCase();
    }
    else{
        console.log("Could not find the playername.");
    }
    // Add as many elements and underlines as the length of the chosen word.
    for(let i = 0; i < gameWord.length; i++){
        completeWord.innerHTML += `<span id="char-${i}" class="letter">_</span>\n`;
    }    
}
startGame();

// --References--
const guessInput = document.getElementById("guess");
const guessBtn = document.getElementById("guess-btn");
const errorMsg = document.getElementById("error-msg");
let duringGameContent = document.getElementById("during-game");
let afterGameContent = document.getElementById("after-game");

let stageCounter = 0;
let allGuesses = [];
guessBtn.addEventListener("click", function(){
    let guessChar = guessInput.value.toUpperCase();
    let charIndexes = [];
    // if the guessed character is not valid do this.
    if(checkCharacterContent(guessChar)){
        errorMsg.innerText = "Du får endast använda bokstäver mellan a-ö.";
        errorMsg.style.visibility = "visible";
        guessInput.value = "";
    }
    // if the character has already been guessed do this
    else if(allGuesses.includes(guessChar)){
        errorMsg.innerText = "Du har redan gissat på denna bokstav, försök igen.";
        errorMsg.style.visibility = "visible";
        guessInput.value = "";
    }
    else if(!guessChar){
        errorMsg.innerText = "Du måste gissa på en bokstav.";
        errorMsg.style.visibility = "visible";
        guessInput.value = "";
    }
    // if the character is valid and has not already been guessed do this.
    else{
        errorMsg.style.visibility = "hidden";
        // if the word includes the guessed character do this.
        if(gameWord.includes(guessChar)){
            // loop trough the word and push every occurence of the chars index to the array.
            for(let i = 0; i < gameWord.length; i++){
                if(gameWord[i] === guessChar){
                    charIndexes.push(i);
                }
            }
            // Add the character to every place of the complete word.
            for(let i = 0; i < charIndexes.length; i++){
                let currentChar = document.getElementById("char-" + charIndexes[i]);
                currentChar.innerText = guessChar;
                guessInput.value = "";
            }
            // IF GAME WON (Player guessed the entire word)
            let guessedLetters = document.getElementsByClassName("letter")
            let guessedWord = "";
            for(let i = 0; i < guessedLetters.length; i++){
                guessedWord += guessedLetters[i].innerText;
            }
            if(guessedWord === gameWord){
                hangmanHeading.innerText = playerName.toUpperCase() + " HAR FLYTT SNARAN!";
                duringGameContent.style.display = "none";
                afterGameContent.style.display = "block";
            }
        }
        // If the word did not include the guessed character do this.
        else{
            stageCounter++;
            let hangmanAnimation = document.getElementById("hangman-pic");
            // If GAME OVER (player guesses exceeded 10)
            if(stageCounter >= 10){
                hangmanHeading.innerText = playerName.toUpperCase() + " HAR BLIVIT HÄNGD!";
                hangmanAnimation.src = `images/hangman-stages/stage-${stageCounter}.svg`;
                duringGameContent.style.display = "none";
                afterGameContent.style.display = "block";
            }
            else if(stageCounter > 10){
                console.error("Variable StageCounter is going crazy.");
            }
            // Change the hangman animation accordingly.
            else{
                hangmanAnimation.src = `images/hangman-stages/stage-${stageCounter}.svg`;
            }
            // Add the guessed letter to the "wrong-guesses-area".
            allGuesses.push(guessChar);
            let wrongChars = document.getElementById("wrong-characters");
            wrongChars.innerHTML += `<p>${guessChar}</p>`;
            guessInput.value = "";
        }
    }
})

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

yesBtn.addEventListener("click", function(){
    window.location = "index.html";
}, false)

noBtn.addEventListener("click", function(){
    window.location = "index.html";
    window.close();
}, false)

function checkCharacterContent(str){
    let regex = /[^a-zåäöA-ZÅÄÖ]/g;
    return regex.test(str);
}