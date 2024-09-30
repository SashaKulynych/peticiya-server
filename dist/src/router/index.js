"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var rooms_1 = __importDefault(require("./rooms"));
var users_1 = __importDefault(require("./users"));
var games_1 = __importDefault(require("./games"));
var express = require('express');
var router = express.Router();
(0, rooms_1["default"])(router);
(0, users_1["default"])(router);
(0, games_1["default"])(router);
router.get('/', function (req, res) {
    res.send('server is up and running');
});
exports["default"] = router;
