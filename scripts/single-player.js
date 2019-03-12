
// -- Initial References --
let preGame = document.getElementById("pre-game-SP");
let duringGame = document.getElementById("during-game-SP");
let afterGame = document.getElementById("after-game-SP");
let heading = document.getElementById("hangman-heading");
let playerName = document.getElementById("player-name");
let startBtn = document.getElementById("start-btn");
let guessBtn = document.getElementById("guess-btn");
let yesBtn = document.getElementById("yes-btn");
let noBtn = document.getElementById("no-btn");
let guessInput = document.getElementById("guess");

let player = {
    name: "",
    score: 0,
}
let robot = {
    name: "ROBOT",
    score: 0,
}


// Array filled with random words
let words = [
    "flaska",
    "bord",
    "vatten",
    "stol",
    "tavla",
    "dator",
    "träd",
    "sommar"
];
// Choose a word and save it in a variable
let gameWord = chooseWord().toUpperCase();
console.log(gameWord);
startBtn.addEventListener("click", function(){
    let gameExplanation = document.getElementById("game-explanation");
    let errorMsg = document.getElementById("error-msg");
    if(!playerName.value){
        errorMsg.innerText = "Du måste fylla i ett namn.";
        errorMsg.style.visibility = "visible";
    }
    else if(checkString(playerName.value)){
        errorMsg.innerText = "Du får endast använda bokstäver mellan a-ö.";
        errorMsg.style.visibility = "visible";
        playerName.value = "";
    }
    else{
        player.name = playerName.value.toUpperCase();
        errorMsg.style.display = "none";
        playerName = playerName.value;
        heading.innerText = "HÄNGA " + player.name;
        gameExplanation.style.display = "none";
        preGame.style.display = "none";
        duringGame.style.display = "block";
        displayWord();
    }
}, false)

// run checkGuessInput() when guessBtn is clicked
guessBtn.addEventListener("click", checkGuessInput, false);

let counter = 0;
let allGuesses = [];
// Check the guess and act accordingly
function checkGuessInput(){
    let errorMsg = document.getElementById("error-msg-guess");
    let guessValue = guessInput.value.toUpperCase();

    if(!guessInput.value){
        errorMsg.innerText = "Du måste ange en gissning.";
        errorMsg.style.visibility = "visible";
    }
    else if(checkString(guessInput.value)){
        errorMsg.innerText = "Du får endast gissa på bokstäver mellan a-ö.";
        errorMsg.style.visibility = "visible";
        guessInput.value = "";
    }
    else if(allGuesses.includes(guessValue)){
        errorMsg.innerText = "Du har redan gissat på denna bokstav."
        errorMsg.style.visibility = "visible";
        guessInput.value = "";
    }
    // If the guess is a letter between a-ö
    else{
        errorMsg.style.visibility = "hidden";
        let wrongChars = document.getElementById("wrong-characters");
        let animation = document.getElementById("hangman-pic");
        let score = document.getElementById("current-score");
        
        // if the word does not contain the letter that was guessed
        if(!gameWord.includes(guessValue)){
            counter++;
            allGuesses.push(guessValue);
            wrongChars.innerHTML += `<p>${guessValue}</p>`;
            animation.src = `images/stages/stage-${counter}.svg`;
            guessInput.value = "";
            // If the user have no tries left do this
            if(counter >= 10){
                console.log("You failed");
                robot.score++;
                heading.innerText = player.name + " HAR BLIVIT HÄNGD!";
                duringGame.style.display = "none";
                afterGame.style.display = "block";
                score.innerHTML = `${player.name}: <b>${player.score}</b> - ${robot.name}: <b>${robot.score}</b>`;
            }
        }
        // If the word contains the letter that was guessed
        else{
            allGuesses.push(guessValue);
            for(let i = 0; i < gameWord.length; i++){
                let currentChar = document.getElementById(`char-${i}`);
                if(gameWord[i] === guessValue){
                    currentChar.innerText = guessValue;
                }
            }
            guessInput.value = "";
            // If the user completed the word do this
            if(getCurrentWord() === gameWord){
                player.score++;
                heading.innerText = player.name + " HAR UNDVIKIT SNARAN!";
                duringGame.style.display = "none";
                afterGame.style.display = "block";
                score.innerHTML = `${player.name}: <b>${player.score}</b> - ${robot.name}: <b>${robot.score}</b>`;
            }
        }
    }
}

yesBtn.addEventListener("click", function(){

}, false);

noBtn.addEventListener("click", function(){
    window.location = "index.html";
}, false)


// --### FUNCTIONS ###--
// Check a string for other values than a-ö
function checkString(str){
    let regex = /[^A-ZÅÄÖa-zåäö]/;
    return regex.test(str);
}
// Chooses a word from the array
function chooseWord(){
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}
// displays the lines of the word on the page
function displayWord(){
    let completeWord = document.getElementById("complete-word");
    for(let i = 0; i < gameWord.length; i++){
        completeWord.innerHTML += `<span id="char-${i}" class="letter">_</span>\n`;
    }
}
// Get the current word that the user has guessed so far
function getCurrentWord(){
    let letters = document.getElementsByClassName("letter");
    let word = "";
    for(let i = 0; i < letters.length; i++){
        word += letters[i].innerText;
    }
    return word;
}
