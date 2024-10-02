"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __importDefault(require("./data"));
var express = require('express');
var router = express.Router();
(0, data_1.default)(router);
router.get('/', function (req, res) {
    res.end('server is up and running');
});
exports.default = router;
