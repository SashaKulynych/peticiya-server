"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setData = exports.getData = exports.cachedData = void 0;
var CachedData_1 = require("./sources/CachedData");
var fs = require('fs');
exports.cachedData = __spreadArray([], CachedData_1.cachedDataMain, true);
var getData = function () {
    try {
        // const file = JSON.parse(fs.readFileSync('./app/sources/data.json', 'utf8'));
        // cachedData = file
        return exports.cachedData;
    }
    catch (e) {
        console.log({ e: e });
        return 'Error';
    }
};
exports.getData = getData;
var setData = function (data) {
    try {
        exports.cachedData = data;
        // fs.writeFile('myjsonfile.json', JSON.stringify(data), 'utf8');
    }
    catch (e) {
        console.log({ e: e });
    }
};
exports.setData = setData;
