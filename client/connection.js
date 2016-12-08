'use strict';

let WS = require('ws');
let Messages = require('./shared/messages/messages');

let Connection = {};

let create = function (connectionString, bot) {
    let connection = Object.create(Connection);
    connection.bot = bot;
    console.log(`connecting to: ${connectionString}`);
    connection.ws = new WS(`ws://${connectionString}`);
    connection.ws.onmessage = event => {
        console.log('receiving data', event.data);
        let dataObject = JSON.parse(event.data);
        let incoming = Messages.create(dataObject.type, dataObject.data);
        bot.incomingMessage(incoming, function (response) {
            connection.ws.send(JSON.stringify(response));
        });
    };
}

module.exports = {
    create
};