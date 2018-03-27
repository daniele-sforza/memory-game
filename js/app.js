// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// Create a list that holds all the cards
let cards = ['fab fa-html5', 'fab fa-css3-alt', 'fab fa-google', 'fab fa-js', 'fab fa-react', 'fab fa-github', 'fab fa-slack', 'fab fa-stack-overflow', 'fab fa-html5', 'fab fa-css3-alt', 'fab fa-google', 'fab fa-js', 'fab fa-react', 'fab fa-github', 'fab fa-slack', 'fab fa-stack-overflow'];


// create a list of open cards
let openCards = [];


// create moves counter
let moves = 0;


// rating in stars
let rating = 3;


// create timer
let start = 0;
let timer;


// game in progress flag
let isPlaying = false;


// matched pairs counter
let matched = 0;


// initialize new game after loading the DOM
document.addEventListener('DOMContentLoaded', newGame);


// deck selector
const scorePanel = document.querySelector('.score-panel');
const deck = document.querySelector('.deck');
const results = document.querySelector('.results');
const score = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');


// set reset buttons
document.querySelector('.restart').addEventListener('click', newGame);
document.querySelector('.btn-restart').addEventListener('click', newGame);


// starts a new game
function newGame() {
  // shuffle the list of cards
  cards = shuffle(cards);

  // game not started yet
  isPlaying = false;

  // reset timer
  clearInterval(timer);
  timerDisplay.textContent = "00:00";

  // reset moves and stars
  moves = 0;
  setMoves(moves);

  // empty list of open cards
  openCards = [];

  // reset matched pairs counter
  matched = 0;

  // delete old cards
  document.querySelectorAll('.card').forEach(function(card) {
    card.remove();
  });

  // show deck and hide results
  scorePanel.style.display = "block";
  deck.style.display = "flex";
  results.style.display = "none";

  // loop through each card and create the HTML
  let cardFragment = document.createDocumentFragment();
  for (let i = 0; i < cards.length; i++) {
    let newCard = document.createElement('li');
    newCard.className = "card";
    newCard.innerHTML = `<i class="${cards[i]}"></i>`;
    cardFragment.appendChild(newCard);
  }
  deck.appendChild(cardFragment);

  // set up the event listener for the cards
  deck.addEventListener('click', checkCard);
}


// check the card
function checkCard(evnt) {
  // check if user clicked on a card that is not already opened or already matched and no more than 2 cards open
  // show the card, add it to the "opened cards" list
  // if it's the first move start the timer
  if ((evnt.target.nodeName === 'LI') && (!evnt.target.classList.contains('open')) && (!evnt.target.classList.contains('match')) && (openCards.length < 2)) {
    openCard(evnt.target);
    openCards.push(evnt.target);
    if (!isPlaying) {
      start = Date.now();
      timer = setInterval(gameTimer, 1000);
      isPlaying = true;
    }

    // if there are 2 opened cards, increment the moves counter and check if the cards match
    // YES: lock cards in open position
    // NO: hide the cards
    if (openCards.length === 2) {
      setMoves(++moves);
      if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        lockCards(openCards[0], openCards[1]);
      } else {
        closeCards(openCards[0], openCards[1]);
      }
    }
  }
}


// increment moves counter and check score for stars rating
function setMoves(counter) {
  document.querySelector('.moves').textContent = counter;
  let stars = document.querySelectorAll('.stars li i');

  if (counter === 0) {
    stars.forEach(function(star) {
      star.className = "fas fa-star";
      rating = 3;
    })
  }
  if (counter === 15) {
    stars[2].classList.replace('fas', 'far');
    rating = 2;
  }
  if (counter === 20) {
    stars[1].classList.replace('fas', 'far');
    rating = 1;
  }
}


// display the timer
function gameTimer() {
  let now = Date.now() - start;
  let seconds = Math.floor((now / 1000) % 60).toString();
  let minutes = Math.floor(now / 1000 / 60).toString();
  timerDisplay.textContent = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}


// display the card's symbol
function openCard(card) {
  card.classList.add('open');
}


// hide the cards
function closeCards(cardOne, cardTwo) {
  setTimeout(function() {
    cardOne.className = 'card close';
    cardTwo.className = 'card close';
  }, 500);

  setTimeout(function() {
    cardOne.classList.remove('close');
    cardTwo.classList.remove('close');
    openCards = []; // reset open cards list
  }, 1500);
}


// lock matched cards
function lockCards(cardOne, cardTwo) {
  cardOne.className = 'card match';
  cardTwo.className = 'card match';
  openCards = []; // reset open cards list
  matched++;
  if (matched === 8) {
    clearInterval(timer);
    setTimeout(function() {
      showResults();
    }, 500)
  }
}


// show game stats
function showResults() {
  scorePanel.style.display = "none";
  deck.style.display = "none";
  results.style.display = "flex";
  score.innerHTML = `<tr>
    <td>Rating</td>
    <td>${rating} stars</td>
  </tr>
  <tr>
    <td>Moves</td>
    <td>${moves}</td>
  </tr>
  <tr>
    <td>Time</td>
    <td>${timerDisplay.textContent}</td>
  </tr>`;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
