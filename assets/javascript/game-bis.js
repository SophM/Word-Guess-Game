// ==================================
// Variables
// ==================================

// array with the possible words to guess
var possibleWords = ["mountain", "shrimp", "squirrel", "chimpanzee", "swamp", "savannah", "tundra", "bumblebee", "owl", "platypus", "forest", "garrigue", "salamander", "taiga", "hippopotamus"];
// variable to keep track of the wins
var wins = 0;
// variable to keep track of the losses
var losses = 0;
// variable to keep track of the number of guesses remaining
var guessesRemaining = 10;
// array to store the letters tried by the player
var lettersTried = [];
// array to store the hidden letters of the selected word
var wordHidden = [];
// variable to keep track of the number of letters guessed by the player
var numberGuessed = 0;
// variable to store the word chosen by the computer
var selectedWord;
// variable to transform the word chosen in an array
var wordInArray;
// variable to store the player's guess
var playerGuess;


// ==================================
// Functions
// ==================================

// function to randomly choose a word within the array of choices and hide the letters
function chooseWord(choices) {
    selectedWord = choices[Math.floor(Math.random()*choices.length)];
    // when the word is chosen we remove it from the array so the same word can't be chosen twice
    choices.splice(choices.indexOf(selectedWord),1);
    return selectedWord;
};

// function to transform the word chosen in an array
// the items in the array being the letters of the word
function stringToArray(string) {
    return (string.split(""));
};

// function to hide the letters of the selected word
function hideLetters() {
    for (var i = 0; i < selectedWord.length; i++) {
        wordHidden[i] = "_";
    }
    return wordHidden;
};

// function to display the hidden word on the screen
// we had .join(" ") to add the items of the array together but separated by a space as specified
function showHiddenWord() {
    document.getElementById("word-to-guess").innerHTML = wordHidden.join(" ");
};

// function to display the letters tried on the screen
function showLettersTriedUpdateNbGuessesLeft(letter) {
    // the letters tried will populate the array if not already presents and the number
    // of remaining guesses will decrease by 1
    if (lettersTried.indexOf(letter) === -1) {
        lettersTried.push(letter);
        guessesRemaining--;
        document.getElementById("letters-tried").textContent = lettersTried.join(" ");
    }
};

// function to reveal the letter when present (or letters if one letter appears more than once)
// and to keep track of the number of letters guessed
// if the user presses a letter already guessed the number of letters guessed won't increase again
function revealGoodGuessUpdateNbGoodGuess(goodGuess) {
    for (var j = 0; j < selectedWord.length; j++) {
        if ((selectedWord[j] === goodGuess) && (wordHidden[j] !== goodGuess)) {
            wordHidden[j] = goodGuess;
            numberGuessed++;
            document.getElementById("word-to-guess").innerHTML = wordHidden.join(" ");
        }
    }
};

// function to update the number of wins on the screen
function updateWins() {
    wins++;
    document.getElementById("number-win").textContent = wins;
};

// function to update the number of losses on the screen
function updateLosses() {
    losses++;
    document.getElementById("number-loss").textContent = losses;
};

// function to show the number of guesses remaining
function showNumberGuessesLeft() {
    document.getElementById("nb-guesses").textContent = guessesRemaining;
};

// function to erase the letters already guessed
function eraseLettersTried() {
    lettersTried = [" "];
    document.getElementById("letters-tried").textContent = lettersTried[0];
};

// function to reset the number of guesses available
function resetGuessesRemaining() {
    guessesRemaining = 10;
    document.getElementById("nb-guesses").textContent = guessesRemaining;
};

// function to reset the number of letters guessed
function resetNbLettersGuessed() {
    numberGuessed = 0;
};


// ==================================
// Main process
// ==================================

// Getting the game ready
// the letters tried are erased from the screen
eraseLettersTried();
// the number of guesses remaining is reset
resetGuessesRemaining();
// computer selects a word from the array of possibilities
selectedWord = chooseWord(possibleWords);
console.log(selectedWord);
console.log(possibleWords);
// the selected word is transformed in an array
wordInArray = stringToArray(selectedWord);
console.log(wordInArray);
// the letters of the selected word are hidden
wordHidden = hideLetters();
// show the hidden word on the screen
showHiddenWord();

// Pressing any key to start the game
document.onkeyup = function(event) {

    // the player chooses a letter by pressing a key on the keyboard
    playerGuess = event.key;
    
    // if there are still letters to guess and if the number of guesses
    // remaining is superior at 0, the game keeps going
    if ((numberGuessed < selectedWord.length) && (guessesRemaining > 0)) {

        // if the player chooses a letter that is not part the word,
        if (wordInArray.indexOf(playerGuess) === -1) {
            // the letter tried is displayed on the screen and the number of guesses 
            // decreases by 1 (if letter hasn't been already proposed)
            showLettersTriedUpdateNbGuessesLeft(playerGuess);
            // and the new number of guesses is displayed on the screen
            showNumberGuessesLeft();

            // if the player ran out of guesses, he losses
            if (guessesRemaining === 0) {
                // the number of losses increase by 1 and
                // the new number is displayed on the screen
                updateLosses();
                // the game starts over...
                // the number of letters guessed is set to zero
                resetNbLettersGuessed();
                // the letters tried are erased from the screen
                eraseLettersTried();
                // the number of guesses remaining is set to 10
                resetGuessesRemaining();
                // computer selects a new word
                selectedWord = chooseWord(possibleWords);
                console.log(selectedWord);
                console.log(possibleWords);
                // the selected word is transformed in an array
                wordInArray = stringToArray(selectedWord);
                // the letters of the selected word are hidden
                wordHidden = hideLetters();
                // show the hidden word on the screen
                showHiddenWord();
            }

        // if the letter tried is part of the word,
        } else { 
            // the good guess is displayed at the right place on the word hidden on the screen
            // and the number of letters guessed increases by 1
            revealGoodGuessUpdateNbGoodGuess(playerGuess);

            // if the player has guessed all the letters, he wins
            if (numberGuessed === selectedWord.length) {
                // the number of wins increases by 1 and
                // the new number is displayed on the screen
                updateWins();
                // the game starts over...
                // the number of letters guessed is set to zero
                resetNbLettersGuessed();
                // the letters tried are erased from the screen
                eraseLettersTried();
                // the number of guesses remaining is set to 10
                resetGuessesRemaining();

                
                // computer selects a word
                selectedWord = chooseWord(possibleWords);
                console.log(selectedWord);
                console.log(possibleWords);
                // the selected word is transformed in an array
                wordInArray = stringToArray(selectedWord);
                // the letters of the selected word are hidden
                wordHidden = hideLetters();
                // show the hidden word on the screen
                showHiddenWord();
            }
        }

    }
};