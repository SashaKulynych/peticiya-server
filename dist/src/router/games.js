"use strict";
exports.__esModule = true;
var actions_1 = require("../controllers/game/actions");
var link = '/games';
exports["default"] = (function (router) {
    router.get(link, function (req, res) {
        var game = (0, actions_1.getGame)(req.query.id);
        res.send(game);
    });
});
