'use strict';
let Messages = require('./shared/messages/messages');
let MessageType = require('./shared/messages/messageType');
let Brain = require('./logic/brain');
let Card = require('./shared/deck/card');

let Bot = {
    handCards: [],
    incomingMessage: function (message, response) {
        let answer;
        let data = message.data;
        switch (message.type) {
        case MessageType.REQUEST_PLAYER_NAME.name:
            console.log('MyName: ' + this.alias);
            answer = Messages.create(MessageType.CHOOSE_PLAYER_NAME.name, this.alias);
            break;
        case MessageType.REQUEST_SESSION_CHOICE.name:
            answer = Messages.create(MessageType.CHOOSE_SESSION.name, "JOIN_EXISTING", this.sessionName, "TOURNAMENT", false);
            console.log('session choice answer: ' + answer);
            //answer = Messages.create(MessageType.CHOOSE_SESSION.name, "AUTOJOIN", "DeathStar");
            break;
        case MessageType.DEAL_CARDS.name:
            this.handCards = data.map(function (item) {
                return Card.create(item.number, item.color);
            });
            break;
        case MessageType.REQUEST_TRUMPF.name:
            let gameMode = this.brain.chooseTrumpf(this.handCards);
            answer = Messages.create(MessageType.CHOOSE_TRUMPF.name, gameMode);
            break;
        case MessageType.REQUEST_CARD.name:
            let card = this.brain.chooseCard(this.handCards, data);
            answer = Messages.create(MessageType.CHOOSE_CARD.name, card);
            break;
        case MessageType.PLAYED_CARDS.name:
            let lastPlayedCard = data[data.length - 1];
            this.handCards = this.handCards.filter(function (card) {
                return (card.number !== lastPlayedCard.number || card.color !== lastPlayedCard.color)
            });
            break;
        case MessageType.REJECT_CARD.name:
            console.log(" ######   SERVER REJECTED CARD   #######");
            let pickedCard = this.brain.chooseCard(this.handCards);
            console.log(data);
            console.log(pickedCard);
            console.log(this.handCards);
            console.log(this.brain.cardsAtTable);
            console.log(this.brain.gameType.mode + " | " + this.brain.gameType.trumpfColor);
            break;
        case MessageType.BROADCAST_GAME_FINISHED.name:
            //Do nothing with that :-)
            break;
        case MessageType.BROADCAST_SESSION_JOINED.name:
            //Do nothing with that :-)
            break;
        case MessageType.BROADCAST_STICH.name:
            //Do nothing with that :-)
            break;
        case MessageType.BROADCAST_TOURNAMENT_STARTED.name:
            //Do nothing with that :-)
            break;
        case MessageType.BROADCAST_TOURNAMENT_RANKING_TABLE.name:
            //Do nothing with that :-)
            break;
        case MessageType.BROADCAST_TEAMS.name:
            //Do nothing with that :-)
            break;
        case MessageType.BROADCAST_TRUMPF.name:
            this.brain.gameMode(data);
            break;
        case MessageType.BROADCAST_WINNER_TEAM.name:
            //Do nothing with that :-)
            break;
        default:
            console.log("Sorry, i cannot handle this message: " + JSON.parse(message));
        }
        if (answer) {
            response(answer);
        }
    }
};

let create = function (name, sessionName) {
    let bot = Object.create(Bot);
    bot.alias = name;
    bot.sessionName = sessionName || '';
    bot.brain = Brain.create();
    return bot;
};

module.exports = {
    create
};