### Word-Guess Game Pseudocode

1. Computer chooses a random word in a list of possible words. The selected word will be displayed on the screen with its letters hidden.

2. Player presses any letter on the keyboard to start the game.

3. If the letter chosen is part of the word, it will be displayed at the right position in the word and the number of letters guessed will increase by 1. If a letter is present multiple times, each of them will be displayed and the number of letters guessed will increase by 1 for each of them.

4. If the letter chosen isn't part of the word, it will be displayed after "letters already tried" and the 
number of guesses remaining is reduced by 1.

5. Steps 2, 3 and 4  are repeated until all the letters of the word have been guessed or the number of guesses is equal to 0.
    
6. If the game finishes because the player guessed the word, he/she gets a point - wins count increases by 1.

7. If the game finishes because the player run out of guesses, he/she doesn't get a point - losses count increase by 1.

8. When the game finishes, the number of guesses remaining is reset to 15 and the letters tried are erased.

9. The computer chooses another word and the game starts over.



