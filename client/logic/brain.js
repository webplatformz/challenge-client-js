'use strict';

let Validation = require('../shared/validation/validation');

let Brain = {
    chooseTrumpf: function (handcards, mnemonic, isGeschoben) {
        let gameType = {
            "mode": "TRUMPF",
            "trumpfColor": "HEARTS"
        };
        return gameType;
    },
    chooseCard: function (handcards, mnemonic, tableCards) {
        let validCards = this.getPossibleCards(handcards, mnemonic, tableCards);
        return validCards[0];
    },
    getPossibleCards: function (handCards, mnemonic, tableCards) {
        let validation = Validation.create(mnemonic.gameType.mode, mnemonic.gameType.trumpfColor);
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