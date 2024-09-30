"use strict";
exports.__esModule = true;
exports.chatConnection = exports.getChatRoomId = void 0;
var uuid_1 = require("uuid");
var users_1 = require("../../controllers/users");
var utils_1 = require("../../utils");
var index_1 = require("../../../index");
var constants_1 = require("../../common/constants");
var getChatRoomId = function (roomId) {
    return "chat-".concat(roomId);
};
exports.getChatRoomId = getChatRoomId;
var chatConnection = function (socket) {
    socket.on(constants_1.SOCKETS_CHAT.JOIN, function (_a, callback) {
        var socketQuery = socket.handshake.query;
        (0, utils_1.errorHandler)(callback, function () {
            var roomId = socketQuery.roomId;
            var userId = socketQuery.userId;
            socket.join((0, exports.getChatRoomId)(roomId));
            var user = (0, users_1.getUser)(userId);
            var systemMessage = {
                id: (0, uuid_1.v4)(),
                message: "User ".concat(user.name, " join"),
                userId: userId,
                createDate: new Date().toUTCString(),
                type: 'system'
            };
            socket.broadcast
                .to((0, exports.getChatRoomId)(roomId))
                .emit(constants_1.SOCKETS_CHAT.CHAT, systemMessage);
        });
    });
    socket.on(constants_1.SOCKETS_CHAT.MESSAGE, function (_a, callback) {
        var message = _a.message;
        var socketQuery = socket.handshake.query;
        (0, utils_1.errorHandler)(callback, function () {
            var messageData = {
                id: (0, uuid_1.v4)(),
                message: message,
                userId: socketQuery.userId,
                createDate: new Date().toUTCString(),
                type: 'user'
            };
            index_1.io.to((0, exports.getChatRoomId)(socketQuery.roomId)).emit(constants_1.SOCKETS_CHAT.CHAT, messageData);
        });
    });
};
exports.chatConnection = chatConnection;
