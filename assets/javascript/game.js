// ==================================
// Variables
// ==================================

// array with the possible words to guess
var possibleWords = ["mountain", "shrimp", "squirrel", "chimpanzee", "swamp", "savanna", "tundra", "hamster", "bumblebee", "owl", "platypus", "forest", "meerkat", "salamander", "hippopotamus"];
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

// // Array to associate a picture to the selected word when the player guessed it
var pictures = [
    {w: "mountain", s: "assets/images/mountains.jpg"},
    {w: "shrimp", s: "assets/images/shrimp.jpg"},
    {w: "squirrel", s: "assets/images/squirrel.jpg"},
    {w: "chimpanzee", s: "assets/images/chimpanzee.jpg"},
    {w: "swamp", s: "assets/images/swamp.jpg"},
    {w: "savanna", s: "assets/images/savanna.jpg"},
    {w: "tundra", s: "assets/images/tundra.jpg"},
    {w: "hamster", s: "assets/images/hamster.jpg"},
    {w: "bumblebee", s: "assets/images/bumblebee.jpg"},
    {w: "owl", s: "assets/images/owl.jpg"},
    {w: "platypus", s: "assets/images/Duckbilled_platypus.jpg"},
    {w: "forest", s: "assets/images/forest.jpg"},
    {w: "meerkat", s: "assets/images/meerkat.jpg"},
    {w: "salamander", s: "assets/images/salamander.jpg"},
    {w: "hippopotamus", s: "assets/images/hippo.jpg"},
]

// Array to associate a fun fact about the selected word when the player guessed it
var facts = [
    {w: "mountain", s: "About 80% of our planet's fresh water originates in the mountains."},
    {w: "shrimp", s: "Several shrimp species, known as cleaners, safely venture inside the open mouths of fishes to remove bloodsucking parasites."},
    {w: "squirrel", s: "Squirrels can find food buried beneath a foot of snow. They usually don’t dig up all of their buried nuts, which results in more trees!"},
    {w: "chimpanzee", s: "We, Homo sapiens, share 98.4% of our DNA with chimpanzees."},
    {w: "swamp", s: "Swamps are like nature's paper towels because they soak up water when it rains a lot. They help keep the land around them from flooding."},
    {w: "savanna", s: "During the wet season, which lasts about six months, a savanna can get anywhere from 20-50 inches of rain."},
    {w: "tundra", s: "Trundras are the coldest and one of the largest ecosystems on Earth. They cover about one-fifth of the land on the planet."},
    {w: "hamster", s: "Hamsters' top speed: 4 mph. They run as fast as humans walk!"},
    {w: "bumblebee", s: "Bumblebees' metabolism is so fast that they’re always only about 40 minutes from starving – even on a full stomach!"},
    {w: "owl", s: "Unlike most other owls, snowy owls are are active and hunt during the day and night."},
    {w: "platypus", s: "It is one of the few venomous mammals; the male Platypus has a spur on the hind foot, which delivers a poison capable of causing severe pain to humans."},
    {w: "forest", s: "More than 25% of the medicines we use originate in rainforest plants"},
    {w: "meerkat", s: "The baby meerkats go to school like us! It is where they learn how to eat poisonous scorpions, their favorite food!"},
    {w: "salamander", s: "Salamanders have super-powers. They can regenerate their brain, heart, parts of their eyes, limbs and tails!"},
    {w: "hippopotamus", s: "Hippos are great swimmers. They can hold their breath for up to 5 minutes underwater!"},
]


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
    // to reset the wordHidden array - so it doesn't keep the letters of the previous word
    // if the new word to guess is smaller
    wordHidden = [];
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

// function to associate the picture representing the selected word if the word is guessed
function displayPicture(word) {
    for (var i = 0; i < pictures.length; i++) {
        if (pictures[i].w === word) {
            document.getElementById("pic").setAttribute("src", pictures[i].s);
        }
    }
};

// function to associate the fun fact about the selected word if the word is guessed
function displayFact(word) {
    for (var i = 0; i < facts.length; i++) {
        if (facts[i].w === word) {
            document.getElementById("fun-fact").innerHTML = facts[i].s;
        }
    }
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
console.log(wordHidden);
// show the hidden word on the screen
showHiddenWord();

// Pressing any key to start the game
document.onkeyup = function(event) {

    // the player chooses a letter by pressing a key on the keyboard
    playerGuess = event.key;
    // store the code of the key pressed
    var userKeyCode = event.keyCode;

    //if the key pressed is a letter - using the unicode of the letter a and z
    if (userKeyCode >= 65 && userKeyCode <= 90) {
    
        // if there are still letters to guess and if the number of guesses
        // remaining is superior to 0, the game keeps going
        if ((numberGuessed < selectedWord.length) && (guessesRemaining > 0)) {

            // if the player chooses a letter that is not part the word,
            if (wordInArray.indexOf(playerGuess) === -1) {
                // the letter tried is displayed on the screen and the number of guesses 
                // decreases by 1 (if letter hasn't been already proposed)
                showLettersTriedUpdateNbGuessesLeft(playerGuess);
                // and the new number of guesses is displayed on the screen
                showNumberGuessesLeft();

                // if the player ran out of guesses, she/he losses
                if (guessesRemaining === 0) {
                    // the number of losses increases by 1 and
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
                    console.log(wordInArray);
                    // the letters of the selected word are hidden
                    wordHidden = hideLetters();
                    console.log(wordHidden);
                    // show the hidden word on the screen
                    showHiddenWord();
                }

            // if the letter tried is part of the word,
            } else { 
                // the good guess is displayed at the right place on the word hidden on the screen
                // and the number of letters guessed increases by 1
                revealGoodGuessUpdateNbGoodGuess(playerGuess);

                // if the player has guessed all the letters, she/he wins
                if (numberGuessed === selectedWord.length) {
                    // the number of wins increases by 1 and
                    // the new number is displayed on the screen
                    updateWins();
                    // a picture represented the word guessed is displayed
                    displayPicture(selectedWord);
                    // a fun fact about the word guessed is displayed
                    displayFact(selectedWord);
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
                    console.log(wordInArray);
                    // the letters of the selected word are hidden
                    wordHidden = hideLetters();
                    console.log(wordHidden);
                    // show the hidden word on the screen
                    showHiddenWord();
                }
            }

        }
    
    // if the key pressed is not a letter, alert the player to only press letters!
    } else {
        alert("Please only press letters!");
    }

    // if the array of possible words is empty, re-populate it
    if (possibleWords.length === 0) {
        possibleWords = ["mountain", "shrimp", "squirrel", "chimpanzee", "swamp", "savanna", "tundra", "hamster", "bumblebee", "owl", "platypus", "forest", "meerkat", "salamander", "hippopotamus"];
    }
    
};