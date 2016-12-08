'use strict';

let Validation = require('../shared/validation/validation');
let _ = require('lodash');
let Card = require('./../shared/deck/card');

let Brain = {
    geschoben: false,
    chooseTrumpf: function (handcards) {
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
        let validCards = this.getPossibleCards(handcards, tableCards);
        return validCards[0];
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