"use strict";
exports.__esModule = true;
var users_1 = require("../controllers/users");
var link = '/users';
exports["default"] = (function (router) {
    router.post(link, function (req, res) {
        var user = (0, users_1.addUser)(req.body);
        res.send(user);
    });
});
