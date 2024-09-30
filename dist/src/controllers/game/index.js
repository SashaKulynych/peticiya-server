"use strict";
exports.__esModule = true;
exports.gameConnection = void 0;
var actions_1 = require("../../controllers/rooms/actions");
var index_1 = require("../../../index");
var utils_1 = require("../../utils");
var actions_2 = require("./actions");
var constants_1 = require("../../common/constants");
var gameConnection = function (socket) {
    socket.on(constants_1.SOCKETS_GAME.NEXT, function (_a, callback) {
        var gameId = _a.gameId;
        (0, utils_1.errorHandler)(callback, function () {
            var game = (0, actions_2.gameNextMove)(gameId);
            index_1.io.to(game.roomId).emit(constants_1.SOCKETS_GAME.GAME, {
                game: game
            });
            callback({
                success: true, result: {
                    game: game
                }
            });
        });
    });
    socket.on(constants_1.SOCKETS_GAME.MOVE, function (_a, callback) {
        var gameId = _a.gameId, cardId = _a.cardId;
        var socketQuery = socket.handshake.query;
        (0, utils_1.errorHandler)(callback, function () {
            var game = (0, actions_2.gameMove)({ gameId: gameId, userId: socketQuery.userId, cardId: cardId });
            index_1.io.to(game.roomId).emit(constants_1.SOCKETS_GAME.GAME, {
                game: game
            });
            callback({
                success: true, result: {
                    game: game
                }
            });
        });
    });
    socket.on(constants_1.SOCKETS_GAME.START, function (_a, callback) {
        (0, utils_1.errorHandler)(callback, function () {
            var socketQuery = socket.handshake.query;
            var room = (0, actions_1.changeRoomStatus)(socketQuery.roomId, 'in-progress');
            var game = (0, actions_2.generateGame)(room);
            room = (0, actions_1.setGameToRoom)(room.id, game.id);
            var roomData = (0, actions_1.getRoomData)(room.id);
            index_1.io.to(room.id).emit(constants_1.SOCKETS_GAME.GAME, {
                game: game
            });
            index_1.io.to(room.id).emit(constants_1.SOCKETS_ROOM.DATA, roomData);
            callback({
                success: true, result: {
                    room: room,
                    game: game
                }
            });
        });
    });
};
exports.gameConnection = gameConnection;
