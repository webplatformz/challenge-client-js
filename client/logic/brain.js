'use strict';

/*
 The Brain is the core decision source when reacting to server requests that need to implement decent choosing logic (card, trumpf or schiäbä).
 This implementation basically responds with either default behaviour or random valid cards.
 */

let Validation = require('../shared/validation/validation');
let Card = require('./../shared/deck/card');

let Brain = {
    geschoben: false,
    chooseTrumpf: function (handcards) {
        //CHALLENGE2017: Implement logic to chose game mode which is best suited to your handcards or schiäbä. Consider that this decision ist quite crucial for your bot to be competitive
        // Use hearts as TRUMPF for now
        let gameType = {
            "mode": "TRUMPF",
            "trumpfColor": "HEARTS"
        };
        return gameType;
    },
    gameMode: function (gameType) {
        this.geschoben = gameType.mode === "SCHIEBE"; //just remember if it's a geschoben match
        this.gameType = gameType;
    },
    chooseCard: function (handcards, tableCards) {
        //CHALLENGE2017: Implement logic to choose card so your bot will beat all the others. Keep in mind that your counterpart is another instance of your bot
        let validCards = this.getPossibleCards(handcards, tableCards);
        return validCards[0]; // Just take the first valid card
    },
    getPossibleCards: function (handCards, tableCards) {
        let validation = Validation.create(this.gameType.mode, this.gameType.trumpfColor);
        let possibleCards = handCards.filter(function (card) {
            if (validation.validate(tableCards, handCards, card)) {
                return true;
            }
        }, this);
        return possibleCards;
    },
    setValidation: function (gameMode, trumpfColor) {
        this.validation = Validation.create(gameMode, trumpfColor);
    }
};

let create = function () {
    let brain = Object.create(Brain);
    return brain;
};

module.exports = {
    create
};