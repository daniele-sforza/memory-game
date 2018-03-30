# Memory Game

### Instructions

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

------

### Scores

Player performance is tracked with number of moves, a timer for the game duration and a star rating:

- 3 stars - less than 15 moves
- 2 stars - between 15 and 20 moves
- 1 star - more than 20 moves

At the end of the game, the player gets a message with the game statistics and the choice to save the score in a local leaderboard. After saving the leaderboard is shown.

Near the timer there's a restart button to shuffle the cards and reset scores.

------

### Saves

During the game, the state of the deck and the scores are saved in the browser to be reloaded the next time the page is opened.

The leaderboard is also saved locally in the browser and it displays the best 5 scores.

------

### Requirements

This game works in all modern desktop and mobile browsers, access to local storage is required.

[Font Awesome](https://fontawesome.com/) icons and [Google Fonts](https://fonts.google.com/) used in the project are loaded directly from the page.

Background image from [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/) is included.

##### Known issues

When loading locally in Microsoft Edge the project can't access local storage and breaks the page. Loading from a web server works as intended.

Next version will add a check to skip local storage if not supported by the browser.