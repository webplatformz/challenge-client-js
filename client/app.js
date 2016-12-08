'use strict';

let Connection = require('./connection');
let Bot = require('./bot');

let args = process.argv.slice(2);
let serverConnectionString = args[0];

let bot1 = Bot.create("JS-Bot"); //CHALLENGE2017: Set name from registration

let conn1 = Connection.create(serverConnectionString, bot1);