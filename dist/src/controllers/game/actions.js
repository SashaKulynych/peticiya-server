"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getGame = exports.gameMove = exports.gameNextMove = exports.newQuestion = exports.generateGame = void 0;
var uuid_1 = require("uuid");
var utils_1 = require("../../utils");
var users_1 = require("../users");
var games = {};
var hostImage = "".concat(utils_1.host, "source/mems/");
var generateGame = function (room) {
    var id = (0, uuid_1.v4)();
    var data = {
        id: id,
        roomId: room.id,
        users: {},
        questions: __spreadArray([], utils_1.questions, true),
        game: {
            guestion: '',
            cards: []
        }
    };
    var pictures = __spreadArray([], utils_1.mems, true);
    var roomUsers = (0, users_1.getUsersInRoom)(room.id);
    roomUsers.forEach(function (user) {
        var cards = [];
        [0, 1, 2].forEach(function () {
            var i = (0, utils_1.getRandomInt)(0, pictures.length);
            cards.push({
                id: (0, uuid_1.v4)(),
                picture: "".concat(hostImage).concat(pictures[i])
            });
            pictures.splice(i, 1);
        });
        data.users[user.id] = {
            cards: cards
        };
    });
    var game = (0, exports.newQuestion)(data);
    games[id] = game;
    return game;
};
exports.generateGame = generateGame;
var newQuestion = function (data) {
    var i = (0, utils_1.getRandomInt)(0, data.questions.length);
    data.game.cards = [];
    data.game.guestion = data.questions[i];
    data.questions.splice(i, 1);
    return data;
};
exports.newQuestion = newQuestion;
var gameNextMove = function (gameId) {
    var game = (0, exports.getGame)(gameId);
    var data = (0, exports.newQuestion)(game);
    return data;
};
exports.gameNextMove = gameNextMove;
var gameMove = function (data) {
    var gameId = data.gameId, userId = data.userId, cardId = data.cardId;
    var game = (0, exports.getGame)(gameId);
    var user = game.users[userId];
    if (user) {
        var i = user.cards.findIndex(function (v) { return v.id === cardId; });
        if (i !== -1) {
            game.game.cards.push({
                userId: userId,
                card: user.cards[i]
            });
            user.cards.splice(i, 1);
        }
    }
    else {
        throw "User not found!";
    }
    return game;
};
exports.gameMove = gameMove;
var getGame = function (gameId) {
    var game = games[gameId];
    if (game) {
        return game;
    }
    else {
        throw "Game not found!";
    }
};
exports.getGame = getGame;
