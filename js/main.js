// This array holds the values of the cards.
// Note that Ace is an array of 2 values. 
// Aces are worth either 1 or 11, so the value must be selected at runtime.
const values = [[1, 11], 2, 3, 4, 5, 6, 7, 8, 9, 10 ,10 ,10 ,10];

// This array holds the possible face values of the cards.
// The array is set up to be able to identify the cards as classes.
// This allows for ease of use with cardstarter.css.
// It is ordered the same as the values array.
const faces = ['A', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10', 'J', 'Q', 'K'];

// This array holds the possible suits that a card can be.
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];



// Is this actually needed?  Might be a simpler way.
// class Card {
//     constructor(face, suit, value, faceup) {
//         this.face = face;
//         this.suit = suit;
//         this.value = value;
//         this.faceup = faceup;
//     }
//     turnFaceup() {
//         this.faceup = true;
//     }
// }
const playerHandEl = document.getElementById('player-hand');
for (let i = 0; i < 5; i++) {
    const newEl = document.createElement('div');
    newEl.classList.add(`spades`, `card`, `large`, faces[i]);
    playerHandEl.append(newEl);
}
