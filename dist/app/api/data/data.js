"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
var utils_1 = require("../../utils");
var axios_1 = __importDefault(require("axios"));
var jsdom_1 = __importDefault(require("jsdom"));
var link = '/api/getData';
var getData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var petitionId, pageNumber, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                petitionId = data.petitionId, pageNumber = data.pageNumber;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get("https://petition.president.gov.ua/petition/".concat(petitionId, "/votes/").concat(pageNumber, "/json"))];
            case 2:
                response = _a.sent();
                if (response) {
                    return [2 /*return*/, response.data];
                }
                return [2 /*return*/];
            case 3:
                e_1 = _a.sent();
                console.log({ e: e_1 });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getData = getData;
exports.default = (function (router) {
    router.get(link, function (req, res) {
        try {
            var arr_1 = __spreadArray([], utils_1.cachedData, true);
            var pageNumber_1 = 1;
            var onFinish_1 = function () {
                (0, utils_1.setData)(arr_1);
                console.log({ arr: arr_1 });
                res.send({ success: true, data: arr_1 });
            };
            var init_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                var response, dom, finish, tableExist, elements, _loop_1, index;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, (0, exports.getData)({
                                petitionId: 234334,
                                pageNumber: pageNumber_1
                            })];
                        case 1:
                            response = _d.sent();
                            if (response) {
                                dom = (new jsdom_1.default.JSDOM(response.table_html)).window.document;
                                finish = false;
                                tableExist = dom.querySelector('.table_row');
                                if (tableExist) {
                                    elements = dom.querySelectorAll('.table_row');
                                    _loop_1 = function (index) {
                                        var element = elements[index];
                                        console.log({ index: index });
                                        if (element) {
                                            var number = ((_a = element.querySelector('.number')) === null || _a === void 0 ? void 0 : _a.innerHTML) || '';
                                            var name_1 = ((_b = element.querySelector('.name')) === null || _b === void 0 ? void 0 : _b.innerHTML) || '';
                                            var date_1 = ((_c = element.querySelector('.date')) === null || _c === void 0 ? void 0 : _c.innerHTML) || '';
                                            var newItem_1 = {
                                                number: number,
                                                name: name_1,
                                                date: date_1
                                            };
                                            var i = arr_1.findIndex(function (v) { return v.date === date_1; });
                                            if (i !== -1) {
                                                var alreadyExist = arr_1[i].data.find(function (v) { return v.name === newItem_1.name; });
                                                if (alreadyExist) {
                                                    finish = true;
                                                }
                                                else {
                                                    arr_1[i].data.push(newItem_1);
                                                }
                                            }
                                            else {
                                                console.log({ date: date_1 });
                                                arr_1.unshift({
                                                    date: date_1,
                                                    data: [newItem_1]
                                                });
                                            }
                                        }
                                    };
                                    for (index = elements.length - 1; index >= 0; index--) {
                                        _loop_1(index);
                                    }
                                    if (finish) {
                                        onFinish_1();
                                    }
                                    else {
                                        pageNumber_1++;
                                        init_1();
                                    }
                                }
                                else {
                                    onFinish_1();
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            init_1();
        }
        catch (e) {
            res.send({ success: false, data: e });
        }
    });
});
