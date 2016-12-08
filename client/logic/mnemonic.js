'use strict';
let _ = require('lodash');
let Card = require('./../shared/deck/card');

let Mnemonic = {
    cardsInHands: [],
    cardsAtTable: [],
    geschoben: false,
    reset: function () {
        this.cardsAtTable = [];
        this.cardsInHands = [];
    },
    gameMode: function (gameType) {
        this.geschoben = gameType.mode === "SCHIEBE"; //just remember if it's a geschoben match
        this.gameType = gameType;
    },
    playedCards: function (cardsOnTable) {
        //remove from hands
        this.cardsInHands = this.cardsInHands.filter(function (card) {
            if (!this.cardIsInArray(card, cardsOnTable)) {
                return true;
            }
        }, this);
        this.cardsAtTable = cardsOnTable;
    }
};

let create = function () {
    let mnemonic = Object.create(Mnemonic);
    mnemonic.reset();
    return mnemonic;
};

module.exports = {
    create
};