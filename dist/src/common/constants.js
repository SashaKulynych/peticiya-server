"use strict";
exports.__esModule = true;
exports.SOCKETS_ROOM = exports.SOCKETS_GAME = exports.SOCKETS_CHAT = void 0;
var prefix_chat = 'CHAT_';
exports.SOCKETS_CHAT = {
    JOIN: "".concat(prefix_chat, "JOIN"),
    MESSAGE: "".concat(prefix_chat, "MESSAGE"),
    CHAT: "".concat(prefix_chat, "CHAT")
};
var prefix_game = 'GAME_';
exports.SOCKETS_GAME = {
    NEXT: "".concat(prefix_game, "NEXT"),
    MOVE: "".concat(prefix_game, "MOVE"),
    START: "".concat(prefix_game, "START"),
    GAME: "".concat(prefix_game, "GAME")
};
var prefix_room = 'ROOM_';
exports.SOCKETS_ROOM = {
    JOIN: "".concat(prefix_room, "JOIN"),
    DATA: "".concat(prefix_room, "DATA")
};
