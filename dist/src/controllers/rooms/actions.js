"use strict";
exports.__esModule = true;
exports.setGameToRoom = exports.getRoomData = exports.putUserInRoom = exports.setUserOffline = exports.setUserOnline = exports.changeRoomStatus = exports.getRoom = exports.removeRoom = exports.addRoom = void 0;
var uuid_1 = require("uuid");
var users_1 = require("../users");
var rooms = {};
var addRoom = function (_a) {
    var room = _a.room;
    var name = room.name, limit = room.limit, adminId = room.adminId;
    var id = (0, uuid_1.v4)();
    var newRoom = {
        id: id,
        adminId: adminId,
        name: name.trim().toLowerCase(),
        limit: limit,
        status: 'pending',
        gameId: null,
        usersIds: [adminId],
        onlineUsers: [adminId]
    };
    rooms[id] = newRoom;
    return newRoom;
};
exports.addRoom = addRoom;
var removeRoom = function (id) {
    delete rooms[id];
    return rooms;
};
exports.removeRoom = removeRoom;
var getRoom = function (id) {
    var room = rooms[id];
    if (room) {
        return room;
    }
    else {
        throw ("Room not exist");
    }
};
exports.getRoom = getRoom;
var changeRoomStatus = function (id, status) {
    var room = (0, exports.getRoom)(id);
    room.status = status;
    return room;
};
exports.changeRoomStatus = changeRoomStatus;
var setUserOnline = function (roomId, userId) {
    var room = (0, exports.getRoom)(roomId);
    var i = room.onlineUsers.indexOf(userId);
    if (i === -1) {
        room.onlineUsers.push(userId);
    }
    return room;
};
exports.setUserOnline = setUserOnline;
var setUserOffline = function (roomId, userId) {
    var room = (0, exports.getRoom)(roomId);
    var i = room.onlineUsers.indexOf(userId);
    if (i !== -1) {
        room.onlineUsers.splice(i, 1);
    }
    return room;
};
exports.setUserOffline = setUserOffline;
var putUserInRoom = function (roomId, userId) {
    var room = (0, exports.getRoom)(roomId);
    var i = room.usersIds.indexOf(userId);
    if (i === -1) {
        room.usersIds.push(userId);
    }
    return room;
};
exports.putUserInRoom = putUserInRoom;
var getRoomData = function (roomId) {
    var room = (0, exports.getRoom)(roomId);
    var roomData = {
        room: room,
        users: (0, users_1.getUsersInRoom)(room.id)
    };
    return roomData;
};
exports.getRoomData = getRoomData;
var setGameToRoom = function (roomId, gameId) {
    var room = (0, exports.getRoom)(roomId);
    room.gameId = gameId;
    return room;
};
exports.setGameToRoom = setGameToRoom;
