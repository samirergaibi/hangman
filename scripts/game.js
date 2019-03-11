// Objects with name and score and status for each player
let player = {
    name: localStorage.getItem("playerName"),
    status: "player",
    score: 0,
}
let executioner = {
    name: localStorage.getItem("executionerName"),
    status: "executioner",
    score: 0,
}
// If there is a game in progress already set the score to the current game score
if(localStorage.playerScore && localStorage.executionerScore){
    player.score = localStorage.playerScore;
    executioner.score = localStorage.executionerScore;
}

// --References--
const hangmanHeading = document.getElementById("hangman-heading");
const gameWord = localStorage.getItem("gameWord");
const completeWord = document.getElementById("complete-word");

// Clicking home button resets localstorage
let home = document.getElementById("home");
home.addEventListener("click", function(){
    localStorage.clear();
}, false);

function startGame(){
    if(player.name){
        hangmanHeading.innerText = "HÄNGA " + player.name.toUpperCase();
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
let currentScore = document.getElementById("current-score");

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
                player.score++;
                hangmanHeading.innerText = player.name.toUpperCase() + " HAR FLYTT SNARAN!";
                duringGameContent.style.display = "none";
                afterGameContent.style.display = "block";
                currentScore.innerHTML = player.name.toUpperCase() + ":  <b>" + player.score + "</b> - " + executioner.name.toUpperCase() + ": <b>" + executioner.score + "</b>";
            }
            allGuesses.push(guessChar);
        }
        // If the word did not include the guessed character do this.
        else{
            stageCounter++;
            let hangmanAnimation = document.getElementById("hangman-pic");
            // If GAME OVER (player guesses exceeded 10)
            if(stageCounter >= 10){
                executioner.score++;
                hangmanHeading.innerText = player.name.toUpperCase() + " HAR BLIVIT HÄNGD!";
                hangmanAnimation.src = `images/stages/stage-${stageCounter}.svg`;
                duringGameContent.style.display = "none";
                afterGameContent.style.display = "block";
                currentScore.innerHTML = player.name.toUpperCase() + ":  <b>" + player.score + "</b> - " + executioner.name.toUpperCase() + ": <b>" + executioner.score + "</b>";
            }
            else if(stageCounter > 10){
                console.error("Variable StageCounter is going crazy.");
            }
            // Change the hangman animation accordingly.
            else{
                hangmanAnimation.src = `images/stages/stage-${stageCounter}.svg`;
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

// If the players chooses to continue onto round 2
yesBtn.addEventListener("click", function(){
    let holder;
    holder = executioner.name;
    executioner.name = player.name;
    player.name = holder;
    localStorage.setItem("playerName", player.name);
    localStorage.setItem("playerScore", executioner.score);
    localStorage.setItem("executionerName", executioner.name);
    localStorage.setItem("executionerScore", player.score);
    window.location = "index.html";
}, false)
// If the players wants to start over
noBtn.addEventListener("click", function(){
    localStorage.clear();
    window.location = "index.html";
}, false)

function checkCharacterContent(str){
    let regex = /[^a-zåäöA-ZÅÄÖ]/g;
    return regex.test(str);
}