const values = [[1, 11], 2, 3, 4, 5, 6, 7, 8, 9, 10 ,10 ,10 ,10];
class Card {
    constructor(face, suit, faceup) {
        this.face = face;
        this.suit = suit;
        this.faceup = faceup;
    }
    turnFaceup() {
        this.faceup = true;
    }
}