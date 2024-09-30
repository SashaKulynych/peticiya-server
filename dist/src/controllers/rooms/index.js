"use strict";
exports.__esModule = true;
exports.roomConnection = void 0;
var index_1 = require("../../../index");
var utils_1 = require("../../utils");
var users_1 = require("../users");
var actions_1 = require("./actions");
var constants_1 = require("../../common/constants");
var roomConnection = function (socket) {
    socket.on(constants_1.SOCKETS_ROOM.JOIN, function (_a, callback) {
        (0, utils_1.errorHandler)(callback, function () {
            var socketQuery = socket.handshake.query;
            var room = (0, actions_1.getRoom)(socketQuery.roomId);
            var user = (0, users_1.getUser)(socketQuery.userId);
            room = (0, actions_1.putUserInRoom)(room.id, user.id);
            room = (0, actions_1.setUserOnline)(room.id, user.id);
            socket.join(room.id, function () {
                var roomData = (0, actions_1.getRoomData)(room.id);
                index_1.io.to(room.id).emit(constants_1.SOCKETS_ROOM.DATA, roomData);
                callback({
                    success: true,
                    result: {
                        roomData: roomData,
                        user: user
                    }
                });
            });
        });
    });
};
exports.roomConnection = roomConnection;
