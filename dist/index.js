"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.io = void 0;
var http = require('http');
var express = require('express');
var cors = require('cors');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var utils_1 = require("./src/utils");
var router_1 = __importDefault(require("./src/router"));
var chat_1 = require("./src/controllers/chat");
var game_1 = require("./src/controllers/game");
var rooms_1 = require("./src/controllers/rooms");
var actions_1 = require("./src/controllers/rooms/actions");
var users_1 = require("./src/controllers/users");
var constants_1 = require("./src/common/constants");
var app = express();
app.use(express.static('public'));
app.use('/source', express.static('src/source'));
app.use(cors());
app.use(bodyParser.json());
app.use(router_1["default"]);
var server = http.createServer(app);
exports.io = socketio(server);
exports.io.on('connect', function (socket) {
    (0, chat_1.chatConnection)(socket);
    (0, game_1.gameConnection)(socket);
    (0, rooms_1.roomConnection)(socket);
    socket.on('disconnect', function () {
        var socketQuery = socket.handshake.query;
        var room = (0, actions_1.getRoom)(socketQuery.roomId);
        var user = (0, users_1.getUser)(socketQuery.userId);
        room = (0, actions_1.setUserOffline)(room.id, user.id);
        var roomData = (0, actions_1.getRoomData)(room.id);
        exports.io.to(room.id).emit(constants_1.SOCKETS_ROOM.DATA, roomData);
    });
});
server.listen(process.env.PORT || 5000, function () {
    console.log("Server has started.");
});
(0, utils_1.getCardsFromDir)();
(0, utils_1.getQuestionsFromTxtFile)();
