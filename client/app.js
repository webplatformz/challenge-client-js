'use strict';

let Connection = require('./connection');
let Bot = require('./bot');


let bot1 = Bot.create("Romeo");

let conn1 = Connection.create('127.0.0.1:3000', bot1);