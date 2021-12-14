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
    winMsg = `Welcome to Blackjack! Press the 'Play Again' button to begin a game!`
    render();
}

// Render function
// Updates the DOM with all new information.
// This will place new objects onto the GUI.
function render() {
    console.log('render function is online');
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
        newEl.classList.add('card', 'large', card.face, card.suit);
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
// Takes a player's hand as input and returns the value of all of the faceup cards.
// Contains logic to handle whether an ace is 1 or 11
function calculateScore(hand) {

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
    playerHand.push(new Card(faces[0], suits[0], values[0], true));
    playerHand.push(new Card(faces[1], suits[2], values[1], true));
    playerHand.push(new Card(faces[2], suits[3], values[2], true));
    computerHand.push(new Card(faces[0], suits[0], values[0], true));
    computerHand.push(new Card(faces[1], suits[2], values[1], true));
    computerHand.push(new Card(faces[2], suits[3], values[2], true));
    render();
}

function renderTestTwo() {
    while (playerHand.length > 0) {
        playerHand.pop();
    }
    while (computerHand.length > 0) {
        computerHand.pop();
    }
    playerHand.push(new Card(faces[2], suits[1], values[2], true));
    playerHand.push(new Card(faces[10], suits[2], values[10], true));
    playerHand.push(new Card(faces[5], suits[0], values[5], true));
    computerHand.push(new Card(faces[3], suits[0], values[3], true));
    computerHand.push(new Card(faces[11], suits[2], values[11], false));
    computerHand.push(new Card(faces[7], suits[3], values[7], true));
    render();
}