// This array holds the values of the cards.
// Note that Ace is an array of 2 values. 
// Aces are worth either 1 in this array.
// Whether they are worth 11 will be calculated at runtime.
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,10 ,10 ,10];

// This array holds the possible face values of the cards.
// The array is set up to be able to identify the cards as classes.
// This allows for ease of use with cardstarter.css.
// It is ordered the same as the values array.
const faces = ['A', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10', 'J', 'Q', 'K'];

// This array holds the possible suits that a card can be.
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];

// Constructor for the cards.
// Allows all of the data for an individual card to be stored in one place.
class Card {
    constructor(face, suit, value, faceup) {
        this.face = face;
        this.suit = suit;
        this.value = value;
        this.faceup = faceup;
    }
    turnFaceup() {
        this.faceup = true;
    }
}

// Defining score variables
// These variables will be displayed on screen for the player to track.
let playerScore;
let computerScore;

// Defining hands
// These hands will hold card objects.
let playerHand;
let computerHand;

// Defining the used suits and values
let usedCards;

// Defining the winning/welcome message
let winMsg;

// Caching variables
// These caches will be used to run the render function, as well as other functions
const playerHandEl = document.getElementById('player-hand');
const computerHandEl = document.getElementById('computer-hand');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const winMessageEl = document.getElementById('win-msg');

// Init function
// Will be run when the page is loaded
function init() {
    playerScore = 0;
    computerScore = 0;
    playerHand = [];
    computerHand = [];
    usedCards = [];
    winMsg = `Welcome to Blackjack! Press the 'Play' button to begin a game!`
    render();
}

// Render function
// Updates the DOM with all new information.
// This will place new objects onto the GUI.
function render() {
    playerScoreEl.innerText = `Player Score: ${playerScore}`;
    computerScoreEl.innerText = `Dealer Score: ${computerScore}`;
    winMessageEl.innerHTML = `<h2>${winMsg}</h1>`;
    while (playerHandEl.firstChild) {
        playerHandEl.removeChild(playerHandEl.firstChild)
    }
    while (computerHandEl.firstChild) {
        computerHandEl.removeChild(computerHandEl.firstChild)
    }
    playerHand.forEach( (card) => {
        const newEl = document.createElement('div');
        if (card.faceup === false) {
            newEl.classList.add('back-red', 'card', 'large');
        }
        else {
            newEl.classList.add('card', 'large', card.face, card.suit);
        }
        playerHandEl.append(newEl);
    });
    computerHand.forEach( (card) => {
        const newEl = document.createElement('div');
        if (card.faceup === false) {
            newEl.classList.add('back-red', 'card', 'large');
        }
        else {
            newEl.classList.add('card', 'large', card.face, card.suit);
        }
        computerHandEl.append(newEl);
    });
}

// Score calculation function
// Assigns the values of each hand, then runs the render function.
// Contains logic to handle whether an ace is 1 or 11
function calculateScores() {
    let playerTotal = 0;
    let playerHasAce = false;
    let computerTotal = 0;
    let computerHasAce = false;
    playerHand.forEach( (card) => {
        if (!card.faceup) {}
        else if (card.face === 'A' && !playerHasAce) {
            playerHasAce = true;
        }
        else {
            playerTotal += card.value;
        }
    });
    if (playerHasAce) {
        if (playerTotal <= 10){
            playerTotal += 11;
        }
        else {
            playerTotal += 1;
        }
    }
    computerHand.forEach( (card) => {
        if (!card.faceup) {}
        else if (card.face === 'A' && !computerHasAce) {
            computerHasAce = true;
        }
        else {
            computerTotal += card.value;
        }
    });
    if (computerHasAce) {
        if (computerTotal <= 10){
            computerTotal += 11;
        }
        else {
            computerTotal += 1;
        }
    }
    playerScore = playerTotal;
    computerScore = computerTotal;
}

// Function to add a card to the hand
// Takes in the hand to add the card to, and which way it is facing.
// True for faceup, false for facedown.
// Will not add duplicate cards to any hand.
function drawCard(hand, facing) {
    let randomSuit;
    let randomFace;
    let duplicate;
    do {
        duplicate = false;
        randomSuit = Math.floor(Math.random() * 3);
        randomFace = Math.floor(Math.random() * 13);
        usedCards.forEach ( (item) => {
            if (item[0] === randomSuit && item[1] === randomFace) {
                duplicate = true;
            }
        });
    } while (duplicate === true);
    usedCards.push([randomSuit, randomFace]);
    hand.push(new Card(faces[randomFace], suits[randomSuit], values[randomFace], facing));
}

// Determine Winner function
// Currently will be run at any time when the winner must be determined
// May later be separated into different 'determine winner' functions
function determineWinner() {
    if (playerScore > 21) {
        winMsg = `You have busted.  The dealer wins!`;
    }
    else if (computerScore > 21) {
        winMsg = `The dealer has busted.  You win!`;
    }
    else if (playerScore === computerScore) {
        winMsg = `Both players have ${playerScore}.  Tie!`;
    }
    else if (playerScore > computerScore) {
        winMsg = `You have ${playerScore}, the dealer has ${computerScore}.  You win!`;
    }
    else {
        winMsg = `You have ${playerScore}, the dealer has ${computerScore}.  The dealer wins!`;
    }
}

// Initializing the game when the webpage loads
init();

function renderTestOne() {
    while (playerHand.length > 0) {
        playerHand.pop();
    }
    while (computerHand.length > 0) {
        computerHand.pop();
    }
    while (usedCards.length > 0) {
        usedCards.pop();
    }
    drawCard(playerHand, true);
    drawCard(playerHand, true);
    drawCard(playerHand, true);
    drawCard(computerHand, false);
    drawCard(computerHand, true);
    drawCard(computerHand, true);
    calculateScores();
    render();
}