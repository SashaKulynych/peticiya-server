"use strict";
exports.__esModule = true;
var actions_1 = require("../controllers/rooms/actions");
var link = '/room';
exports["default"] = (function (router) {
    router.get(link, function (req, res) {
        var room = (0, actions_1.getRoom)(req.query.id);
        res.send(room);
    });
    router.post(link, function (req, res) {
        var body = req.body;
        var room = (0, actions_1.addRoom)({
            room: body
        });
        res.send(room);
    });
});
