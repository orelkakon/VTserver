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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const mysqlAPI_1 = require("./../db/mysqlAPI");
const logger_1 = require("./../utils/logger");
const checkLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const decPassword = yield mysqlAPI_1.login(username);
    if (password === decPassword) {
        logger_1.loggerInfo.info(`${username} success to login`);
        return true;
    }
    else {
        logger_1.loggerInfo.info(`${username} failed to login`);
        return false;
    }
});
exports.checkLogin = checkLogin;
//# sourceMappingURL=login.js.map