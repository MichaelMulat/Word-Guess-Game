var numWins = 0;
var numLosses = 0;


window.onload = HangmanGame();
// Use this functon array to create blank spaces in the HTML #missing-letters
function HangmanGame(){

    var numGuesses = 10;
    // Start the game
    // pick a random word from the array
    var artists = ["Dali", "picasso", "Monet", "warhol", "kahlo", "munch", "caravaggio", "goya", "basquiat", "Neel", "walker", "wiley", "lawrence", "shinobare"];
    var randomNum = (Math.floor(Math.random() * artists.length));
    var wordToGuess = artists[randomNum].toUpperCase();
    console.log("Word to guess: " + wordToGuess);

    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // create underscores to represent the missing letters of the word
    var blankWord = [];
    var wrongLetters = [];

    

    var instructionsElem = document.getElementById("instructions");
    var missingLettersElem = document.getElementById("missing-letters");
    var wrongLettersElem = document.getElementById("wrong_letters");
    var numWinsElem = document.getElementById("win-numbers");
    var numLossesElem = document.getElementById("loss-numbers");
    var numGuessesElem = document.getElementById("try-numbers");
    var lowTriesElem = document.getElementById("try-score-board");


    createBlanks(wordToGuess);
    missingLettersElem.innerHTML = blankWord.join(" ");

    resetUI();


    function resetUI(){
        instructionsElem.textContent = "Press any letter key to get started!"
        numGuessesElem.textContent = numGuesses;
        wrongLettersElem.textContent = "Wrong Letters: "
        lowTriesElem.style.backgroundColor = "black";
    }
   
    


// User chooses a key
document.onkeyup = function (event) {

    var playerGuess = event.key.toUpperCase();
    console.log(playerGuess);

    // Check if the key entered is a letter
    if (alphabet.includes(playerGuess.toLowerCase())) {
        
        //Check if the playerGuess is already used - is not in either arrays already 
        if (!blankWord.includes(playerGuess) && !wrongLetters.includes(playerGuess)) { 

            // if the guess is in the secret word
            if (wordToGuess.includes(playerGuess)){
                // finds all its positions
                var guessIndex = findIndicies(wordToGuess, playerGuess);

                //use them to update the blank array
                for (j = 0; j < guessIndex.length; j++){
                    var temp = guessIndex[j];
                    blankWord[temp] = playerGuess;
                }

                // update the html and give user feedback
                instructionsElem.innerHTML = "Good Job!"
                missingLettersElem.innerHTML = blankWord.join(" ");

                if (blankWord.join("") == wordToGuess){
                    numWins++;
                    numWinsElem.innerHTML= numWins;
                    instructionsElem.innerHTML = "Great, Let's play again!"
                    HangmanGame();

                }
            
            } else {

                wrongLetters.push(playerGuess);
                wrongLettersElem.innerHTML = "Wrong Letters: " + wrongLetters.join(" ");
                numGuesses--;
                instructionsElem.innerHTML = "Oops! Try another letter."
                numGuessesElem.innerHTML = numGuesses;

                // if no tries left - restart
                if (numGuesses == 0) {
                    numLosses++;
                    numLossesElem.innerHTML = numLosses;

                    HangmanGame();
                } else if(numGuesses <= 3){
                    lowTriesElem.style.backgroundColor = "red";
                }
            
            }
        
        } 

        else {
            instructionsElem.innerHTML = playerGuess + " has already been used."
        }
    }

    else {
        console.log("not a letter");
        instructionsElem.innerHTML = "That is not a letter."
    }

}

    function createBlanks(aString) {
        for (i = 0; i < aString.length; i++) {
            blankWord.push("_")
        }
        return blankWord
    }


    function findIndicies(aWord, character) {
        var indicies = [], i;
        for (i = 0; i < aWord.length; i++) {
            if (aWord[i] === character)
                indicies.push(i);
        }
        return indicies;
    }

}