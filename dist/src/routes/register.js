"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRegister = void 0;
const encDecPass_1 = require("./../utils/encDecPass");
const mysqlAPI_1 = require("./../db/mysqlAPI");
const checkRegister = (username, password, phone, email) => {
    const encPassword = encDecPass_1.encrypt(password);
    return mysqlAPI_1.register(username, encPassword, phone, email);
};
exports.checkRegister = checkRegister;
//# sourceMappingURL=register.js.map