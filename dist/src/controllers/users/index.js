"use strict";
exports.__esModule = true;
exports.getUsersInRoom = exports.removeUser = exports.getUser = exports.addUser = void 0;
var uuid_1 = require("uuid");
var actions_1 = require("../rooms/actions");
var users = {};
var addUser = function (_a) {
    var name = _a.name;
    var user = { id: (0, uuid_1.v4)(), name: name.trim() };
    users[user.id] = user;
    return user;
};
exports.addUser = addUser;
var getUser = function (id) {
    var user = users[id];
    if (user) {
        return user;
    }
    else {
        throw 'User not found!';
    }
};
exports.getUser = getUser;
var removeUser = function (id) {
    var user = (0, exports.getUser)(id);
    delete users[id];
    return user;
};
exports.removeUser = removeUser;
var getUsersInRoom = function (roomId) {
    var room = (0, actions_1.getRoom)(roomId);
    return room.usersIds.map(function (userId) { return (0, exports.getUser)(userId); });
};
exports.getUsersInRoom = getUsersInRoom;
