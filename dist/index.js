"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var data_1 = __importDefault(require("./app/api/data"));
var utils_1 = require("./app/utils");
var app = express();
app.use(express.static('public'));
app.use('/source', express.static('src/source'));
app.use(cors());
app.use(bodyParser.json());
app.use(data_1.default);
var server = http.createServer(app);
server.listen(process.env.PORT || 5000, function () {
    var fileData = (0, utils_1.getData)();
    console.log("Server has started.", fileData);
});
server.setTimeout(500000);
module.exports = app;
